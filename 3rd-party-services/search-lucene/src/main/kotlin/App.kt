import java.io.File
import java.util.HashMap
import org.apache.lucene.util.Version
import org.apache.lucene.store.NIOFSDirectory
import org.apache.lucene.document.Document
import org.apache.lucene.index.DirectoryReader
import org.apache.lucene.index.IndexableField
import org.apache.lucene.index.Term
import org.apache.lucene.search.IndexSearcher
import org.apache.lucene.search.BooleanQuery
import org.apache.lucene.search.PhraseQuery
import org.apache.lucene.search.PrefixQuery
import org.apache.lucene.search.BooleanClause
import org.apache.lucene.search.BooleanClause.Occur
import org.apache.lucene.search.TopDocs
import com.google.gson.Gson
import spark.Spark.get
import spark.Spark.port

val TIMES_MORE_RESULTS = 10

fun indexFromFolder(path: String): NIOFSDirectory {
    return NIOFSDirectory(File(path))
}

fun readerFromIndex(dir: NIOFSDirectory): DirectoryReader {
    return DirectoryReader.open(dir)
}

fun queryFromString(queryString: String): BooleanQuery {
    val query = BooleanQuery()
    val phraseQuery = PhraseQuery()
    val words = queryString.toLowerCase().split("\\s")
    words.map { it.trim() }
    .filter { !it.isEmpty() && it != "*" }
    .forEach{
        phraseQuery.add(Term("label", it))
        val parse = PrefixQuery(Term("label", it))
        parse.setBoost(0.9f)
        val clause = BooleanClause(parse, Occur.SHOULD)
        query.add(clause)
    }
    return query
}

fun search(index: NIOFSDirectory, queryString: String, limit: Int = 10): Array<Document> {
    var reader = readerFromIndex(index)
    val query = queryFromString(queryString)
    val searcher = IndexSearcher(reader)
    val hits: TopDocs = searcher.search(query, limit * TIMES_MORE_RESULTS)
    val res: Array<Document> = hits.scoreDocs
        .map { searcher.doc(it.doc) }
        .fold (hashMapOf<String, Document>(), { acc, next ->
            val uri: String = next.get("uri")
            if(!acc.containsKey(uri)){
                acc.put(uri, next)
            }
            acc
        })
        .values
        .toTypedArray()
    return res
}

fun main(args: Array<String>) {
    val index = indexFromFolder("./index")
    val gson = Gson();
    port(8181)
    get("/search", { req, res ->
        val q: String = req.queryParams("q")
        val result: Array<Document> = search(index, q)
        gson.toJson(result.map {
            val fields: List<IndexableField> = it.getFields()
            fields.fold (hashMapOf<String, String>(), { acc, f ->
                acc.put(f.name(), f.stringValue())
                acc
            })
        })
    })
}
