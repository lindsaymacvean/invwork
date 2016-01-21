'use strict';
var _ = require('lodash');
var path = require('path');

module.exports = function(grunt) {

    // This function prefixes each output test.html file with its parent directory name
    // e.g. parent_test.html
    var prefixer = function (dest, src) {
        var userType = path.basename(dest);
        var filename = userType + '_' + path.basename(src);
        return path.join(dest, path.dirname(src), filename);
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
        	options: {
        		flatten: true,
        		layoutdir: 'test-templates/meta_test_templates/',
        		partials: [
                    'test-templates/general_includes/**/*.hbs', 
                    'test-templates/users/**/*.hbs', 
                    'test-templates/content/**/*.hbs'] 
        	},
            basic_test_units: {
                // outputs each partial as a test topped and tailed with xml
                options: { layout: 'basic_test_units.hbs'},
                dest: '../compiled-tests/individual_building_blocks',
                src: [
                    './test-templates/general_includes/*.hbs',
                    './test-templates/content/**/*.hbs'
                    ],
                flatten: false
            },
            webmaster_crud: {
                options: { layout: 'webmaster_crud.hbs' },
                dest: '../compiled-tests/content/webmaster',
                cwd: 'test-templates/content/content_types/',
                src: ['*.hbs'],
                flatten: true,
                expand: true,
                rename: prefixer
            },
            publisher_crud: {
                options: { layout: 'publisher_crud.hbs' },
                dest: '../compiled-tests/content/publisher',
                cwd: 'test-templates/content/content_types/',
                src: ['*.hbs', '!blog_crud.hbs'],
                flatten: true,
                expand: true,
                rename: prefixer
            },
            editor_crud: {
                options: { layout: 'editor_crud.hbs' },
                dest: '../compiled-tests/content/editor',
                cwd: 'test-templates/content/content_types/',
                src: ['*.hbs', '!blog_crud.hbs'],
                flatten: true,
                expand: true,
                rename: prefixer
            },
        	author_crud: {
                options: { layout: 'author_crud.hbs' },
                dest: '../compiled-tests/content/author/',
                cwd: 'test-templates/content/content_types/',
                src: ['*.hbs', '!blog_crud.hbs'],
                flatten: true,
                expand: true,
                rename: prefixer
            },
            blogger_crud: {
                options: { layout: 'blogger_crud.hbs' },
                dest: '../compiled-tests/content/blogger/',
                cwd: 'test-templates/content/content_types/',
                src: ['blog_crud.hbs', 'discussion_crud.hbs', 'list_crud.hbs', 'question_crud.hbs'],
                flatten: true,
                expand: true,
                rename: prefixer
            },
            organisational_user_access: {
                options: { layout: 'organisational_user_access.hbs' },
                src: 'test-templates/meta_test_templates/organisational_user_access.hbs',
                dest: '../compiled-tests/content/organisational_user/organisational_user_access.html'
            },
            organisational_user_CRUD: {
                options: { layout: 'organisational_user_crud.hbs' },
                dest: '../compiled-tests/content/organisational_user/',
                cwd: 'test-templates/content/content_types/',
                src: ['discussion_crud.hbs', 'list_crud.hbs', 'question_crud.hbs'],
                flatten: true,
                expand: true,
                rename: prefixer
            }
        },
        clean: {
        	options: { force: true },
    		all: ['../compiled-tests/**/*.html']
		},
    });
    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['clean', 'assemble']);
};