# Ginseng - Generic Semantic Search Interface

## Requirements

1. Java and Maven (for 3rd party services)
2. node.js 4+ and npm 3+ (for Ginseng services and UI)

## Installing

1. Clone this repo
2. Run "npm install"

## Starting

1. Start all third party services:
    1. Start Lucene search with `make lucene` (make sure you add your Lucene index into `./3rd-party-services/search-lucene/`, you can get precalculated DBpedia index from [here](https://drive.google.com/file/d/0B4Wn5v0XvEJWcmZpNkFHNDBfcjg/view))
    2. Start AVATAR summarisation with `make avatar`
2. Start Ginseng by running `make main` (or `npm start`)
3. Navigate to [http://localhost:8080](http://localhost:8080) in your browser
