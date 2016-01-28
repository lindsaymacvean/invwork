'use strict';

module.exports = function(grunt) {
    var path = require('path');
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

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
        taxonomies: grunt.file.readJSON('test-templates/taxonomy/taxonomies.json'),
        assemble: {
        	options: {
        		flatten: true,
        		layoutdir: 'test-templates/meta_test_templates/',
        		partials: [
                    'test-templates/general_includes/**/*.hbs', 
                    'test-templates/users/**/*.hbs', 
                    'test-templates/content/**/*.hbs',
                    'test-templates/taxonomy/**/*.hbs'] 
        	},
            basic_test_units: {
                // outputs each partial as a test topped and tailed with xml
                options: { layout: 'basic_test_units.hbs'},
                dest: '../compiledTests/individual_building_blocks',
                src: [
                    './test-templates/general_includes/*.hbs',
                    './test-templates/content/**/*.hbs'
                    ],
                flatten: false
            },
            webmaster_content_crud: {
                options: { layout: 'content/webmaster_crud.hbs' },
                dest: '../compiledTests/content/webmaster',
                cwd: 'test-templates/content/content_types/',
                src: ['*.hbs'],
                flatten: true,
                expand: true,
                rename: prefixer
            },
            publisher_content_crud: {
                options: { layout: 'content/publisher_crud.hbs' },
                dest: '../compiledTests/content/publisher',
                cwd: 'test-templates/content/content_types/',
                src: ['*.hbs', '!blog_crud.hbs'],
                flatten: true,
                expand: true,
                rename: prefixer
            },
            editor_content_crud: {
                options: { layout: 'content/editor_crud.hbs' },
                dest: '../compiledTests/content/editor',
                cwd: 'test-templates/content/content_types/',
                src: ['*.hbs', '!blog_crud.hbs'],
                flatten: true,
                expand: true,
                rename: prefixer
            },
        	author_content_crud: {
                options: { layout: 'content/author_crud.hbs' },
                dest: '../compiledTests/content/author/',
                cwd: 'test-templates/content/content_types/',
                src: ['*.hbs', '!blog_crud.hbs'],
                flatten: true,
                expand: true,
                rename: prefixer
            },
            blogger_content_crud: {
                options: { layout: 'content/blogger_crud.hbs' },
                dest: '../compiledTests/content/blogger/',
                cwd: 'test-templates/content/content_types/',
                src: ['blog_crud.hbs', 'discussion_crud.hbs', 'list_crud.hbs', 'question_crud.hbs'],
                flatten: true,
                expand: true,
                rename: prefixer
            },
            organisational_user_access: {
                options: { layout: 'content/organisational_user_access.hbs' },
                src: 'test-templates/meta_test_templates/content/organisational_user_access.hbs',
                dest: '../compiledTests/content/organisational_user/organisational_user_access.html'
            },
            organisational_user_content_CRUD: {
                options: { layout: 'content/organisational_user_crud.hbs' },
                dest: '../compiledTests/content/organisational_user/',
                cwd: 'test-templates/content/content_types/',
                src: ['discussion_crud.hbs', 'list_crud.hbs', 'question_crud.hbs'],
                flatten: true,
                expand: true,
                rename: prefixer
            },
            webmaster_taxonomy_crud: {
                options: {
                    plugins: ['grunt-assemble-permalinks'],
                    permalinks: {
                      structure: 'webmaster_taxonomy_:filename:ext'
                    },
                    layout: "taxonomy/webmaster_crud.hbs",
                    pages: '<%= taxonomies.pages %>'
                },
                files: {
                  '../compiledTests/taxonomy/webmaster/': ['!*']
                }
            }
        },
        clean: {
        	options: { force: true },
    		all: ['../compiledTests/**/*.html']
		},
        watch: {
            scripts: {
                files: ['test-templates/**/*', 'Gruntfile.js'],
                tasks: ['default'],
                options: {
                    spawn: false,
                    reload: true
                }
            }
        },
        shell: {
            options: {
                stderr: false,
            },
            taxonomy_suite: {
                options: {
                    execOptions: {
                        cwd: '../compiledTests/taxonomy'
                    }
                },
                command: './generatesuite.sh'
            },
            content_suite: {
                options: {
                    execOptions: {
                        cwd: '../compiledTests/content'
                    }
                },
                command: './generatesuite.sh'
            }
        },
        copy: {
            content: {
                expand: true, 
                flatten: true,
                src: ['../compiledTests/content/webmaster/*'], 
                dest: '../tests/core/content/webmaster/', 
                filter: 'isFile'
            },
            taxonomy: {
                expand: true, 
                flatten: true,
                src: ['../compiledTests/taxonomy/webmaster/*'], 
                dest: '../tests/core/taxonomy/', 
                filter: 'isFile'
            },
        }
        
    });
    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['clean', 'assemble', 'shell', 'copy']);
    grunt.registerTask('content', ['copy:content']);
    grunt.registerTask('taxonomy', ['copy:taxonomy']);
};