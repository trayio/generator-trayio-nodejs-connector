
module.exports = function (grunt) {

	grunt.initConfig({

		jshint: {
	    all: [
	    	'Gruntfile.js', 
	    	'main.js',
	    	'operations/*.js', 
	    	'operations/**/*.js', 
	    	'triggers/*.js',
	    	'operations/**/*.js'
	    ]
	  },

	  watch: {
		  scripts: {
		    files: [
		    	'*.js',
		    	'operations/*.js', 
		    	'operations/**/*.js', 
		    	'triggers/*.js',
		    	'operations/**/*.js'
		    ],
		    tasks: ['jshint'],
		    options: {
		      spawn: false,
		    },
		  },
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('dev', ['watch']);


};