/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.aksw.simba.semanticsim;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.management.Query;

import org.apache.jena.riot.WebContent;

import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QueryFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.Syntax;
import com.hp.hpl.jena.sparql.engine.http.QueryEngineHTTP;

/**
 *
 * @author DiegoMoussallem
 */
public class Sparql {

	public List<String> SparqlSimilar(String uri) {
		// First query takes the most specific class from a given resource.
		List<String> resources = new ArrayList<>();
		String ontology_service = "http://dbpedia.org/sparql";

		String endpointsSparql = " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
				+ " PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
				+ " PREFIX dbr: <http://dbpedia.org/resource/>" + " PREFIX dbo: <http://dbpedia.org/ontology/>"
				+ " PREFIX owl: <http://www.w3.org/2002/07/owl#>" + "SELECT DISTINCT ?lcs WHERE {"
				+ "?lcs ^rdf:type/rdfs:subClassOf* <" + uri + ">;" + "       a owl:Class ." + "  filter not exists {"
				+ "    ?llcs ^(rdf:type/rdfs:subClassOf*) <" + uri + "> ;" + "          a owl:Class ;"
				+ "          rdfs:subClassOf+ ?lcs ." + "  }"
				+ "FILTER ( !strstarts(str(?lcs), 'http://www.wikidata.org/entity/' ) )}";

		Query sparqlQuery = QueryFactory.create(endpointsSparql, Syntax.syntaxARQ);
		QueryEngineHTTP qexec = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service, sparqlQuery);
		qexec.setModelContentType(WebContent.contentTypeRDFXML);
		ResultSet results = qexec.execSelect();

		String property = null;
		while (results.hasNext()) {
			QuerySolution qs = results.next();
			property = qs.getResource("lcs").toString();
			System.out.println(property);
		}
		if (!property.equals("http://dbpedia.org/ontology/Person") && property != null) {
			String query = "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>"
					+ "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
					+ "PREFIX dbo:<http://dbpedia.org/ontology/>" + "PREFIX dbr:<http://dbpedia.org/resource/>" + ""
					+ "select ?entity2" + "       (count (distinct ?i) as ?intersection)" + "where {"
					+ "        values ?s { <" + uri + "> }" + "        ?entity2 ?p ?i ;" + "          a <" + property
					+ ">." + "        ?s ?p ?i .}" + "GROUP BY ?entity2 ORDER BY DESC (count (distinct ?i))"
					+ "LIMIT 21";

			Query sparqlQuery2 = QueryFactory.create(query, Syntax.syntaxARQ);
			QueryEngineHTTP qexec2 = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service,
					sparqlQuery2, "http://dbpedia.org");
			qexec.setModelContentType(WebContent.contentTypeRDFXML);
			ResultSet results2 = qexec2.execSelect();
			String object = null;
			while (results2.hasNext()) {
				QuerySolution qs2 = results2.next();
				object = qs2.getResource("?entity2").toString();
				if (!object.equals(uri)) {
					resources.add(object);
				}
			}
			return resources;
		} else {
			return resources;
		}
	}

	public List<String> SparqlRelated(String resource) {
		// Given a resource the sparql query takes all objects from the resource
		// and applies PageRank Algorithm through the existing work.
		List<String> resources = new ArrayList<>();
		String ontology_service = "http://dbpedia.org/sparql";
		String query = "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
				+ "PREFIX dbo:<http://dbpedia.org/ontology/>" + "PREFIX dbr:<http://dbpedia.org/resource/>"
				+ "PREFIX vrank:<http://purl.org/voc/vrank#>"
				+ "SELECT DISTINCT ?obj FROM <http://people.aifb.kit.edu/ath/#DBpedia_PageRank> WHERE {" + "<"
				+ resource + "> ?p ?obj." + "?obj vrank:hasRank/vrank:rankValue ?w."
				+ "FILTER( regex(str(?obj), '^(?!http://dbpedia.org/resource/Category).+'))"
				+ "FILTER( regex(str(?obj), '^(?!http://dbpedia.org/class/yago/).+'))"
				+ "FILTER( regex(str(?obj), '^(?!http://www.wikidata.org/entity).+'))}" + "ORDER BY DESC(?w) LIMIT 20";

		Query sparqlQuery = QueryFactory.create(query, Syntax.syntaxARQ);
		QueryEngineHTTP qexec = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service, sparqlQuery,
				"http://dbpedia.org");

		ResultSet results = qexec.execSelect();

		String object = null;
		while (results.hasNext()) {
			QuerySolution qs = results.next();
			object = qs.getResource("obj").toString();
			resources.add(object);
		}

		return resources;
	}

}
