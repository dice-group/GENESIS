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
import org.apache.lucene.search.TermQuery
import org.apache.lucene.search.PhraseQuery
import org.apache.lucene.search.BooleanClause
import org.apache.lucene.search.BooleanClause.Occur
import org.apache.lucene.search.Sort
import org.apache.lucene.search.SortField
import org.apache.lucene.search.SortedNumericSortField
import com.google.gson.Gson
import spark.Spark.get
import spark.Spark.port

val TIMES_MORE_RESULTS = 10

data class Result(
    val url: String,
    val label: String,
    val pagerank: Double
)

fun indexFromFolder(path: String): NIOFSDirectory {
    return NIOFSDirectory(File(path))
}

fun readerFromIndex(dir: NIOFSDirectory): DirectoryReader {
    return DirectoryReader.open(dir)
}

fun queryFromString(queryString: String): BooleanQuery {
    val query = BooleanQuery()
    val phraseQuery = PhraseQuery()
    val words = URLDecoder.decode(queryString, "UTF-8").toLowerCase().split(" ")
    words.map { it.trim() }
    .filter { !it.isEmpty() && it != "*" }
    .forEach{
        var term = Term("label", it)
        phraseQuery.add(term)
        val parse = TermQuery(term)
        parse.setBoost(0.9f)
        val clause = BooleanClause(parse, Occur.SHOULD)
        query.add(clause)
    }
    query.add(BooleanClause(phraseQuery, Occur.SHOULD))
    return query
}

fun search(searcher: IndexSearcher, queryString: String, limit: Int = 10): List<Result> {
    val query = queryFromString(queryString)
    val hitsPerPage = limit * TIMES_MORE_RESULTS
    var sort = Sort(SortField.FIELD_SCORE, SortedNumericSortField("pagerank_sort", SortField.Type.FLOAT, true))
    val hits = searcher.search(query, hitsPerPage, sort)
    val uniqueUrls = mutableListOf<String>()
    val res: List<Result> = hits.scoreDocs
        .map { searcher.doc(it.doc) }
        .map {
            Result(
                url = it.get("url"),
                label = it.get("label"),
                pagerank = it.get("pagerank").toDouble()
            )
        }
        .filter {
            if (uniqueUrls.contains(it.url.toLowerCase())) {
                false
            } else {
                uniqueUrls.add(it.url.toLowerCase())
                true
            }
        }
        .toList()
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
