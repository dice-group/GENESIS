import java.io.File
import java.util.HashMap
import java.net.URLDecoder
import org.apache.lucene.util.Version
import org.apache.lucene.store.NIOFSDirectory
import org.apache.lucene.document.Document
import org.apache.lucene.index.DirectoryReader
import org.apache.lucene.index.IndexableField
import org.apache.lucene.index.Term
import org.apache.lucene.search.IndexSearcher
import org.apache.lucene.search.BooleanQuery
import org.apache.lucene.search.PrefixQuery
import org.apache.lucene.search.BooleanClause
import org.apache.lucene.search.BooleanClause.Occur
import org.apache.lucene.search.TopDocs
import com.google.gson.Gson
import spark.Spark.get
import spark.Spark.port
import kotlin.comparisons.compareBy

val TIMES_MORE_RESULTS = 10

data class Result(val url: String, val label: String, val pagerank: Double)

fun indexFromFolder(path: String): NIOFSDirectory {
    return NIOFSDirectory(File(path))
}

fun readerFromIndex(dir: NIOFSDirectory): DirectoryReader {
    return DirectoryReader.open(dir)
}

fun queryFromString(queryString: String): BooleanQuery {
    val query = BooleanQuery()
    val words = URLDecoder.decode(queryString, "UTF-8").toLowerCase().split(" ")
    words.map { it.trim() }
    .filter { !it.isEmpty() && it != "*" }
    .forEach{
        val parse = PrefixQuery(Term("label", it))
        val clause = BooleanClause(parse, Occur.SHOULD)
        query.add(clause)
    }
    return query
}

fun search(searcher: IndexSearcher, queryString: String, limit: Int = 10): List<Result> {
    val query = queryFromString(queryString)
    val hits: TopDocs = searcher.search(query, limit * TIMES_MORE_RESULTS)
    val res: List<Result> = hits.scoreDocs
        .map { searcher.doc(it.doc) }
        .fold (hashMapOf<String, Document>(), { acc, next ->
            val url: String = next.get("url")
            if(!acc.containsKey(url)){
                acc.put(url, next)
            }
            acc
        })
        .values
        .toTypedArray()
        .map {
            Result(url = it.get("url"), label = it.get("label"), pagerank = it.get("pagerank").toDouble())
        }
        .sortedWith(compareBy({it.pagerank}, {it.label}))
        .asReversed()
    return res
}

fun main(args: Array<String>) {
    val index = indexFromFolder("./index")
    var reader = readerFromIndex(index)
    val searcher = IndexSearcher(reader)
    val gson = Gson()
    port(8181)
    get("/search", { req, res ->
        val q: String = req.queryParams("q")
        val result: List<Result> = search(searcher, q)
        gson.toJson(result)
    })
}
