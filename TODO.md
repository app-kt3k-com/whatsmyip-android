# TODO

- implement bootstrap modal instead of window.confirm function
  - window.confirm is unusable

- retry policy and give-up policy for ip address retrieving
  - limit number of retry count (about 10?)
  - limit user waiting time (about 20 seconds?)

- internationalize loading indicator
- don't show loading indicator if page transition is fast

- app description
  - take screenshots
    - current ip address
    - history page
    - other materials

- build signed apk

- get new admob code for this app
- implement new admob code

- release!

- whois tooltip on history page


- some usage analytics

- straw-ios
  - study cocoapods
    - podfile, straw.podspec
  - fix class names
    - STStraw ?
- straw-ios-plugin
- straw-ios.js
- straw-ios-plugin.js




DONE
----
- implement open market function - done
- Uri plugin (to open market:// uri directly) - done
- review reminding specification - done
  - static boolean shouldRemindReview(UserActivity)
- review reminder - done
  - remind to review app after 4 times successful use (ip address successfully fetched action) of app
    - if user doesn't review, remind again after every 4 times successful use of app
    - if user reviewed, then stop reminding
- review reminder domain model - done
  - UserActivity model - done
    - number gotIpCount
    - boolean HasReviewed
  - UserActivityRepository - done
- review reminder domain impl - done
- switch to heroku ip reflector - done
- show country icon on current ip page and history page - done
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
