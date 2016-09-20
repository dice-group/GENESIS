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
import java.util.stream.IntStream;
import org.codehaus.jackson.map.ObjectMapper;
import org.aksw.simba.semanticsim.util.Triple;
import org.aksw.simba.semanticsim.util.TripleIndex;

/**
 *
 * @author DiegoMoussallem
 */
public class SemanticSimilarity {

    private int inter = 0;

    public String SemSim1xN(String uri) throws IOException {

        List<ValuesTemp> Listtemp = new ArrayList<>();
        List<ValuesTemp> Results = new ArrayList<>();
        double result = 0;
        Sparql sparql = new Sparql();
        //Here, resources which belong to the same class are taken.

        String property;

        property = sparql.SparqlMostSpecificClass(uri);
        //gathering all resources which share the same class.
        ArrayList<Triple> candidates = searchCandidatesByType(property);

        //gathering resources which share the same class and which have a high pagerank score.
        //List<String> candidates = sparql.SparqlRelatedClass(property);
        for (int i = 1; i < candidates.size(); i++) {
            //Now, each retrieved resource is compared to the given resource to measure the semantic similarity between them using Jaccard index using the triple store.
            //result = sparql.SemSim(uri, candidates.get(i));

            //Now, each retrieved resource is compared to the given resource to measure the semantic similarity between them using Jaccard index using the own libray.
            if(!uri.equals(candidates.get(i).getSubject())){
            result = similarityTriple(uri, candidates.get(i).getSubject());
            
            ValuesTemp temp = new ValuesTemp();

            temp.setEntity(uri);
            temp.setEntity2(candidates.get(i).getSubject());
            temp.setSimilarity(result);
            Listtemp.add(temp);
            }
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

    ArrayList<Triple> searchCandidates(String type) throws IOException {

        TripleIndex index = new TripleIndex();
        ArrayList<Triple> tmp = new ArrayList<Triple>();
        tmp.addAll(index.search(null, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", type));

        return tmp;

    }

    ArrayList<Triple> getTriples(String uri) throws IOException {

        TripleIndex index = new TripleIndex();
        ArrayList<Triple> tmp = new ArrayList<Triple>();
        tmp.addAll(index.search(uri, null, null));
        return tmp;

    }

    ArrayList<Triple> searchCandidatesByType(String type) throws IOException {

        TripleIndex index = new TripleIndex();
        ArrayList<Triple> tmp = new ArrayList<Triple>();
        tmp.addAll(index.search(null, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", type));

        return tmp;

    }

    public double similarityTriple(String uri, String resource) throws IOException {

        final ArrayList<Triple> candidateTriples = new ArrayList<Triple>();
        final ArrayList<Triple> uriTriples = new ArrayList<Triple>();
        double total;
        SemanticSimilarity b = new SemanticSimilarity();
        setInter(0);
        uriTriples.addAll(b.getTriples(uri));
        candidateTriples.addAll(b.getTriples(resource));
        total = candidateTriples.size() + uriTriples.size();

        if (candidateTriples.size() > uriTriples.size()) {
            IntStream.range(0, candidateTriples.size()).parallel().forEach((int i) -> {
                IntStream.range(0, uriTriples.size()).forEach((int j) -> {
                    if (candidateTriples.get(i).getObject().equals(uriTriples.get(j).getObject())) {
                        setInter(inter + 1);
                    }
                });
            });
        } else if ((candidateTriples.size() <= uriTriples.size())) {
            IntStream.range(0, uriTriples.size()).parallel().forEach((int i) -> {
                IntStream.range(0, candidateTriples.size()).forEach((int j) -> {
                    if (uriTriples.get(i).getObject().equals(candidateTriples.get(j).getObject())) {
                        setInter(inter + 1);
                    }
                });
            });
        }
        int inter2 = getInter();
        return (inter2 / total);
    }

    public int getInter() {
        return inter;
    }

    public void setInter(int inter) {
        this.inter = inter;
    }

}
