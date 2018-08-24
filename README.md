# TVify
Search for TV shows, using the API of www.tvmaze.com

# Dependencies
"dependencies": {
		"jquery": "^2.1.4",
		"page": "^1.6.4",
		"qs": "^6.0.0",
		"serve": "^1.4.0",
		"sweetalert2": "^7.26.12"
	}
 
 # Scripts
 "scripts": {
		"public": "mkdir -p public",
		"build-js": "NODE_PATH=. browserify -t [ babelify --presets [es2015 ] ] src/index.js > public/app.js",
		"copy-files": "cp src/index.css public/app.css && cp src/index.html public/index.html",
		"build": "npm run public && npm run build-js && npm run copy-files",
		"serve": "serve public"
	}

# Install

npm install   // install dependencies
npm run build // generate app.js app.css and index.html
npm run serve // turn on server
