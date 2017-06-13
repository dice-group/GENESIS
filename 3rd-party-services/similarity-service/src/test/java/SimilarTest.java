/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author diegomoussallem
 */
import java.io.FileWriter;
import java.io.IOException;

import org.aksw.simba.semanticsim.SemanticSimilarity;

/**
 *
 * @author aksw
 */
public class SimilarTest {

	public static void main(String args[]) throws IOException {

		SemanticSimilarity sim = new SemanticSimilarity();

		String uri = "http://dbpedia.org/resource/Albert_Einstein";

		String json = sim.SemSim1xN(uri);

		try {
			FileWriter file = new FileWriter("SimilarResources.json");
			file.write(json.toString());
			file.flush();
			file.close();

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
