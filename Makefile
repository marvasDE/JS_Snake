all: rebuild


build: build-libs build-engine

build-engine:	
	java -jar bin/compiler.jar --externs externs/jquery-1.9.js --warning_level VERBOSE --js *.js --js_output_file bin/compiled.js

build-libs:
	java -jar bin/compiler.jar --externs externs/jquery-1.9.js --js libs/*.js --js_output_file bin/extern.js


rebuild: clean build

rebuild-engine: clean-engine build-engine

rebuild-libs: clean-libs build-libs



clean: clean-engine clean-libs

clean-engine:
	rm -f bin/compiled.js
	
clean-libs:
	rm -f bin/extern.js
