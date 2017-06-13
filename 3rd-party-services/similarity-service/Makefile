default: build

run: build start

build:
	mvn package

start:
	mvn exec:java -Dexec.args="-Xms20G -Xmx20G"

clean:
	mvn clean
