#!/bin/bash

docker run --rm --name yoga -v `pwd`:/app -w /app -p 3001:3000 -d yoga
