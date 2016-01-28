module.exports = function(grunt) {  

    // Project configuration.
    grunt.initConfig({
        data : grunt.file.readJSON('src/data/data.json'),
        assemble: {
        	inline_pages: {
                options: {
                    layout: "./src/templates/post.hbs",
                    site: {
                        title: "A Blog",
                        author: "Jon Schlinkert"
                    },
                    pages: '<%= data.pages %>'
                },
                files: {
                  'dist/': ['!*']
                }
            }
        },
        clean: {
        	options: { force: true },
    		all: ['./dist/*.html']
		}
    });

    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ['clean', 'assemble']);
};