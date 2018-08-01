package org.aksw.simba.semanticsim;

import static spark.Spark.get;
import static spark.Spark.port;

import org.aksw.simba.semanticsim.sparql.SparqlRelatedness;
import org.aksw.simba.semanticsim.sparql.SparqlSemanticSimilarity;

public class Service {

    public static void main(String[] args) {
        SparqlRelatedness rel = new SparqlRelatedness();
        SparqlSemanticSimilarity sim = new SparqlSemanticSimilarity();
        port(8183);
        get("/related", (request, response) -> {
            String url = request.queryParams("url");
            return rel.getRelated(url);
        });
        get("/similar", (request, response) -> {
            String url = request.queryParams("url");
            return sim.getSimilar(url);
        });
    }
}
