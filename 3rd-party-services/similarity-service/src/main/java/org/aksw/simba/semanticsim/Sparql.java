/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.aksw.simba.semanticsim;

import com.hp.hpl.jena.query.Query;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QueryFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.query.Syntax;
import com.hp.hpl.jena.rdf.model.Literal;
import com.hp.hpl.jena.sparql.engine.http.QueryEngineHTTP;
import java.util.ArrayList;
import java.util.List;
import org.apache.jena.riot.WebContent;

/**
 *
 * @author DiegoMoussallem
 */
public class Sparql {

        public String SparqlMostSpecificClass(String uri) {
        //First query takes the most specific class from a given resource.
        String ontology_service = "http://dbpedia.org/sparql";

        String endpointsSparql
                = " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
                + " PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
                + " PREFIX dbr: <http://dbpedia.org/resource/>"
                + " PREFIX dbo: <http://dbpedia.org/ontology/>"
                + " PREFIX owl: <http://www.w3.org/2002/07/owl#>"
                + "SELECT DISTINCT ?lcs WHERE {"
                + "?lcs ^rdf:type/rdfs:subClassOf* <" + uri + ">;"
                + "       a owl:Class ."
                + "  filter not exists {"
                + "    ?llcs ^(rdf:type/rdfs:subClassOf*) <" + uri + "> ;"
                + "          a owl:Class ;"
                + "          rdfs:subClassOf+ ?lcs ."
                + "  }"
                + "FILTER ( !strstarts(str(?lcs), 'http://www.wikidata.org/entity/' ) )}";

        Query sparqlQuery = QueryFactory.create(endpointsSparql, Syntax.syntaxARQ);
        QueryEngineHTTP qexec = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service, sparqlQuery);
        qexec.setModelContentType(WebContent.contentTypeRDFXML);
        //Model m = qexec.execSelect();
        ResultSet results = qexec.execSelect();

//QueryExecution x = QueryExecutionFactory.sparqlService(ontology_service, String.format(endpointsSparql,endpoint));
//ResultSet results = x.execSelect();
        String property = null;
        while (results.hasNext()) {
            QuerySolution qs = results.next();
            property = qs.getResource("lcs").toString();
            //resources.add(property);
            System.out.println(property);
        }
        return property;
                }
        
    public List<String> SparqlSimilar(String uri) {
        //First query takes the most specific class from a given resource.
        List<String> resources = new ArrayList<>();
        String ontology_service = "http://dbpedia.org/sparql";

        String endpointsSparql
                = " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
                + " PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
                + " PREFIX dbr: <http://dbpedia.org/resource/>"
                + " PREFIX dbo: <http://dbpedia.org/ontology/>"
                + " PREFIX owl: <http://www.w3.org/2002/07/owl#>"
                + "SELECT DISTINCT ?lcs WHERE {"
                + "?lcs ^rdf:type/rdfs:subClassOf* <" + uri + ">;"
                + "       a owl:Class ."
                + "  filter not exists {"
                + "    ?llcs ^(rdf:type/rdfs:subClassOf*) <" + uri + "> ;"
                + "          a owl:Class ;"
                + "          rdfs:subClassOf+ ?lcs ."
                + "  }"
                + "FILTER ( !strstarts(str(?lcs), 'http://www.wikidata.org/entity/' ) )}";

        Query sparqlQuery = QueryFactory.create(endpointsSparql, Syntax.syntaxARQ);
        QueryEngineHTTP qexec = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service, sparqlQuery);
        qexec.setModelContentType(WebContent.contentTypeRDFXML);
        //Model m = qexec.execSelect();
        ResultSet results = qexec.execSelect();

