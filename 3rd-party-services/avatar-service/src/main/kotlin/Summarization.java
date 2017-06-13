import java.util.List;
import java.util.Set;

import org.aksw.avatar.Verbalizer;
import org.aksw.triple2nl.gender.Gender;
import org.apache.jena.graph.Triple;
import org.apache.jena.rdf.model.Resource;
import org.dllearner.kb.sparql.SparqlEndpoint;

//import org.semanticweb.owlapi.model.IRI;
//import org.semanticweb.owlapi.model.OWLIndividual;
//import uk.ac.manchester.cs.owl.owlapi.OWLNamedIndividualImpl;
import simplenlg.framework.NLGElement;

public class Summarization {
    
    private String summary;
    
    public Summarization(String uri) {
        
        // set up the SPARQL endpoint, in our case it's DBpedia
        SparqlEndpoint endpoint = SparqlEndpoint.getEndpointDBpedia();
        // SparqlEndpoint endpoint =
        // SparqlEndpoint.create("http://localhost:8080/kbox/query", "");
        // create the verbalizer used to generate the textual summarization
        Verbalizer verbalizer = new Verbalizer(endpoint);
        
        MostSpecificClass spec = new MostSpecificClass();
        SPO spo = new SPO();
        Resource specClass = spec.MostSpecificClass(uri);
        Set<Triple> set = spo.SPO(uri, specClass);
        List<NLGElement> elements = verbalizer.generateSentencesFromTriples(set, true, Gender.UNKNOWN);
        
        summary = verbalizer.realize(elements);
        
        /*
         * // define the entity to summarize OWLIndividual ind = new
         * OWLNamedIndividualImpl(
         * IRI.create("http://dbpedia.org/resource/Albert_Einstein"));
         *
         * // compute summarization of the entity and verbalize it String
         * summary = verbalizer.summarize(ind);
         */
        // System.out.println("Result: " + summary);
    }
    
    public String getSummary() {
        return summary;
    }
}
