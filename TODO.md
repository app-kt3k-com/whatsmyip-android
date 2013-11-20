TODO
----


- ipRepo testing
- history page
- release


- straw-ios
  - study cocoapods
    - podfile, straw.podspec
  - fix class names
    - STStraw ?
- straw-ios-plugin
- straw-ios.js
- straw-ios-plugin.js




Financial
---------
- get new admob code for this app
- paypal upgrade
  - take certificate picture
  - get resident registry card


LOW PRI
-------
- straw debug plugin
  - dump available plugins
  - show straw version etc
- back button plugin
- app description

- straw-android switch to gradle


DONE
----
- ip get quality - done
  - http auto-retry feature - easily implemented in javascript
  - debug silent failure cases - the cause was the ridiculous behaviour of default proxy settings for UrlConnection, that was too slow and inaccurate.
- straw-android.js - done
  - fix handling of the message from native (remove the meaning less JSON.stringify)
- browser plugin - done
  - straw.browser.open(url) => browser opens with url
- local plugin - done
  - straw.local.getLanguage() => 'en', 'ja'
- i18n - done
  - functions
    - <t> tag
    - .t-attr class, .t-text class
  - i18n.json
- *middlemanize - done - it's good!
- http timeout feature implementation & test - done
- shared preference plugin (store last 300 ip records) - done
- bogus error on getName method checking - done
- fill some coverage missings - done
- test http plugin - done
- http plugin
- app name (My IP Address Finder(en), IPアドレス確認君(ja))
- fix application concept & design - done
- separate application code from index.html - done
- use static site generator and export to assets (do not modify directly on ./assets) - done - it's really good idea!
- test of Background and RunOnUiThread annotations - done
