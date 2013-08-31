# Gruntfile.coffee for assets of com.kt3k.app.whatsmyip

module.exports = (g) ->

  g.initConfig

    jekyll:
      abc:
        options:
          src: './jekyll-src'
          dest: './jekyll-dest'

    copy:
      js:
        expand: true
        flatten: true
        src: [
          'bower_components/jquery/jquery.min.js'
          'bower_components/straw-android.js/src/straw-android.js'
          'bower_components/straw-android-plugin.js/src/*'
        ]
        dest: 'jekyll-dest/js/'

      assets:
        expand: true
        cwd: 'jekyll-dest/'
        src: [
          './**'
        ]
        dest: '../assets/'

  g.loadNpmTasks 'grunt-jekyll'
  g.loadNpmTasks 'grunt-contrib-copy'

  g.registerTask 'default', ['jekyll', 'copy:js']
