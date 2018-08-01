package org.aksw.simba.semanticsim;

import java.io.IOException;

/**
 * @author Tommaso Soru {@literal tsoru@informatik.uni-leipzig.de}
 *
 */
public interface SemanticSimilarity {

	public String getSimilar(String uri) throws IOException;
	
}
