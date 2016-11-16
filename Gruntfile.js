'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var serveStatic = require('serve-static');
var mountFolder = function (connect, dir) {
    return serveStatic(require('path').resolve(dir));
};

module.exports = function(grunt) {

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    // Project configuration.
    grunt.initConfig({
        zApp: yeomanConfig,
        // Metadata.
        pkg: grunt.file.readJSON('y.jquery.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        clean: {
            files: ['dist'],
            server: '.tmp'
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/jquery.<%= pkg.name %>.js'],
                dest: 'dist/jquery.<%= pkg.name %>.js'
            },
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/jquery.<%= pkg.name %>.min.js'
            },
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            options: {
                jshintrc: true
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['src/**/*.js']
            },
            test: {
                src: ['test/**/*.js']
            },
        },
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            },
            compass: {
                files: ['<%= zApp.app %>/styles/{,*/}{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                options: {
                    livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
                },
                files: [
                    '<%= zApp.app %>/*.html',
                    '{.tmp,<%= zApp.app %>}/styles/{,*/}{,*/}*.css',
                    '{.tmp,<%= zApp.app %>}/scripts/{,*/}*{,*/}*.js',
                    '<%= zApp.app %>/images/{,*/}{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%= zApp.app %>/scripts/templates/{,*/}{,*/}*.{ejs,mustache,hbs}',
                    'test/spec/**/*.js'
                ]
            },
        },
        connect: {
            options: {
                port: grunt.option('port') || SERVER_PORT,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            },
        },
        compass: {
			options: {
				sassDir: '<%= zApp.app %>/styles',
				cssDir: '<%= zApp.app %>/styles',
				imagesDir: '<%= zApp.app %>/images',
				javascriptsDir: '<%= zApp.app %>/scripts',
				relativeAssets: true
			},
			dist: {},
			server: {
				options: {
					debugInfo: true
				}
			}
		},
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    // Default task.
    //grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'concat', 'uglify']);
    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'clean:server',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

};
