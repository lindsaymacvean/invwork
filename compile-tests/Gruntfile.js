module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
        	options: {
        		flatten: true,
        		layoutdir: "../test-templates/author_templates",
        		partials: ['../test-templates/general_includes/**/*.hbs']
        	},
        	author_crud: {
                options:  {
                    layout: "author_crud.hbs"
                },
                dest: '../compiled-tests/content/author',
                src: ['../test-templates/content_templates/author/*.hbs']
            }
        },
        clean: {
        	options: { force: true },
    		all: ['../compiled-tests/*.html']
		}
    });
    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ['clean', 'assemble']);
};