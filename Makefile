PACKAGE=com.kt3k.app.whatsmyip
ACTIVITY=$(PACKAGE).BaseActivity

.PHONY: build build-all clean grunt compile-assets debug-install device-debug

device-debug: build-all debug-install device-launch-app device-logcat
	@echo

build-all: grunt compile-assets build
	@echo

build:
	gradle build

clean:
	gradle clean

grunt:
	grunt

compile-assets:
	cd bower_components/whatsmyip-core; bundle install; bundle exec middleman build

debug-install:
	adb install -r build/apk/whatsmyip-android-debug-unaligned.apk

device-launch-app:
	adb shell am start -n $(PACKAGE)/$(ACTIVITY)

device-logcat:
	adb logcat *:E
