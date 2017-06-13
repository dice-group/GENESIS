default: build

run: clean build start

build:
	mvn package

start:
	mvn exec:java -Dexec.args="-Xms20G -Xmx20G"

clean:
	mvn clean
