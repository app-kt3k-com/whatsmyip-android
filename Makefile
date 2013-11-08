.PHONY: debug release clean compile-assets debug-install device-test

debug:
	gradle build

release:
	gradle build

clean:
	gradle clean

compile-assets:
	cd asset-src; bundle install; grunt compile; grunt copy:assets

debug-install:
	adb install -r build/apk/whatsmyip-debug-unaligned.apk

device-debug: compile-assets debug debug-install
	@echo
