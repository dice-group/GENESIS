FROM maven

WORKDIR /app
COPY . /app

RUN mvn package

EXPOSE 8183
VOLUME /root/.m2/repository

CMD ["mvn", "exec:java"]
