all: rm-all compile-all

compile-all: compile-engine compile-extern

engine: rm-engine compile-engine
extern: rm-extern compile-extern

compile-engine:	
	java -jar bin/compiler.jar --js *.js --js_output_file bin/compiled.js

compile-extern:
	java -jar bin/compiler.jar --js libs/*.js --js_output_file bin/extern.js


rm-all: rm-engine rm-extern

rm-engine:
	rm bin/compiled.js
	
rm-extern:
	rm bin/extern.js
