module.exports = function(grunt) {

function rename(dest, src) {
    var path = require('path');

    // Get the name of the component folder (or first folder in src path)
    var component = src.split(path.sep).slice(0, 1)[0];

    // Prefix each javascript file with the
    // component folder name into the destination
    return path.join(dest, component + '_' + path.basename(src));
}

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
        	options: {
        		flatten: true,
        		layoutdir: 'test-templates/meta_test_templates',
        		partials: [
                    'test-templates/general_includes/**/*.hbs', 
                    'test-templates/users/**/*.hbs', 
                    'test-templates/content/**/*.hbs'] 
        	},
            basic_test_units: {
                options: { layout: 'basic_test_units.hbs'},
                dest: '../compiled-tests/individual_building_blocks',
                src: [
                    'test-templates/general_includes/*.hbs',
                    'test-templates/content/**/*.hbs'
                    ]
            },
            webmaster_crud: {
                options: { layout: 'webmaster_crud.hbs' },
                //expand: true,
                flatten: true,
                rename: function (dest, matchedSrcPath) {
                    var filename = 'webmaster_' + path.basename(matchedSrcPath);
                    return path.join(dest, path.dirname(matchedSrcPath), filename);
                },
                dest: '../compiled-tests/content/webmaster/',
                src: ['test-templates/content/content_types/*.hbs']
            },
            publisher_crud: {
                options: { layout: 'publisher_crud.hbs' },
                dest: '../compiled-tests/content/publisher',
                src: ['test-templates/content/content_types/*.hbs']
            },
            editor_crud: {
                options: { layout: 'editor_crud.hbs' },
                dest: '../compiled-tests/content/editor',
                src: ['test-templates/content/content_types/*.hbs']
            },
        	author_crud: {
                options: { layout: 'author_crud.hbs' },
                dest: '../compiled-tests/content/author',
                src: ['test-templates/content/content_types/*.hbs']
            }
        },
        clean: {
        	options: { force: true },
    		all: ['../compiled-tests/**/*.html']
		}
    });
    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['clean', 'assemble']);
};