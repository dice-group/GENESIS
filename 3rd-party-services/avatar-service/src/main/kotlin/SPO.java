import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.jena.graph.Triple;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.sparql.engine.http.QueryEngineHTTP;

public class SPO {

	public Set<Triple> SPO(String uri, Resource specClass) {
		// First query takes the most specific class from a given resource.
		List<Triple> resources = new ArrayList<Triple>();

		QueryEngineHTTP qe = new QueryEngineHTTP("http://dbpedia.org/sparql",
				"select distinct ?p ?o where { <" + uri + "> ?p ?o. "
						+ "?o rdfs:label []."
						+ "FILTER ( strstarts(str(?o), 'http://dbpedia.org/' )) "
						+ "FILTER ( strstarts(str(?p), 'http://dbpedia.org/ontology' )) "
						+ "FILTER ( !strstarts(str(?o), 'http://dbpedia.org/class/yago' )) "
						+ "FILTER ( !strstarts(str(?o), 'http://dbpedia.org/resource/Category' )) " + "} LIMIT 100");
		ResultSet results = qe.execSelect();

		Resource subject = ResourceFactory.createResource(uri);
		Resource predicate = null;
		RDFNode object = null;
		Resource type = ResourceFactory.createResource("http://www.w3.org/1999/02/22-rdf-syntax-ns#type");
		resources.add(new Triple(subject.asNode(), type.asNode(), specClass.asNode()));
		while (results.hasNext()) {
			QuerySolution qs = results.next();
			predicate = qs.getResource("p");
			object = qs.get("o");
			if (!object.isLiteral()) {
				Triple t = new Triple(subject.asNode(), predicate.asNode(), object.asNode());
				resources.add(t);
			}
		}
		Set<Triple> set = new HashSet<Triple>();
		if(resources.size()>15){
			set.addAll(resources.subList(0, 14));}
		else {
			set.addAll(resources);
		}
		return set;
	}
}

