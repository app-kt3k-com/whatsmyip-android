.PHONY: debug release clean compile-assets

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
	cd www-source; grunt
