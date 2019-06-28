#!/bin/sh

/usr/bin/redis-server --daemonize yes

node /home/src/index.js
