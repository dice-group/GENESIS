lucene:
	cd ./3rd-party-services/search-lucene/ && make run

avatar:
	cd ./3rd-party-services/avatar-service/ && make run

similarity:
	cd ./3rd-party-services/similarity-service/ && make run

main:
	npm run build
	npm start
