OLD		= ls -l | grep .js | sed -r 's/.+\s(\S+)/\1/'
NAME	= ls src | sed -r 's/ender\.js|package\.json|\s+//' | sed -nr 's/(.+)\.js/\1/p'
VERSION	= grep -m 1 Version src/\`${NAME}\`.js | sed -r 's/.*:\s*(.+)/\1/'
SHEETHUB= ls libs | grep Sheethub
W		= ls libs | grep W

all: lint minify

lint:
	@jshint src/`${NAME}`.js --config config/jshint.json

minify:
	@rm -f `${OLD}`
	@uglifyjs -nc src/`${NAME}`.js > `${NAME}`-`${VERSION}`.min.js
	@cat libs/`${SHEETHUB}` `${NAME}`-`${VERSION}`.min.js > `${NAME}`-`${VERSION}`.Sheethub.min.js
	@cat libs/`${W}` `${NAME}`-`${VERSION}`.min.js > `${NAME}`-`${VERSION}`.W.min.js
	@cat libs/`${W}` libs/`${SHEETHUB}` `${NAME}`-`${VERSION}`.min.js > `${NAME}`-`${VERSION}`.Sheethub.W.min.js

instdeps:
	@npm install jshint -g
	@npm install uglify-js -g