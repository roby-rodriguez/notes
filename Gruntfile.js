module.exports = function(grunt) {

    // imports
    var _ = require('lodash');

    // globals
	var gruntConfig = grunt.file.readJSON('grunt-config.json');

	grunt.initConfig( {

		appConfig: grunt.file.readJSON('package.json') || {},

		userConfig: gruntConfig,

        // Cleanup before and after
        clean: {
            build: {
                src: [ 'dist' ]
            },
            release: {
                src: [ 'public/css/style.css', 'public/css/style.css.map' ]
            }
        },

        // Copy files to dist, which is where we serve from
        copy: {
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/',
                        src: [
                            '**',
                            '!js/**',
                            '!images/**',
                            '!css/**'
                        ],
                        dest: 'dist/'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/',
                        src: [
                            '**',
                            '!**/*.scss'
                        ],
                        dest: 'dist/'
                    }
                ]
            },
            common: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/icomoon-bower/fonts/',
                        src: [ '*' ],
                        dest: 'dist/css/fonts'
                    }
                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/css/',
                        src: [ '**/*.+(css|map)' ],
                        dest: 'dist/css/'
                    }
                ]
            },
            dev_js: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/js/',
                        src: [  '**/*.js' ],
                        dest: 'dist/js/'
                    }
                ]
            },
            others: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/',
                        src: [
                            '**',
                            '!css/*',
                            '!js/*'
                        ],
                        dest: 'dist/'
                    }
                ]
            }
        },

        // Check JS sources
        jshint: {
            options: {
                reporter: 'jslint',
                reporterOutput: 'reports/js_lint.xml'
            },
            all: [ 'Gruntfile.js', 'public/js/**/*.js' ]
        },

        // Fix Angular dependency injections
        ngAnnotate: {
            // options: {},
            prod: {
                files: {
                    '<%= userConfig.uglify.src %>': ['<%= userConfig.uglify.src %>']
                }
            }
        },

		// Minify JS and add source map
		uglify: {
			prod: {
				options: {
					sourceMap: true,
					sourceMapIncludeSources: true,
					banner: '/** <%= appConfig.name %> v<%= appConfig.version %> */'
				},
				files: {
					'<%= userConfig.uglify.dest %>': [ '<%= userConfig.uglify.src %>' ]
				}
			}
		},

        // Check main SCSS source
        sasslint: {
            options: {
                formatter: 'unix',
                outputFile: 'reports/sass_lint.log'
            },
            target: [ 'public/css/*.scss' ]
        },

        // Process SCSS
        sass: {
            dist: {
                options: {
                    sourcemap: 'none'
                },
                files: {
                    '<%= userConfig.sass.dest %>': '<%= userConfig.sass.src %>'
                }
            }
        },

        // Remove unused CSS
        uncss: {
            dist: {
                options: {
                    // ignore: [ ],
                    ignoreSheets: [ /fonts.googleapis/ ]
                },
                files: {
                    '<%= userConfig.concat.css %>': [
                        'samples/*.html'
                    ]
                }
            }
        },

        // Minify css and add source map
        cssmin: {
            options: {
                sourceMap: true,
                keepSpecialComments: 0
            },
            prod: {
                files: {
                    '<%= userConfig.cssmin.dest %>': '<%= userConfig.cssmin.src %>'
                }
            }
        },

        // FIXME fugly - for some reason cssmin adds this extra rel path that we must strip to make the sourcemap visible
        replace: {
            fix_css_sourcemap: {
                overwrite: true,
                src: '<%= userConfig.replace.fix_css_sourcemap.src %>',
                replacements: [
                    {
                        from: '<%= userConfig.replace.fix_css_sourcemap.from %>',
                        to: '<%= userConfig.replace.fix_css_sourcemap.to %>'
                    }
                ]
            }
        },

        // Minify images
        imagemin: {
            options: {
                optimizationLevel: 5
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: 'public/images',
                    src: [ '**/*.{png,jpg,gif}' ],
                    dest: 'dist/images'
                }]
            }
        },

        // Concatenate files before minification
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: _.map(gruntConfig["index.html"].dev.js, function (src) {
                    if (src.value.lastIndexOf("bower_components", 0) === 0) // if startsWith
                        return src.value;
                    else
                        return 'public/' + src.value;
                }),
                dest: '<%= userConfig.concat.js %>'
            },
            css: {
                src: _.map(gruntConfig["index.html"].dev.css, function (src) {
                    if (src.value.lastIndexOf("bower_components", 0) === 0) // if startsWith
                        return src.value;
                    else
                        return 'public/' + src.value;
                }),
                dest: '<%= userConfig.concat.css %>'
            }
        },


		// Watch for changes and launch grunt default task -> launched at end of `npm install`
        // FIXME couldn't this look any better
        watch: {
            // dev watchers
            css_dev: {
                files: [ 'public/css/*.+(scss|css)', '!public/css/style.css' ],
                tasks: [ 'sass', 'copy:css', 'clean:release' ]
            },
            js_dev: {
                files: [ 'public/js/**/*.js' ],
                tasks: [ 'copy:dev_js' ]
            },
            others_dev: {
                files: [
                    'public/**',
                    '!public/css/**',
                    '!public/js/**'
                ],
                tasks: [ 'copy:others', 'copy:common', 'index.html:dev' ]
            },
            // prod watchers
            css_prod: {
                files: [ 'public/css/*.+(scss|css)', '!public/css/style.css' ],
                tasks: [ 'sasslint', 'sass', 'concat:css', 'uncss', 'cssmin', 'replace:fix_css_sourcemap', 'clean:release' ]
            },
            js_prod: {
                files: [ 'public/js/**/*.js' ],
                tasks: [ 'jshint', 'concat:js', 'ngAnnotate:prod', 'uglify' ]
            },
            others_prod: {
                files: [
                    'public/**',
                    '!public/css/**',
                    '!public/js/**'
                ],
                tasks: [ 'copy:others', 'copy:common', 'index.html:prod' ]
            }
        },

        // Enable concurrent watchers
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            prod: {
                tasks: [ "watch:css_prod", "watch:js_prod", "watch:others_prod" ]
            },
            dev: {
                tasks: [ "watch:css_dev", "watch:js_dev", "watch:others_dev" ]
            }
        }
	});

    /**
     * Fills "link" and "style" tags into index.html with values from grunt-config.json
     */
	grunt.registerTask("index.html", "Loads stylesheets and scripts into 'index.html'", function (type) {
		var cheerio = require("cheerio"),
			index = grunt.file.read(gruntConfig["index.html"].src);

		var obj = gruntConfig["index.html"][type];
		var $ = cheerio.load(index, { decodeEntities: false }),
			$head = $('head'),
			$body = $('body'),
			prop;
		for (prop in obj.css) {
			if (obj.css.hasOwnProperty(prop)) {
				if (obj.css[prop].comment) {
					$head.append("\t<!-- " + obj.css[prop].comment + " -->\n");
				}
				$head.append('\t<link rel="stylesheet" href="' + obj.css[prop].value + '">\n');
			}
		}
		for (prop in obj.js) {
			if (obj.js.hasOwnProperty(prop)) {
				if (obj.js[prop].comment) {
					$body.append("\t<!-- " + obj.js[prop].comment + " -->\n");
				}
				$body.append('\t<script src="' + obj.js[prop].value + '"></script>\n');
			}
		}

		grunt.file.write(gruntConfig["index.html"].dest, $.html());
	});

    grunt.loadNpmTasks('grunt-sass-lint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask("dev", [
        "clean:build",
        "sass",
        "copy:dev",
        "copy:common",
        "index.html:dev",
        "clean:release",
        "concurrent:dev"
    ]);

    grunt.registerTask("prod", [
        // cleanup
        "clean:build",
        // copy static files to dist
        "copy:prod",
        "copy:common",
        // fix index.html
        "index.html:prod",
        // js processing
        "jshint",
        "concat:js",
        "ngAnnotate:prod",
        "uglify",
        // css processing
        "sasslint",
        "sass",
        "concat:css",
        "uncss",
        "cssmin",
        "replace:fix_css_sourcemap",
        // reduce image size
        "imagemin",
        // cleanup
        "clean:release",
        // run file watchers
        "concurrent:prod"
    ]);

	grunt.registerTask("default", [ 'watch' ]);
};
