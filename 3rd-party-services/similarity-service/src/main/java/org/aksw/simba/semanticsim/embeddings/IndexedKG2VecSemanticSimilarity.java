package org.aksw.simba.semanticsim.embeddings;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.aksw.simba.semanticsim.SemanticSimilarity;
import org.aksw.simba.semanticsim.ValuesTemp;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.Term;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TermQuery;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.SimpleFSDirectory;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * Precomputed index of the model described in {@link KG2VecSemanticSimilarity}.
 * 
 * @author Tommaso Soru {@literal tsoru@informatik.uni-leipzig.de}
 *
 */
public class IndexedKG2VecSemanticSimilarity implements SemanticSimilarity {

	private static Logger logger = LoggerFactory.getLogger(IndexedKG2VecSemanticSimilarity.class);
	
	private Directory index;
	private IndexReader reader;
	private IndexSearcher searcher;
	
	public IndexedKG2VecSemanticSimilarity() {
		super();
		checkIndex();
	}
	
	public void checkIndex() {

		logger.info("Checking Lucene index of similar entities...");
		
		try {
			index = new SimpleFSDirectory(new File("./index"));
			reader = DirectoryReader.open(index);
		} catch (IOException e) {
			logger.error(e.getMessage());
			e.printStackTrace();
		}
		searcher = new IndexSearcher(reader);
		
		logger.info("Entities found: " + reader.numDocs());
	}
	

	@Override
	public String getSimilar(String uri) throws IOException {
		
		if(index == null) {
			checkIndex();
		}

		TermQuery q = new TermQuery(new Term("uri", uri));
		TopDocs docs = searcher.search(q, 1);
		ScoreDoc[] hits = docs.scoreDocs;
		System.out.println("hits: " + docs.totalHits);

		List<ValuesTemp> results = new ArrayList<>();
		for (ScoreDoc h : hits) {
			Document doc = reader.document(h.doc);

			logger.info("Similar entities of " + uri);
			String similar = doc.get("similar");
			for (String entity : similar.split("\n")) {
				String[] entry = entity.split(";");
				ValuesTemp val = new ValuesTemp();
				val.setEntity(uri);
				val.setEntity2(entry[0]);
				val.setSimilarity(Double.parseDouble(entry[1]));
				results.add(val);
			}
		}

		return new ObjectMapper().writeValueAsString(results);
	}




}
