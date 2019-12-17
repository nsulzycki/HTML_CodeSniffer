
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-string-replace');


    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        eslint: {
            target: ['Standards/**/*.js', 'Contrib/PhantomJS/*.js']
        },

        uglify: {
            debug: {
                options: {
                    compress: false,
                    mangle: false,
                    beautify: true,
                    preserveComments: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' + grunt.file.read('Contrib/Build/umd-header.js'),
                    footer: grunt.file.read('Contrib/Build/umd-footer.js')
                },
                files: {
                    'build/HTMLCS.js': ['Translations/*.js', 'Standards/**/*.js', 'HTMLCS.js', 'HTMLCS.Util.js', 'Contrib/PhantomJS/runner.js', 'Auditor/HTMLCSAuditor.js']
                }
            },
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' + grunt.file.read('Contrib/Build/umd-header.js'),
                    footer: grunt.file.read('Contrib/Build/umd-footer.js')
                },
                files: {
                    'build/HTMLCS.js': ['Translations/*.js', 'Standards/**/*.js', 'HTMLCS.js', 'HTMLCS.Util.js', 'Contrib/PhantomJS/runner.js', 'Auditor/HTMLCSAuditor.js']
                }
            },
            browser: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' + grunt.file.read('Contrib/BrowserExtension/js/umd-header.js'),
                    footer: grunt.file.read('Contrib/BrowserExtension/js/umd-footer.js')
                },
                files: {
                    'webExt/assets/js/HTMLCS.js': ['Translations/*.js', 'Standards/**/*.js', 'HTMLCS.js', 'HTMLCS.Util.js', 'Contrib/PhantomJS/runner.js', 'Auditor/HTMLCSAuditor.js']
                }
            },
            bookmarklet: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' + grunt.file.read('Contrib/Build/header-bookmarklet.js'),
                    footer: grunt.file.read('Contrib/Build/umd-footer.js')
                },
                files: {
                    'build/HTMLCS.js': ['Translations/*.js', 'Standards/**/*.js', 'HTMLCS.js', 'HTMLCS.Util.js', 'Contrib/PhantomJS/runner.js', 'Auditor/Auditor_with_beacon.js']
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: 'Auditor/HTMLCSAuditor.css',
                        rename: function (dest, src) {
                            return dest + '/HTMLCS.css';
                        },
                        dest: 'build',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'Auditor/Images/*',
                        dest: 'build/Images',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'licence.txt',
                        dest: 'build',
                        filter: 'isFile'
                    }
                ]
            },
            browser: {
                files: [
                    {
                        expand: true,
                        src: 'Contrib/BrowserExtension/web/popup.html',
                        dest: 'webExt',
                        filter: 'isFile',
                        rename: function (dest, src) {
                            return dest + '/popup.html';
                        },
                    },
                    {
                        expand: true,
                        src: 'Contrib/BrowserExtension/web/manifest.json',
                        dest: 'webExt',
                        filter: 'isFile',
                        rename: function (dest, src) {
                            return dest + '/manifest.json';
                        },
                    },
                    {
                        expand: true,
                        src: 'Contrib/BrowserExtension/web/assets/js/background.js',
                        dest: 'webExt',
                        filter: 'isFile',
                        rename: function (dest, src) {
                            return dest + '/assets/js/background.js';
                        },
                    },
                    {
                        expand: true,
                        src: 'Contrib/BrowserExtension/web/assets/js/index.js',
                        dest: 'webExt',
                        filter: 'isFile',
                        replacements: [{
                            // 2. Use grunt templates to reference the properties in package.json
                            pattern: '?',
                            replacement: '!',
                        }],
                        rename: function (dest, src) {
                            return dest + '/assets/js/index.js';
                        },
                    },
                    {
                        expand: true,
                        src: 'Contrib/BrowserExtension/web/assets/css/index.css',
                        dest: 'webExt',
                        filter: 'isFile',
                        rename: function (dest, src) {
                            console.log(src);
                            return dest + '/assets/css/index.css';
                        },
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: 'Contrib/BrowserExtension/web/assets/css/HTMLCSAuditor.css',
                        rename: function (dest, src) {
                            return dest + '/assets/css/HTMLCS.css';
                        },
                        dest: 'webExt',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'Auditor/Images/*',
                        dest: 'webExt/assets/css/Images',
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'licence.txt',
                        dest: 'webExt',
                        filter: 'isFile'
                    }
                ]
            }
        }
    });

    grunt.file.setBase('./');
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['eslint']);
    grunt.registerTask('build', ['uglify:dist', 'copy:dist']);

    grunt.registerTask('brows', ['uglify:browser', 'copy:browser']);


    grunt.registerTask('build-bookmarklet', ['uglify:bookmarklet', 'copy:dist']);

    return grunt.registerTask('build-debug', ['uglify:debug', 'copy:dist']);
};
