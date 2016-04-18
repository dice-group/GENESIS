/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.aksw.simba.semanticsim;


import com.hp.hpl.jena.query.Query;
import com.hp.hpl.jena.query.QueryExecution;
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
public class Sparql{
    
    public List<String> SparqlSimilar(String resource){
        
        
//Query one to get rdfs:label    
    String ontology_service = "http://dbpedia.org/sparql";
    String endpoint = "DBpedia";
    List<String> resources = new ArrayList<>();
	String endpointsSparql = 
     
         " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
         " PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
         " PREFIX dbr: <http://dbpedia.org/resource/>" +
         " PREFIX dbo: <http://dbpedia.org/ontology/>" +
         " PREFIX owl: <http://www.w3.org/2002/07/owl#>" +

         "SELECT DISTINCT ?lcs WHERE {" +  
            "?lcs ^rdf:type/rdfs:subClassOf* <"+resource+">;" +
                "       a owl:Class ." +
                "  filter not exists {" +
                "    ?llcs ^(rdf:type/rdfs:subClassOf*) <"+resource+"> ;" +
                "          a owl:Class ;" +
                "          rdfs:subClassOf+ ?lcs ." +
                "  }" +
                "FILTER ( !strstarts(str(?lcs), 'http://www.wikidata.org/entity/' ) )}";
        
		Query sparqlQuery = QueryFactory.create(endpointsSparql, Syntax.syntaxARQ);
		QueryEngineHTTP qexec = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service,sparqlQuery);
		qexec.setModelContentType(WebContent.contentTypeRDFXML);
		//Model m = qexec.execSelect();
                ResultSet results = qexec.execSelect();
              
//QueryExecution x = QueryExecutionFactory.sparqlService(ontology_service, String.format(endpointsSparql,endpoint));

//ResultSet results2 = x.execSelect();
 String property= null;
 while (results.hasNext()) {
	QuerySolution qs = results.next();
	property = qs.getResource("lcs").toString();
	//resources.add(property);
        System.out.println(property);
}
  
    String endpointsSparql2 = 
     
         " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
         " PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
         " PREFIX dbr: <http://dbpedia.org/resource/>" +
         " PREFIX dbo: <http://dbpedia.org/ontology/>" +
         " PREFIX owl: <http://www.w3.org/2002/07/owl#>" +
         "SELECT DISTINCT ?resources WHERE { ?resources rdf:type <"+property+">"
            + "}"
            + "LIMIT 20";
        
 
QueryExecution y = QueryExecutionFactory.sparqlService(ontology_service, String.format(endpointsSparql2,endpoint));       

ResultSet results2 = y.execSelect();

 while (results2.hasNext()) {
	QuerySolution qs = results2.next();
	property = qs.getResource("resources").toString();
	resources.add(property);
        //System.out.println(q);
}

//Query one to get possible similar resources.        

 return resources;
}
    
public int SparqlCount(String predicate, String object,String resource){
    
    //Query one to get rdfs:label    
    String ontology_service = "http://dbpedia.org/sparql";
    String endpoint = "DBpedia";
    List<String> resources = new ArrayList<>();
    
    String endpointsSparql = 
     
         " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
         " PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
         " PREFIX dbr: <http://dbpedia.org/resource/>" +
         " PREFIX dbo: <http://dbpedia.org/ontology/>" +
         " PREFIX owl: <http://www.w3.org/2002/07/owl#>" +

         "SELECT DISTINCT ?lcs WHERE {" +  
            "?lcs ^rdf:type/rdfs:subClassOf* <"+resource+">;" +
                "       a owl:Class ." +
                "  filter not exists {" +
                "    ?llcs ^(rdf:type/rdfs:subClassOf*) <"+resource+"> ;" +
                "          a owl:Class ;" +
                "          rdfs:subClassOf+ ?lcs ." +
                "  }" +
                "FILTER ( !strstarts(str(?lcs), 'http://www.wikidata.org/entity/' ) )}";
        
		Query sparqlQuery = QueryFactory.create(endpointsSparql, Syntax.syntaxARQ);
		QueryEngineHTTP qexec = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service,sparqlQuery);
		qexec.setModelContentType(WebContent.contentTypeRDFXML);
		//Model m = qexec.execSelect();
                ResultSet results = qexec.execSelect();
              

 String property= null;
 while (results.hasNext()) {
	QuerySolution qs = results.next();
	property = qs.getResource("lcs").toString();

}
 
 
	String endpointsSparql2 = 
     
         " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
         " PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
         " PREFIX dbr: <http://dbpedia.org/resource/>" +
         " PREFIX dbo: <http://dbpedia.org/ontology/>" +
         " PREFIX owl: <http://www.w3.org/2002/07/owl#>" +

         "SELECT DISTINCT(COUNT(?x) AS ?count)" +
            "WHERE {" +
            "?x <"+predicate+"> <"+object+">."  +
            "?x rdf:type <"+property+">.}LIMIT 50";

		Query sparqlQuery2 = QueryFactory.create(endpointsSparql2, Syntax.syntaxARQ);
		QueryEngineHTTP qexec2 = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service,sparqlQuery2);
		qexec2.setModelContentType(WebContent.contentTypeRDFXML);
		//Model m = qexec.execSelect();
                ResultSet results2 = qexec2.execSelect();

int count2 = 0;
while (results2.hasNext()) {
	QuerySolution qs = results2.next();
	//String count = qs.getResource("count").toString();
        Literal count = qs.getLiteral("count");
        count2 = count.getInt();
        if (count2 == 0){
            return 1;
        }
}

        return count2 ;

}



public List<String> SparqlRelated(String resource){
    
    List<String> resources = new ArrayList<>();
    String ontology_service = "http://dbpedia.org/sparql";
    String endpoint = "DBpedia";
    
    		String query =
                           "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                           "PREFIX dbo:<http://dbpedia.org/ontology/>" +
                           "PREFIX dbr:<http://dbpedia.org/resource/>" +
                           "PREFIX vrank:<http://purl.org/voc/vrank#>" +
                        
                           "SELECT DISTINCT ?obj FROM <http://people.aifb.kit.edu/ath/#DBpedia_PageRank> WHERE {"+
                           "<"+resource+"> ?p ?obj." +
                           "?obj vrank:hasRank/vrank:rankValue ?w." +
                          
                           "FILTER( regex(str(?obj), '^(?!http://dbpedia.org/resource/Category).+'))" +
                           "FILTER( regex(str(?obj), '^(?!http://dbpedia.org/class/yago/).+'))" +
                           "FILTER( regex(str(?obj), '^(?!http://www.wikidata.org/entity).+'))}" +
                           "ORDER BY DESC(?w) LIMIT 20";
                
		Query sparqlQuery = QueryFactory.create(query, Syntax.syntaxARQ);
		QueryEngineHTTP qexec = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(ontology_service,sparqlQuery, "http://dbpedia.org");
		//qexec.setModelContentType(WebContent.contentTypeRDFXML);
		//Model m = qexec.execSelect();
                
                //QueryExecution y = QueryExecutionFactory.sparqlService(ontology_service, String.format(query,endpoint));  
                //ResultSet results = y.execSelect();
                ResultSet results = qexec.execSelect();  
                

String object = null;
 while (results.hasNext()) {
	QuerySolution qs = results.next();
	object = qs.getResource("obj").toString();
	resources.add(object);
        //System.out.println(q);
}

//Query one to get possible similar resources.        

 return resources;
}


}
