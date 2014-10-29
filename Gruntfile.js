module.exports = function(grunt) {

	grunt.initConfig({
		// Load bower file
		bower: grunt.file.readJSON('bower.json'),
		// Remove obsolete files
		clean: {
			old: ['*.min.js']
		},
		// Lint
		jshint: {
			library: ['src/*.js'],
			options: {
				browser		: true,
				predef		: ['W', 'Sheethub', 'define', 'module', 'ActiveXObject', 'console', 'log'],
				boss		: true,
				curly		: true,
				eqnull		: true,
				newcap		: false,
				undef		: true,
				loopfunc	: true,
				evil		: true,
				proto		: true,
				es3			: true,
			}
		},
		// Minify
		uglify: {
			library: {
				files: {
					'mediatizr.min.js': ['src/mediatizr.js']
				}
			}
		},
		// Concatenate
		concat: {
			Sheethub: {
				src: ['lib/Sheethub*.js', 'mediatizr.min.js'],
				dest: 'mediatizr.Sheethub.min.js'
			},
			W: {
				src: ['lib/W*.js', 'mediatizr.min.js'],
				dest: 'mediatizr.W.min.js'
			},
			SheethubW: {
				src: ['lib/Sheethub*.js', 'lib/W*.js', 'mediatizr.min.js'],
				dest: 'mediatizr.Sheethub.W.min.js'
			}
		},
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Define tasks
	grunt.registerTask('default', ['clean:old', 'jshint', 'uglify', 'concat']);

};