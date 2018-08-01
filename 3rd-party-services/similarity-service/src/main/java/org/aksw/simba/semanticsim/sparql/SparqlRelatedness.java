/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.aksw.simba.semanticsim.sparql;

import java.io.IOException;
import java.util.List;

import org.aksw.simba.semanticsim.Relatedness;
import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author DiegoMoussallem
 */
public class SparqlRelatedness implements Relatedness {

    public String getRelated(String uri) throws IOException {
        SparqlRetrieval sparql = new SparqlRetrieval();
        //Related resources are taken from specific data set which uses PageRank Algorithm
        List<String> resourcesRel = sparql.sparqlRelated(uri);

        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(resourcesRel);
    }
}
