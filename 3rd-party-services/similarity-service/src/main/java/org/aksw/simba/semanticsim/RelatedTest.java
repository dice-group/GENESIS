/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.aksw.simba.semanticsim;


/**
 *
 * @author diegomoussallem
 */

import de.uni_leipzig.simba.measures.string.JaccardMeasure;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author aksw
 */
public class RelatedTest {
    
    public static void main (String args[]) throws IOException {
        
        String uri = "http://dbpedia.org/resource/Leipzig";
        String property = "http://dbpedia.org/ontology/OfficeHolder";
        //JaccardMeasure jaccard = new JaccardMeasure();
        //double resul = jaccard.getSimilarity(uri, uri);
       // System.out.println(resul);
        
        Sparql sparql = new Sparql() ;
        //List<String> resourcesRel = sparql.SparqlRelated(uri);
        
        List<String> resourcesRel = sparql.SparqlRelatedClass(property);
        

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(resourcesRel);
        try {
		FileWriter file = new FileWriter("RelatedResourcesHOJE.json");
		file.write(json.toString());
		file.flush();
		file.close();

	} catch (IOException e) {
		e.printStackTrace();
	}

    }
   
}
