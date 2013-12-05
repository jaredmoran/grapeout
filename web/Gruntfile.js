/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        public_root: "",

        css_lib: "css",
        css_dist: "css/dist",

        js_lib: "js/lib",
        js_dist: "js/dist",

        sass_lib: "sass",

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                files: ['<%= js_lib %>/vendor/jquery.js',
                    '<%= js_lib %>/vendor/jquery.*.js',
                    '<%= js_lib %>/vendor/knockout.js',
                    '<%= js_lib %>/app.js'
                ],
                src: ['<%= concat.dist.files %>'],
                dest: '<%= js_dist %>/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '<%= js_dist %>/<%= pkg.name %>.js'
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: false,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    $: true,
                    jQuery: true,
                    console: true,
                }
            },
            lib_test: {
                src: ['<%= js_lib %>/app.js']
            }
        },

        watch: {
            scripts: {
                files: ['<%= concat.dist.files %>'],
                tasks: ['jshint', 'concat']
            },
            stylesheets: {
                files: ['<%= sass_lib %>/**/*.scss'],
                tasks: ['compass:development']
            }
        },

        compass: {
            // Shared options.
            options: {
                cssDir: "<%= css_lib %>",
                force: true,
                httpPath: "/",
                javascriptsDir: "<%= js_lib %>",
                noLineComments: true,
                relativeAssets: true,
                sassDir: "<%= sass_lib %>"
            },

            // Environment specific options.
            development: {
                options: {
                    environment: "development",
                    outputStyle: "expanded"
                }
            },

            production: {
                options: {
                    environment: "production",
                    outputStyle: "compressed"
                }
            }
        },


        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: '<%= js_dist %>',
                src: ['*.js'],
                dest: '<%= js_dist %>'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task.
    grunt.registerTask('default', ['jshint', 'concat', 'compass:development']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'compass:production']);
};