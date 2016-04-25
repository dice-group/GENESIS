/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.aksw.simba.semanticsim;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author DiegoMoussallem
 */
public class SemanticSimilarity {

    public String SemSim1xN(String uri) throws IOException {

        List<ValuesTemp> Listtemp = new ArrayList<>();
        List<ValuesTemp> Results = new ArrayList<>();
        double result = 0;
        Sparql sparql = new Sparql();
        //Here, resources which belong to the same class are taken.
        List<String> resourcesSim = sparql.SparqlSimilar(uri);
        
        for (int i = 1; i < 100; i++) {
            //Now, each retrieved resource is compared to the given resource to measure the semantic similarity between them using Jaccard index.
            result = sparql.SemSim(uri, resourcesSim.get(i));

            ValuesTemp temp = new ValuesTemp();

            temp.setEntity(uri);
            temp.setEntity2(resourcesSim.get(i));
            temp.setSimilarity(result);

            Listtemp.add(temp);

            //System.out.println("Done");
        }
        //Organizing and retrieving only top 20 resources.
        Collections.sort(Listtemp);
        for (int i = 0; i < 21; i++) {
            Results.add(Listtemp.get(i));
        }

        ObjectMapper mapper = new ObjectMapper();
        
        //returining the results in json structure.
        return mapper.writeValueAsString(Results);
    }

}
