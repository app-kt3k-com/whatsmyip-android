.PHONY: debug release clean compile-assets debug-install device-test

debug:
	cd android; gradle build

release:
	cd android; gradle build

clean:
	cd android; gradle clean

compile-assets:
	cd middleman; bundle install; bundle exec middleman build
	rm -rf android/src/main/assets
	cp -r middleman/build android/src/main/assets

debug-install:
	adb install -r build/apk/whatsmyip-debug-unaligned.apk

device-debug: compile-assets debug debug-install
	@echo
