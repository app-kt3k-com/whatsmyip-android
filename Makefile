PACKAGE=com.kt3k.app.whatsmyip
ACTIVITY=$(PACKAGE).BaseActivity

.PHONY: debug release clean grunt compile-assets debug-install device-debug

device-debug: grunt compile-assets debug debug-install device-launch-app device-logcat
	@echo

debug:
	gradle build

release:
	gradle build

clean:
	gradle clean

grunt:
	grunt

compile-assets:
	bundle install
	bundle exec middleman build

debug-install:
	adb install -r build/apk/whatsmyip-android-debug-unaligned.apk

device-launch-app:
	adb shell am start -n com.kt3k.app.whatsmyip/com.kt3k.app.whatsmyip.BaseActivity

device-logcat:
	adb logcat *:E
