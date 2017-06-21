MYSQL_USER=urlshortener
MYSQL_PASS=123qwe
MYSQL_DB=urlshortener

start-mysql:
	docker run -d --name="urlshortener-db" \
	-e MYSQL_ROOT_PASSWORD="123qwe" \
	-e MYSQL_DATABASE="$(MYSQL_DB)" \
	-e MYSQL_USER="$(MYSQL_USER)" \
	-e MYSQL_PASSWORD="$(MYSQL_PASS)" \
	--publish=3306:3306 \
	mariadb:latest

stop-mysql:
	docker stop urlshortener-db
