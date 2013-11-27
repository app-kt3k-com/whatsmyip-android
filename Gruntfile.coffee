# Gruntfile.coffee for assets of com.kt3k.app.whatsmyip

module.exports = (g) ->

  g.initConfig

    jshint:
      options:
        jshintrc: '.jshintrc'
      source: 'src/main/js/**/*.js'
      test: 'src/test/js/**/*.js'

    jasmine:
      app:
        src: 'src/main/js/domain/*.js'
        options:
          specs: 'src/test/js/*spec.js'
          vendor: [
            'bower_components/jquery/jquery.min.js'
            'bower_components/straw-android.js/src/**/*.js'
            'bower_components/straw-android-plugin.js/src/**/*.js'
          ]
          keepRunner: true

  g.loadNpmTasks 'grunt-contrib-jshint'
  g.loadNpmTasks 'grunt-contrib-jasmine'

  g.registerTask 'test', ['jshint', 'jasmine']

  g.registerTask 'default', ['test']
