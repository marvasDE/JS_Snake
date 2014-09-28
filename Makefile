all: rebuild


build: build-libs build-engine

build-engine:	
	java -jar bin/compiler.jar --externs externs/jquery-1.9.js --warning_level VERBOSE --js *.js closure-library/closure/goog/base.js --js_output_file bin/compiled.js

build-libs:
	java -jar bin/compiler.jar --externs externs/jquery-1.9.js --js libs/*.js --js_output_file bin/extern.js

build-release:
	java -jar bin/compiler.jar --externs externs/jquery-1.9.js libs/*.js --compilation_level ADVANCED_OPTIMIZATIONS --js *.js --js_output_file bin/release.js

rebuild: clean build

rebuild-engine: clean-engine build-engine

rebuild-libs: clean-libs build-libs

rebuild-release: clean-release build-release

clean: clean-engine clean-libs

clean-engine:
	rm -f bin/compiled.js
	
clean-libs:
	rm -f bin/extern.js

clean-release:
	rm -f bin/release.js