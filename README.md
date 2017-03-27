# GENESIS – A Generic RDF Data Access Interface

## Start with Docker

The simplest way to get Genesis running is to use Docker.
Here's how to do that:

1. Make sure you have latest docker and docker-compose installed.
2. Clone this repo
3. Execute `docker-compose up`
4. Navigate to [http://docker.dev:8080](http://docker.dev:8080) (replace with your docker host) in your browser

## Development

### Requirements

1. Java and Maven (for 3rd party services)
2. node.js 4+ and npm 3+ (for Ginseng services and UI)
3. Download the Dbpedia index from http://139.18.2.164/dmoussallem/dbpedia_index/en/indexdbpedia_en_2016.zip for running the similarity service. Extract the index zip file in (3rd-party-services/similarity-service/)

### Installing

1. Clone this repo
2. Run "npm install"

### Starting

1. Start all third party services:
    1. Start Lucene search with `make lucene` (make sure you add your Lucene index into `./3rd-party-services/search-lucene/`, you can get precalculated DBpedia index from [here](http://139.18.2.164/termilov/index.zip))
    2. Start AVATAR summarisation with `make avatar`
    3. Start similarity service with `make similarity`
2. Start Ginseng by running `make main` (or `npm start`)
3. Navigate to [http://localhost:8080](http://localhost:8080) in your browser

## License

Dual licensed under GPL-3.0 and commercial license.
See [LICENSE.md](LICENSE.md) file for more details.
