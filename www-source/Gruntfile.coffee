# Gruntfile.coffee for assets of com.kt3k.app.whatsmyip

module.exports = (g) ->

  g.initConfig

    jekyll:
      abc:
        options:
          src: './jekyll-src'
          dest: './jekyll-dest'

  g.loadNpmTasks 'grunt-jekyll'

  g.registerTask 'default', ['jekyll']
