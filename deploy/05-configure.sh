#!/usr/bin/env bash

[ -z $APPLICATION_ENVIRONMENT ] && APPLICATION_ENVIRONMENT=INT
[ "$APPLICATION_ENVIRONMENT" = 'CI' ] && APPLICATION_ENVIRONMENT=INT

install -v -m0644 -D $APP_PATH/assets/data/appConfig-$(echo $APPLICATION_ENVIRONMENT|tr '[:upper:]' '[:lower:]').json $APP_PATH/assets/data/appConfig.json
