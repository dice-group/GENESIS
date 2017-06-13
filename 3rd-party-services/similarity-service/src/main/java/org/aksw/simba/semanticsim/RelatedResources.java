/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.aksw.simba.semanticsim;

import java.io.IOException;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author DiegoMoussallem
 */
public class RelatedResources {

	public String GetRelated(String uri) throws IOException {
		Sparql sparql = new Sparql();
		// Related resources are taken from specific data set which uses
		// PageRank Algorithm
		List<String> resourcesRel = sparql.SparqlRelated(uri);

		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(resourcesRel);
	}
}