//QueryExecution x = QueryExecutionFactory.sparqlService(ontology_service, String.format(endpointsSparql,endpoint));
//ResultSet results = x.execSelect();
        String property = null;
        while (results.hasNext()) {
            QuerySolution qs = results.next();
            property = qs.getResource("lcs").toString();
            //resources.add(property);
            System.out.println(property);
        }
        //Through the most specific class, here the sparql query takes all resources sharing the same class.
        String endpoint = "DBpedia";

        String query
                = "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>"
                + "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
                + "PREFIX dbo:<http://dbpedia.org/ontology/>"
                + "PREFIX dbr:<http://dbpedia.org/resource/>"
                + ""
                + "select ?entity2"
                + "       (count (distinct ?i) as ?intersection)"
                + "where {"
                + "        values ?s { <" + uri + "> }"
                + "        ?entity2 ?p ?i ;"
                + "          a <" + property + ">."
                + "        ?s ?p ?i .}"
                + "GROUP BY ?entity2 ORDER BY DESC (count (distinct ?i))"
                + "LIMIT 40000";

        Query sparqlQuery2 = QueryFactory.create(query, Syntax.syntaxARQ);
        QueryEngineHTTP qexec2 = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service, sparqlQuery2, "http://dbpedia.org");
        qexec.setModelContentType(WebContent.contentTypeRDFXML);
        //Model m = qexec.execSelect();
        ResultSet results2 = qexec2.execSelect();

        //QueryExecution y = QueryExecutionFactory.sparqlService(ontology_service, String.format(query, endpoint));
        //ResultSet results = y.execSelect();
        String object = null;
        while (results2.hasNext()) {
            QuerySolution qs2 = results2.next();
            object = qs2.getResource("?entity2").toString();
            resources.add(object);
            //System.out.println(q);
        }

