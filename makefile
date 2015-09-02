./dest/url.js: ./src/url.js ./dest
	./node_modules/.bin/babel ./src/url.js -o ./dest/url.js --modules umd --module-id Url

./dest:
	mkdir ./dest
