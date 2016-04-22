import java.net.URL
import org.aksw.avatar.Verbalizer
import org.dllearner.kb.sparql.SparqlEndpoint
import org.semanticweb.owlapi.model.IRI
import uk.ac.manchester.cs.owl.owlapi.OWLNamedIndividualImpl
import spark.Spark.get
import spark.Spark.port

fun main(args: Array<String>) {
    // get endpoint URL
    var sparqlEndpoint: String = System.getenv("SPARQL_ENDPOINT") ?: "http://dbpedia.org/sparql"
    // set up the SPARQL endpoint, in our case it's DBpedia
    var endpoint = SparqlEndpoint(URL(sparqlEndpoint))
    // create the verbalizer used to generate the textual summarization
    var verbalizer = Verbalizer(endpoint)
    // init service
    port(8182)
    get("/", { req, res ->
        val url: String = req.queryParams("url")
        // compute summarization of the entity and verbalize it
        verbalizer.summarize(OWLNamedIndividualImpl(IRI.create(url)))
    })
}
