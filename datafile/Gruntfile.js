'use strict';
var _ = require('lodash');
var path = require('path');

module.exports = function(grunt) {  

    // load the recipe template from the desired path
  var recipeTemplate = grunt.file.read('./src/templates/pages/recipe.hbs');
  
  // expand the data files and loop over each filepath
  var pages = _.flatten(_.map(grunt.file.expand('./src/data/recipe*.json'), function(filepath) {
    
    // read in the data file
    var data = grunt.file.readJSON(filepath);
    
    // create a 'page' object to add to the 'pages' collection
    return {
      // the filename will determine how the page is named later
      filename: path.basename(filepath, path.extname(filepath)),
      // the data from the json file
      data: data,
      // add the recipe template as the page content
      content: recipeTemplate
    };
  }));

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
        config: {
          src: 'src',
          dist: 'dist'
        },
        assemble: {
        	pages: {
                options: {
                    flatten: true,
                    assets: '<%= config.dist %>/assets',
                    layout: '<%= config.src %>/templates/layouts/default.hbs',
                    data: '<%= config.src %>/data/*.{json,yml}',
                    partials: '<%= config.src %>/templates/partials/*.hbs',

                    // add the pages array from above to the pages collection on the assemble options
                    pages: pages
                },
                files: [
                    // currently we need to trick grunt and assemble into putting the pages file into the correct
                    // place using this pattern
                    { dest: './dist/', src: '!*' }
                ]
            }
        },
        clean: {
        	options: { force: true },
    		all: ['./compiled-tests/**/*.html']
		},
    });
    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['clean', 'assemble']);
};