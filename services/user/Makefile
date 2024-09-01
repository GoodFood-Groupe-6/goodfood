install:
	npm install
buildarm:
	docker build --platform linux/arm64 -t gregcesimaalsi23/goodfood-user:arm64 .
buildamd:
	docker build --platform linux/amd64 -t gregcesimaalsi23/goodfood-user:amd64 .
pusharm:
	docker push gregcesimaalsi23/goodfood-user:arm64
pushamd:
	docker push gregcesimaalsi23/goodfood-user:amd64