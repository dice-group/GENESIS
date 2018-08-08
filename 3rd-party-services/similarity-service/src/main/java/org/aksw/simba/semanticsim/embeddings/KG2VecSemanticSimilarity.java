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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * Computes the semantic similarity through cosine between the vectors obtained
 * from the KG2Vec model of the knowledge graph (in Word2Vec text format).
 * 
 * @author Tommaso Soru {@literal tsoru@informatik.uni-leipzig.de}
 *
 */
public class KG2VecSemanticSimilarity implements SemanticSimilarity {

	private static Logger logger = LoggerFactory.getLogger(KG2VecSemanticSimilarity.class);

	private WordVectors model;
		
	public KG2VecSemanticSimilarity() {
		super();
		checkModel();
	}
	
	public void checkModel() {

		logger.info("Checking KG2Vec model of similar entities...");
		
		String file = "model/dbpedia_d100_pca20_norm.w2v";
		logger.info("Loading KG2Vec model '" + file + "'...");
		model = WordVectorSerializer.readWord2VecModel(new File(file));
		logger.info("Loaded.");
		
	}

	@Override
	public String getSimilar(String uri) throws IOException {

		Collection<String> nearest = model.wordsNearest(uri, 10);

		List<ValuesTemp> results = new ArrayList<>();
		for (String ent : nearest) {
			ValuesTemp val = new ValuesTemp();
			val.setEntity(uri);
			val.setEntity2(ent);
			val.setSimilarity(model.similarity(uri, ent));
			results.add(val);
		}

		return new ObjectMapper().writeValueAsString(results);
	}

}
