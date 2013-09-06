# Gruntfile.coffee for assets of com.kt3k.app.whatsmyip

module.exports = (g) ->

  g.initConfig

    jekyll:
      abc:
        options:
          src: './jekyll-src'
          dest: './jekyll-dest'

    jshint:
      options:
        jshintrc: '.jshintrc'
      source: ['jekyll-src/js/**/*.js']
      test: ['test/**/*.js']

    jasmine:
      app:
        src: ['jekyll-src/js/domain/iprecord.js']
        options:
          specs: 'test/*spec.js'

    copy:
      js:
        expand: true
        flatten: true
        cwd: 'bower_components/'
        src: [
          'jquery/jquery.min.js'
          'straw-android.js/src/straw-android.js'
          'straw-android-plugin.js/src/*'
          'bootstrap.zip/js/bootstrap.min.js'
        ]
        dest: 'jekyll-dest/js/'

      css:
        expand: true
        flatten: true
        cwd: 'bower_components/'
        src: [
          'bootstrap.zip/css/bootstrap-responsive.min.css'
          'bootstrap.zip/css/bootstrap.min.css'
        ]
        dest: 'jekyll-dest/css/'

      img:
        expand: true
        flatten: true
        cwd: 'bower_components/'
        src: [
          'bootstrap.zip/img/glyphicons-halflings.png'
          'bootstrap.zip/img/glyphicons-halflings-white.png'
        ]
        dest: 'jekyll-dest/img/'

      assets:
        expand: true
        cwd: 'jekyll-dest/'
        src: [
          './**'
        ]
        dest: '../assets/'

  g.loadNpmTasks 'grunt-jekyll'
  g.loadNpmTasks 'grunt-contrib-copy'
  g.loadNpmTasks 'grunt-contrib-jshint'
  g.loadNpmTasks 'grunt-contrib-jasmine'

  g.registerTask 'compile', ['jekyll', 'copy:js', 'copy:css', 'copy:img']
  g.registerTask 'test', ['jasmine:app']

  g.registerTask 'default', ['compile']
