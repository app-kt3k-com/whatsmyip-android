.PHONY: debug release clean compile-assets debug-install device-test

debug: build.xml
	ant debug

release: build.xml
	ant release

build.xml:
	android update project -p ./ --name 'whatsmyip'

clean: build.xml
	ant clean
	touch build.xml local.properties proguard-project.txt ant.properties .password
	rm build.xml local.properties proguard-project.txt ant.properties .password

compile-assets:
	cd www-source; bundle install; grunt compile; grunt copy:assets

debug-install:
	adb install -r bin/whatsmyip-debug.apk

device-test: compile-assets debug debug-install
	echo
