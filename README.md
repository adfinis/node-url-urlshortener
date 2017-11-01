# Adfinis URLShortener

Simple node app for an url shortener service

## Installation

```
# adduser urlshortener
# git clone git@github.com/adfinis-sygroup/node-url-urlshortener /var/www/urlshortener
# chown urlshortener:urlshortener /var/www/urlshortener/
# cd /var/www/urlshortener
# mysql urlshortener < db/create.sql
# vim db.js # <- adjust username and password
# su - urlshortener
$ cd /var/www/urlshortener
$ npm install
$ pm2 start --name=urlshortener npm -- start
```

## Usage

Pretty self-explaining, go to yoururl.tld/admin for creating an new URL.
