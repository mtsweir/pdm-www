module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		postcss:{
			options: {
				processors: [
					require('autoprefixer')({grid: true, flexbox: true}),
				],
			},
			dist: {
				src: [
					'css/**/*.css',
					'!css/elementor/*.css', // Exclude Elementor from processing
				],
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			css: {
				files: ['scss/**/*.scss'],
				tasks: ['sass-task', 'postcss'],
			},
			js: {
				files: ['js/pushy.js'],
				tasks: ['js-task'],
			},
		},
		concat: {
				options: {
					stripBanners: false,
					separator: ';'
				},
				dist: {
					src: [
								'js/pushy.js'
								],
					dest: 'js/pushy.min.js',
				},
		},
		uglify: {
				build: {
					src: 'js/pushy.min.js',
					dest: 'js/pushy.min.js'
				}
		},
		sass: {															
			dist: {													
				options: {
					sourcemap: 'none',
					style: 'expanded' //output style: nested, compact, compressed, expanded
				},
				files: {
					// Elementor, demo usage only
					'css/elementor/hello.css': 'scss/elementor/hello.scss',
					'css/elementor/theme.css': 'scss/elementor/theme.scss',
					'css/elementor/frontend.css': 'scss/elementor/frontend.scss',
					// Core
					'css/base.css': 'scss/base.scss',
					'css/root.css': 'scss/root.scss',
					// Component
					'css/component/accordion.css': 'scss/component/accordion.scss',
					'css/component/breadcrumb.css': 'scss/component/breadcrumb.scss',
					'css/component/button.css': 'scss/component/button.scss',
					'css/component/card-link.css': 'scss/component/card-link.scss',
					'css/component/card-list.css': 'scss/component/card-list.scss',
					'css/component/components.css': 'scss/component/components.scss',
					'css/component/link-cta.css': 'scss/component/link-cta.scss',
					// Section
					'css/section/home-hero.css': 'scss/section/home-hero.scss',
					'css/section/hero-inverse.css': 'scss/section/hero-inverse.scss',
					'css/section/services.css': 'scss/section/services.scss',
					// Layout
					'css/layout/site-header.css': 'scss/layout/site-header.scss',
					'css/layout/form.css': 'scss/layout/form.scss',
					'css/layout/grid.css': 'scss/layout/grid.scss',
					// Utility
					'css/utility/layout.css': 'scss/utility/layout.scss',
					'css/utility/misc.css': 'scss/utility/misc.scss',
					'css/utility/text.css': 'scss/utility/text.scss',
					'css/utility/visually-hidden.css': 'scss/utility/visually-hidden.scss',
					'css/utility/width.css': 'scss/utility/width.scss',
					'css/utility/wysiwyg.css': 'scss/utility/wysiwyg.scss',
					// Vendor
					'css/vendor/pushy.css': 'scss/vendor/pushy.scss',
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'css/min/pdm-core.css': [
						'css/root.css',
						'css/base.css'
					],
					'css/min/pdm-site.css': [
						'css/component/*.css',
						'css/layout/*.css',
						'css/section/*.css',
						'css/utility/*.css',
						'css/vendor/*.css'
					]
				}
			}
		}
	});
	
	// Load grunt plugins
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('@lodder/grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Default task(s).
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('js-task', ['concat', 'uglify']);
	grunt.registerTask('sass-task', ['sass']);

	grunt.registerTask('build', [
		'concat',
		'uglify',
		'sass',
		'postcss',
		'cssmin'
	]);
};