//Query one to get possible similar resources.        
        return resources;
    }

    public double SemSim(String uri, String resource) {

        //Query one to get the similarity based on Jaccard Index.    
        String ontology_service = "http://dbpedia.org/sparql";
        String endpoint = "DBpedia";
        double sim = 0;
        String endpointsSparql
                = "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>"
                + "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
                + "PREFIX dbo:<http://dbpedia.org/ontology/>"
                + "PREFIX dbr:<http://dbpedia.org/resource/>"
                + "select (count (distinct ?i) as ?intersection)"
                + "       (count (distinct ?o)+count(distinct ?o2) as ?union)"
                + "       (count (distinct ?i)/xsd:double(count(distinct ?o)+count(distinct ?o2)-count (distinct ?i)) as ?similarity)"
                + "where {"
                + "  <" + uri + "> ?p1 ?i ."
                + "  <" + resource + "> ?p2 ?i."
                + "  {<" + uri + "> ?p3 ?o .} union"
                + "  {<" + resource + "> ?p4 ?o2 .}"
                + "}";

        Query sparqlQuery = QueryFactory.create(endpointsSparql, Syntax.syntaxARQ);
        QueryEngineHTTP qexec = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service, sparqlQuery, "http://dbpedia.org");
        qexec.setModelContentType(WebContent.contentTypeRDFXML);
        //Model m = qexec.execSelect();
        ResultSet results = qexec.execSelect();

        while (results.hasNext()) {
            QuerySolution qs = results.next();
            sim = qs.getLiteral("?similarity").getDouble();

        }
        return sim;

    }

    public int SparqlCount(String predicate, String object, String resource) {
        //Query one to get the frequency of each predicate and objecto to put as weight in jaccard.
        String ontology_service = "http://dbpedia.org/sparql";
        String endpoint = "DBpedia";
        List<String> resources = new ArrayList<>();

        String endpointsSparql
                = " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
                + " PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
                + " PREFIX dbr: <http://dbpedia.org/resource/>"
                + " PREFIX dbo: <http://dbpedia.org/ontology/>"
                + " PREFIX owl: <http://www.w3.org/2002/07/owl#>"
                + "SELECT DISTINCT ?lcs WHERE {"
                + "?lcs ^rdf:type/rdfs:subClassOf* <" + resource + ">;"
                + "       a owl:Class ."
                + "  filter not exists {"
                + "    ?llcs ^(rdf:type/rdfs:subClassOf*) <" + resource + "> ;"
                + "          a owl:Class ;"
                + "          rdfs:subClassOf+ ?lcs ."
                + "  }"
                + "FILTER ( !strstarts(str(?lcs), 'http://www.wikidata.org/entity/' ) )}";

        Query sparqlQuery = QueryFactory.create(endpointsSparql, Syntax.syntaxARQ);
        QueryEngineHTTP qexec = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service, sparqlQuery);
        qexec.setModelContentType(WebContent.contentTypeRDFXML);
        ResultSet results = qexec.execSelect();

        String property = null;
        while (results.hasNext()) {
            QuerySolution qs = results.next();
            property = qs.getResource("lcs").toString();
        }

        String endpointsSparql2
                = " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
                + " PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
                + " PREFIX dbr: <http://dbpedia.org/resource/>"
                + " PREFIX dbo: <http://dbpedia.org/ontology/>"
                + " PREFIX owl: <http://www.w3.org/2002/07/owl#>"
                + "SELECT DISTINCT(COUNT(?x) AS ?count)"
                + "WHERE {"
                + "?x <" + predicate + "> <" + object + ">."
                + "?x rdf:type <" + property + ">.}LIMIT 50";

        Query sparqlQuery2 = QueryFactory.create(endpointsSparql2, Syntax.syntaxARQ);
        QueryEngineHTTP qexec2 = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service, sparqlQuery2);
        qexec2.setModelContentType(WebContent.contentTypeRDFXML);
        ResultSet results2 = qexec2.execSelect();

        int count2 = 0;
        while (results2.hasNext()) {
            QuerySolution qs = results2.next();
            Literal count = qs.getLiteral("count");
            count2 = count.getInt();
            if (count2 == 0) {
                return 1;
            }
        }

        return count2;
    }

    public List<String> SparqlRelated(String resource) {
        //Given a resource the sparql query takes all objects from the resource and applies PageRank Algorithm through the existing work.
        List<String> resources = new ArrayList<>();
        String ontology_service = "http://dbpedia.org/sparql";
        String endpoint = "DBpedia";

        String query
                = "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
                + "PREFIX dbo:<http://dbpedia.org/ontology/>"
                + "PREFIX dbr:<http://dbpedia.org/resource/>"
                + "PREFIX vrank:<http://purl.org/voc/vrank#>"
                + "SELECT DISTINCT ?obj FROM <http://people.aifb.kit.edu/ath/#DBpedia_PageRank> WHERE {"
                + "<" + resource + "> ?p ?obj."
                + "?obj vrank:hasRank/vrank:rankValue ?w."
                + "FILTER( regex(str(?obj), '^(?!http://dbpedia.org/resource/Category).+'))"
                + "FILTER( regex(str(?obj), '^(?!http://dbpedia.org/class/yago/).+'))"
                + "FILTER( regex(str(?obj), '^(?!http://www.wikidata.org/entity).+'))}"
                + "ORDER BY DESC(?w) LIMIT 20";

        Query sparqlQuery = QueryFactory.create(query, Syntax.syntaxARQ);
        QueryEngineHTTP qexec = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service, sparqlQuery, "http://dbpedia.org");

        ResultSet results = qexec.execSelect();

        String object = null;
        while (results.hasNext()) {
            QuerySolution qs = results.next();
            object = qs.getResource("obj").toString();
            resources.add(object);
        }

        return resources;
    }
    
    public List<String> SparqlRelatedClass(String property) {
        //Given a resource the sparql query takes all objects from the resource and applies PageRank Algorithm through the existing work.
        List<String> resources = new ArrayList<>();
        String ontology_service = "http://dbpedia.org/sparql";
        String endpoint = "DBpedia";

        String query
                = "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
                + "PREFIX dbo:<http://dbpedia.org/ontology/>"
                + "PREFIX dbr:<http://dbpedia.org/resource/>"
                + "PREFIX vrank:<http://purl.org/voc/vrank#>"
                + "SELECT DISTINCT ?s FROM <http://people.aifb.kit.edu/ath/#DBpedia_PageRank> WHERE {"
                + "?s a <" + property + ">."
                + "?s vrank:hasRank/vrank:rankValue ?w."
                + "FILTER( regex(str(?s), '^(?!http://dbpedia.org/resource/Category).+'))"
                + "FILTER( regex(str(?s), '^(?!http://dbpedia.org/class/yago/).+'))"
                + "FILTER( regex(str(?s), '^(?!http://www.wikidata.org/entity).+'))}"
                + "ORDER BY DESC(?w) LIMIT 1000";

        Query sparqlQuery = QueryFactory.create(query, Syntax.syntaxARQ);
        QueryEngineHTTP qexec = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service, sparqlQuery, "http://dbpedia.org");

        ResultSet results = qexec.execSelect();

        String object = null;
        while (results.hasNext()) {
            QuerySolution qs = results.next();
            object = qs.getResource("s").toString();
            resources.add(object);
        }

        return resources;
    }

}
