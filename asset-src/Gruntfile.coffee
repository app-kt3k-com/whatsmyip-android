# Gruntfile.coffee for assets of com.kt3k.app.whatsmyip

module.exports = (g) ->

  g.initConfig

    jekyll:
      abc:
        options:
          src: 'src'
          dest: 'dest'

    jshint:
      options:
        jshintrc: '.jshintrc'
      source: ['src/js/**/*.js']
      #test: ['test/**/*.js']

    jasmine:
      app:
        src: [
          'src/js/domain/iprecord.js'
          'src/js/domain/iprecordfactory.js'
        ]
        options:
          specs: 'test/*spec.js'
          vendor: ['bower_components/jquery/jquery.min.js']

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
        dest: 'dest/js/'

      css:
        expand: true
        flatten: true
        cwd: 'bower_components/'
        src: [
          'bootstrap.zip/css/bootstrap-responsive.min.css'
          'bootstrap.zip/css/bootstrap.min.css'
        ]
        dest: 'dest/css/'

      img:
        expand: true
        flatten: true
        cwd: 'bower_components/'
        src: [
          'bootstrap.zip/img/glyphicons-halflings.png'
          'bootstrap.zip/img/glyphicons-halflings-white.png'
        ]
        dest: 'dest/img/'

      assets:
        expand: true
        cwd: 'dest/'
        src: [
          './**'
        ]
        dest: '../src/main/assets/'

  g.loadNpmTasks 'grunt-jekyll'
  g.loadNpmTasks 'grunt-contrib-copy'
  g.loadNpmTasks 'grunt-contrib-jshint'
  g.loadNpmTasks 'grunt-contrib-jasmine'

  g.registerTask 'compile', ['jekyll', 'copy:js', 'copy:css', 'copy:img']
  g.registerTask 'test', ['jshint', 'jasmine']

  g.registerTask 'default', ['test']