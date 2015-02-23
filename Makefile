test:
	node start_test.js
publish:
	cd src
	meteor publish
.PHONY: test publish
