/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.aksw.simba.semanticsim;

import com.hp.hpl.jena.rdf.model.HasNoModelException;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.Property;
import com.hp.hpl.jena.rdf.model.RDFNode;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.rdf.model.Statement;
import com.hp.hpl.jena.rdf.model.StmtIterator;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
* @author DiegoMoussallem
 */
public class SemanticSimilarity {
   
    
    public void SemSim1xN(String uri) throws IOException{

        Sparql sparql = new Sparql() ;
        
        List<String> resourcesSim = sparql.SparqlSimilar(uri);

        List<ValuesTemp> Listtemp = new ArrayList<>();
        double result = 0;
        SemanticSimilarity sim = new SemanticSimilarity();
        
            for (int i = 0; i < resourcesSim.size(); i++) { 
                result = sim.SemSim1xN(uri,resourcesSim.get(i));
        
                ValuesTemp temp = new ValuesTemp();
        
                temp.setEntity(uri);
                temp.setEntity2(resourcesSim.get(i));
                temp.setSimilarity(result);
        
                Listtemp.add(temp);
        

                ObjectMapper mapper = new ObjectMapper();
                String json = mapper.writeValueAsString(Listtemp);
                    try {
                        FileWriter file = new FileWriter("SimilaritiesResources.json");
                        file.write(json.toString());
                        file.flush();
                        file.close();

                        } catch (IOException e) {
                            e.printStackTrace();
                }

        }
    }
    
    public void SemSimNxM(String uri) throws IOException{
        
        Sparql sparql = new Sparql() ;
        
        List<String> resourcesSim = sparql.SparqlSimilar(uri);
        JSONObject obj = new JSONObject();       
        JSONArray list = new JSONArray();
        List<ValuesTemp> Listtemp = new ArrayList<>();
        double result = 0;
        SemanticSimilarity sim = new SemanticSimilarity();
                    
        for(int i = 0; i <resourcesSim.size(); i++){
            for(int k=0; k < resourcesSim.size(); k++){
                result = sim.SemSimNxM(resourcesSim.get(i), resourcesSim.get(k));
        
                ValuesTemp temp = new ValuesTemp();
        
                temp.setEntity(uri);
                temp.setEntity2(resourcesSim.get(i));
                temp.setSimilarity(result);
        
                Listtemp.add(temp);
        

                ObjectMapper mapper = new ObjectMapper();
                String json = mapper.writeValueAsString(Listtemp);
                    try {
                        FileWriter file = new FileWriter("SimilaritiesResources.json");
                        file.write(json.toString());
                        file.flush();
                        file.close();

                        } catch (IOException e) {
                            e.printStackTrace();
                            }

                        }
                                                }
    }
    
   
    public double SemSim1xN(String uri, String resource) throws HasNoModelException{
        
        Model model = ModelFactory.createDefaultModel();
        Model model2 = ModelFactory.createDefaultModel();
           
        uri = uri.replace("resource", "data");
        uri = uri.concat(".ntriples");
        
        resource = resource.replace("resource", "data");
        resource = resource.concat(".ntriples");
        
        model.read(uri, "N-TRIPLES") ;
        model2.read(resource, "N-TRIPLES") ;

        List<String> resources1 = new ArrayList<>();
        List<String> resources2 = new ArrayList<>();

        int total = 0;
        
        // list the statements in the Model
        StmtIterator iter = model.listStatements();

        // print out the predicate, subject and object of each statement
        while (iter.hasNext()) {
            Statement stmt      = iter.nextStatement();  // get next statement
            Resource  subject   = stmt.getSubject();     // get the subject
            Property  predicate = stmt.getPredicate();   // get the predicate
            RDFNode   object    = stmt.getObject();      // get the object

            resources1.add(predicate +" "+ object);

        }

        StmtIterator iter2 = model2.listStatements();
    
        while (iter2.hasNext()) {
            Statement stmt2      = iter2.nextStatement();  // get next statement
            Resource  subject2   = stmt2.getSubject();     // get the subject
            Property  predicate2 = stmt2.getPredicate();   // get the predicate
            RDFNode   object2    = stmt2.getObject();      // get the object

            resources2.add(predicate2 +" "+ object2);

        }  
    
        for(int i = 0;i<resources1.size();i++){
            for(int j = 0;j<resources2.size();j++){
                if(resources1.get(i).equals(resources2.get(j))){
                    total = total + 1;
                    break;
                }
            }
        }

        float union = (resources1.size() + resources2.size())-total;
    
        float sim = Math.round((total / union)*100);

        sim = sim/100;
    
    return sim;    
//}
    }
    
    public double SemSimNxM(String uri, String resource) throws HasNoModelException{
        
        Model model = ModelFactory.createDefaultModel();
        Model model2 = ModelFactory.createDefaultModel();
           
        uri = uri.replace("resource", "data");
        uri = uri.concat(".ntriples");
        
        resource = resource.replace("resource", "data");
        resource = resource.concat(".ntriples");
        
        model.read(uri, "N-TRIPLES") ;
        model2.read(resource, "N-TRIPLES") ;

        List<String> resources1 = new ArrayList<>();
        List<String> resources2 = new ArrayList<>();

        int total = 0;
        
        // list the statements in the Model
        StmtIterator iter = model.listStatements();

        // print out the predicate, subject and object of each statement
        while (iter.hasNext()) {
            Statement stmt      = iter.nextStatement();  // get next statement
            Resource  subject   = stmt.getSubject();     // get the subject
            Property  predicate = stmt.getPredicate();   // get the predicate
            RDFNode   object    = stmt.getObject();      // get the object

            resources1.add(predicate +" "+ object);
        }
        
        StmtIterator iter2 = model2.listStatements();
    
        while (iter2.hasNext()) {
            Statement stmt2      = iter2.nextStatement();  // get next statement
            Resource  subject2   = stmt2.getSubject();     // get the subject
            Property  predicate2 = stmt2.getPredicate();   // get the predicate
            RDFNode   object2    = stmt2.getObject();      // get the object
            resources2.add(predicate2 +" "+ object2);

        }
       
        for(int i = 0;i<resources1.size();i++){
            for(int j = 0;j<resources2.size();j++){
                if(resources1.get(i).equals(resources2.get(j))){
                    total = total + 1;
                    break;
                }
            }
        }
        
        float union = (resources1.size() + resources2.size())-total;
    
        float sim = Math.round((total / union)*100);
    
        sim = sim/100;
      
        return sim;    
    } 
    
}
