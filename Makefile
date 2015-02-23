all: test publish
test:
	node start_test.js
publish:
	cd src && meteor publish
