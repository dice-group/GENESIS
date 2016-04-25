package org.aksw.simba.semanticsim;

import static spark.Spark.get;
import static spark.Spark.port;

public class Service {

    public static void main(String[] args) {
        RelatedResources rel = new RelatedResources();
        SemanticSimilarity sim = new SemanticSimilarity();
        port(8183);
        get("/related", (request, response) -> {
            String url = request.queryParams("url");
            return rel.GetRelated(url);
        });
        get("/similar", (request, response) -> {
            String url = request.queryParams("url");
            return sim.SemSim1xN(url);
        });
    }
}
