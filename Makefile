
MYSQL_CONTAINER_NAME=syurlshortener-db
MYSQL_USER=urlshortener
MYSQL_PASS=123qwe
MYSQL_DB=urlshortener
MYSQL_ROOT_PASS=123qwe
MYSQL_LOCAL_DATADIR=docker-db-datadir

_PWD=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))


mysql-start:
	docker run -d --name="$(MYSQL_CONTAINER_NAME)" \
	--restart unless-stopped \
	-e MYSQL_ROOT_PASSWORD="$(MYSQL_ROOT_PASS)" \
	-e MYSQL_DATABASE="$(MYSQL_DB)" \
	-e MYSQL_USER="$(MYSQL_USER)" \
	-e MYSQL_PASSWORD="$(MYSQL_PASS)" \
	-v $(_PWD)$(MYSQL_LOCAL_DATADIR):/var/lib/mysql \
	--publish=3306:3306 \
	mariadb:latest

mysql-stop:
	docker stop $(MYSQL_CONTAINER_NAME)

mysql-shell:
	-docker exec -it $(MYSQL_CONTAINER_NAME) mysql -uroot -p$(MYSQL_ROOT_PASS)
