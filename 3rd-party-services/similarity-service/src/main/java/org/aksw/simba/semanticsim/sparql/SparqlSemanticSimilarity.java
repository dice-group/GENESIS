/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.aksw.simba.semanticsim.sparql;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.aksw.simba.semanticsim.SemanticSimilarity;
import org.aksw.simba.semanticsim.ValuesTemp;
import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author DiegoMoussallem
 */
public class SparqlSemanticSimilarity implements SemanticSimilarity {

	public String getSimilar(String uri) throws IOException {

		List<ValuesTemp> Listtemp = new ArrayList<>();
		List<ValuesTemp> Results = new ArrayList<>();
		List<String> candidates = new ArrayList<>();
		SparqlRetrieval sparql = new SparqlRetrieval();
		// Here, resources which belong to the same class are taken.
		// Now, each retrieved resource is compared to the given resource to
		// measure the semantic similarity between them using Jaccard index
		// using the own libray.
		try {
			candidates = sparql.sparqlSimilar(uri);
		} catch (Exception e) {
		}

		if (!candidates.isEmpty()) {
			for (int i = 1; i < candidates.size(); i++) {
				ValuesTemp temp = new ValuesTemp();
				temp.setEntity(uri);
				temp.setEntity2(candidates.get(i));
				temp.setSimilarity(0.8);
				Listtemp.add(temp);
			}

			// Organizing and retrieving only top 20 resources.
			Collections.sort(Listtemp);
			for (int i = 0; i < 19; i++) {
				Results.add(Listtemp.get(i));
			}
		}
		ObjectMapper mapper = new ObjectMapper();

		// returining the results in json structure.
		return mapper.writeValueAsString(Results);

	}
}
