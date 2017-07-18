.PHONY: serve
serve:
	cd ui && ng serve --open

.PHONY: ui-deploy
ui-deploy: ui-build-prod
	ngh --dir ui/dist

.PHONY: ui-build-prod
ui-build-prod:
	cd ui && ng build --prod --base-href "https://tjkemper.github.io/franklin"

