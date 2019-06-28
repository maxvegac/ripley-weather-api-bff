redis-up:
	docker run --rm --name weather-redis -d -p 6379:6379 redis

redis-down:
	docker rm -f weather-redis

dev:
	make redis-down
	make redis-up
	yarn dev-with-mocks
