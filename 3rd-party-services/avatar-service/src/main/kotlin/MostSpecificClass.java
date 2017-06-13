import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.sparql.engine.http.QueryEngineHTTP;

public class MostSpecificClass {

	public Resource MostSpecificClass(String uri) {
		// First query takes the most specific class from a given resource.
		QueryEngineHTTP qe = new QueryEngineHTTP("http://dbpedia.org/sparql",
				"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
						+ " PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
						+ " PREFIX dbr: <http://dbpedia.org/resource/>" + " PREFIX dbo: <http://dbpedia.org/ontology/>"
						+ " PREFIX owl: <http://www.w3.org/2002/07/owl#>" + "SELECT DISTINCT ?lcs WHERE {"
						+ "?lcs ^rdf:type/rdfs:subClassOf* <" + uri + ">;" + "       a owl:Class ."
						+ "  filter not exists {" + "    ?llcs ^(rdf:type/rdfs:subClassOf*) <" + uri + "> ;"
						+ "          a owl:Class ;" + "          rdfs:subClassOf+ ?lcs ." + "  }"
						+ "FILTER ( !strstarts(str(?lcs), 'http://www.wikidata.org/entity/' ) )}");

		ResultSet results = qe.execSelect();

		Resource property = null;
		while (results.hasNext()) {
			QuerySolution qs = results.next();
			property = qs.getResource("lcs");
			System.out.println(property.toString());
		}
		return property;
	}
}