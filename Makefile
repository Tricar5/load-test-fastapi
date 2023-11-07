app_dir := $$(dirname $$PWD)

APP=app

.PHONY: run
run:
	uvicorn $(APP).__main__:app --port 8000 --host 0.0.0.0


.PHONY: test.load
test.load:
	@docker run --rm -it -v ${PWD}/tests:/tests \
  	artilleryio/artillery:latest \
  	run /tests/artillery/config.yaml \
  	--output /tests/test-run.json;

.PHONY: test.art
test.art:
	@artillery run ./tests/artillery/config.yaml --output ./tests/test-run.json

 .PHONY: test.k6
test.k6:
	@k6 run ./tests/k6/k6.js

.PHONY: test.wrk
test.wrk:
	@wrk -c200 -t1 -d3s http://localhost:8000/test -s ./tests/wrk/body_req.lua