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
					'!css/elementor/*.css', // Exclude Elementor css from processing
				],
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			css: {
				files: ['src/scss/**/*.scss'],
				tasks: ['sass-task', 'postcss'],
			},
			js: {
				files: ['src/scripts/lib/pushy.js'],
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
								'src/scripts/lib/pushy.js'
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
					'css/elementor/hello.css': 'src/scss/elementor/hello.scss',
					'css/elementor/theme.css': 'src/scss/elementor/theme.scss',
					'css/elementor/frontend.css': 'src/scss/elementor/frontend.scss',
					// Core
					'css/base.css': 'src/scss/base.scss',
					'css/root.css': 'src/scss/root.scss',
					// Component
					'css/component/accordion.css': 'src/scss/component/accordion.scss',
					'css/component/breadcrumb.css': 'src/scss/component/breadcrumb.scss',
					'css/component/button.css': 'src/scss/component/button.scss',
					'css/component/card-link.css': 'src/scss/component/card-link.scss',
					'css/component/card-list.css': 'src/scss/component/card-list.scss',
					'css/component/components.css': 'src/scss/component/components.scss',
					'css/component/link-cta.css': 'src/scss/component/link-cta.scss',
					// Section
					'css/section/home-hero.css': 'src/scss/section/home-hero.scss',
					'css/section/hero-inverse.css': 'src/scss/section/hero-inverse.scss',
					'css/section/services.css': 'src/scss/section/services.scss',
					// Layout
					'css/layout/site-header.css': 'src/scss/layout/site-header.scss',
					'css/layout/form.css': 'src/scss/layout/form.scss',
					'css/layout/grid.css': 'src/scss/layout/grid.scss',
					// Utility
					'css/utility/layout.css': 'src/scss/utility/layout.scss',
					'css/utility/misc.css': 'src/scss/utility/misc.scss',
					'css/utility/text.css': 'src/scss/utility/text.scss',
					'css/utility/visually-hidden.css': 'src/scss/utility/visually-hidden.scss',
					'css/utility/width.css': 'src/scss/utility/width.scss',
					'css/utility/wysiwyg.css': 'src/scss/utility/wysiwyg.scss',
					// Vendor
					'css/vendor/pushy.css': 'src/scss/vendor/pushy.scss',
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
		},
		svgstore: {
			options: {
				// clean up all inline style attributes
				cleanup : true,
				// remove the <title> element
				includeTitleElement : false,
				// format the generated HTML
				formatting : {
					indent_size : 2
				}
			},
				default: {
					files: {
					'defs.svg': ['src/svg/*.svg'],
				},
			},
		}
	});
	
	// Load grunt plugins
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('@lodder/grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-svgstore');

	// Default task(s).
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('js-task', ['concat', 'uglify']);
	grunt.registerTask('sass-task', ['sass']);

	// SVG defs build
	grunt.registerTask('svg', ['svgstore']);

	// Production task
	grunt.registerTask('build', [
		'concat',
		'uglify',
		'sass',
		'postcss',
		'cssmin'
	]);
};