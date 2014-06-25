module.exports = function(grunt) {

	grunt.initConfig({
		// Load bower file
		bower: grunt.file.readJSON('bower.json'),
		// Remove obsolete files
		clean: {
			old: ['*.min.js'],
			work: ['mediatizr.min.js']
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
					'mediatizr-<%= bower.version %>.min.js': ['src/mediatizr.js']
				}
			}
		},
		// Concatenate
		concat: {
			Sheethub: {
				src: ['lib/Sheethub*.js', 'mediatizr-<%= bower.version %>.min.js'],
				dest: 'mediatizr-<%= bower.version %>.Sheethub.min.js'
			},
			W: {
				src: ['lib/W*.js', 'mediatizr-<%= bower.version %>.min.js'],
				dest: 'mediatizr-<%= bower.version %>.W.min.js'
			},
			SheethubW: {
				src: ['lib/Sheethub*.js', 'lib/W*.js', 'mediatizr-<%= bower.version %>.min.js'],
				dest: 'mediatizr-<%= bower.version %>.Sheethub.W.min.js'
			}
		},
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Define tasks
	grunt.registerTask('default', ['clean:old', 'jshint', 'uglify', 'concat', 'clean:work']);

};