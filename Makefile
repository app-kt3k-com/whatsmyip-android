PACKAGE=com.kt3k.app.whatsmyip
ACTIVITY=$(PACKAGE).BaseActivity

.PHONY: build build-all clean assets debug-install device-debug

device-debug: build-all debug-install device-launch-app device-logcat
	@echo

build-all: assets build
	@echo

build:
	./gradlew build

clean:
	./gradlew clean

assets: bower_components
	cd bower_components/whatsmyip-core; bundle install; bundle exec middleman build

debug-install:
	adb install -r build/outputs/apk/whatsmyip-android-debug-unaligned.apk

device-launch-app:
	adb shell am start -n $(PACKAGE)/$(ACTIVITY)

device-logcat:
	adb logcat *:E

bower_components:
	bower install
