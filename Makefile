.PHONY: debug release clean compile-assets debug-install device-test

debug:
	gradle build

release:
	gradle build

clean:
	gradle clean

compile-assets:
	bundle install
	bundle exec middleman build

debug-install:
	adb install -r build/apk/whatsmyip-android-debug-unaligned.apk

device-debug: compile-assets debug debug-install
	@echo
