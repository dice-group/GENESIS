package org.aksw.simba.semanticsim;

import java.io.IOException;

/**
 * @author Tommaso Soru {@literal tsoru@informatik.uni-leipzig.de}
 *
 */
public interface Relatedness {

	public String getRelated(String uri) throws IOException;
	
}
