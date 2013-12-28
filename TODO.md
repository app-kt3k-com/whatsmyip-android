TODO
----


- switch to heroku ip reflector
- show country icon on current ip page and history page

- review reminder
  - remind to review app after 4 times successful use of app
    - if user doesn't review, remind again after every 4 times successful use of app
    - if user reviewed, then stop reminding

- review reminder domain model
  - UserActivity model
    - number SuccessfulCount
    - boolean HasReviewed
  - UserActivityRepository
  - UserActivityFactory
- review reminder domain impl
- review reminder app impl

- toast sorry message every 7 seconds while ip address is not available
- and more moderate & reasonable retry policy and suspend policy for ip address retrieving
  - limit number of retry count (about 10?)
  - limit user waiting time (about 20 seconds?)


- release

- some usage analytics

- app description


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


DONE
----
- heroku ip address reflector - done
- add flag sprite - done
- don't record the same ip address consecutively in the same day - done
- don't auto-update if the latest record is too latest (probably 15 min?) - done
- paypal upgrade - pending
  - take certificate picture
  - get resident registry card
- straw debug plugin - pending
  - dump available plugins
  - show straw version etc
- backbutton plugin (or base function) - done
- straw-android switch to gradle - done
- records list impl - done
- record a record impl - done
- ipRepo testing - done
- link to history page - done
- reload button - done
- history page - done
  - records.html
- internationalization - done! yeah!
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
