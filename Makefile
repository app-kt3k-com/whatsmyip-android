.PHONY: debug release clean compile-assets debug-install device-test

debug:
	ant debug

release:
	ant release

clean:
	ant clean

compile-assets:
	cd www-source; bundle install; grunt compile; grunt copy:assets

debug-install:
	adb install -r bin/whatsmyip-debug.apk

device-debug: compile-assets debug debug-install
	echo
