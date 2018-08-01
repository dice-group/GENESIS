package org.aksw.simba.semanticsim.embeddings;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.aksw.simba.semanticsim.SemanticSimilarity;
import org.aksw.simba.semanticsim.ValuesTemp;
import org.codehaus.jackson.map.ObjectMapper;
import org.deeplearning4j.models.embeddings.loader.WordVectorSerializer;
import org.deeplearning4j.models.embeddings.wordvectors.WordVectors;

/**
 * @author Tommaso Soru {@literal tsoru@informatik.uni-leipzig.de}
 *
 */
public class KG2VecSemanticSimilarity implements SemanticSimilarity {

	@Override
	public String getSimilar(String uri) throws IOException {
		
		WordVectors model = WordVectorSerializer.readWord2VecModel(new File("vectors.txt"));
		
		Collection<String> nearest = model.wordsNearest(uri, 10);
		
		List<ValuesTemp> results = new ArrayList<>();
		for(String ent : nearest) {
			ValuesTemp val = new ValuesTemp();
			val.setEntity(uri);
			val.setEntity2(ent);
			val.setSimilarity(model.similarity(uri, ent));
			results.add(val);
		}
		
		return new ObjectMapper().writeValueAsString(results);
	}
	
}
