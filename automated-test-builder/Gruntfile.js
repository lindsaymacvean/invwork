module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
        	options: {
        		flatten: true,
        		layoutdir: 'test-templates/meta_test_templates',
        		partials: ['test-templates/general_includes/**/*.hbs', 'test-templates/author/**/*.hbs', 'test-templates/content/**/*.hbs'] 
        	},
        	author_crud: {
                options: { layout: 'author_crud.hbs' },
                dest: '../compiled-tests/content/author',
                src: ['test-templates/content/content_types/*.hbs']
            },
            basic_test_units: {
                options: { layout: 'basic_test_units.hbs'},
                dest: '../compiled-tests',
                src: ['test-templates/general_includes/*.hbs']
            }
        },
        clean: {
        	options: { force: true },
    		all: ['../compiled-tests/**/*.html']
		}
    });
    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ['clean', 'assemble']);
};