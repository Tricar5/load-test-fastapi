json_body = io.open("./tests/body.json", "rb")

wrk.method = "POST"
wrk.body = json_body:read("*a")
wrk.headers["Content-Type"] = "application/json"