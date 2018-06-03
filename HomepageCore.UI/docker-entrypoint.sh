#!/bin/bash

# usage: file_env VAR [DEFAULT]
#    ie: file_env 'XYZ_DB_PASSWORD' 'example'
# (will allow for "$XYZ_DB_PASSWORD_FILE" to fill in the value of
#  "$XYZ_DB_PASSWORD" from a file, especially for Docker's secrets feature)
file_env() {
	local var="$1"
	local fileVar="${var}_FILE"
	local def="${2:-}"
	if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
		echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
		exit 1
	fi
	local val="$def"
	if [ "${!var:-}" ]; then
		val="${!var}"
	elif [ "${!fileVar:-}" ]; then
		val="$(< "${!fileVar}")"
	fi
	export "$var"="$val"
	unset "$fileVar"
}

file_env 'CONNECTIONSTRINGS__DEFAULTCONNECTION'
file_env 'OPENIDCONNECT__CLIENTID'
file_env 'OPENIDCONNECT__CLIENTSECRET'
file_env 'OPENIDCONNECT__AUTHORITY'
file_env 'OPENIDCONNECT__REDIRECTURI'
file_env 'EMAIL__SERVER'
file_env 'EMAIL__ACCOUNT'
file_env 'EMAIL__PASSWORD'
file_env 'EMAIL__ADMIN'
file_env 'EMAIL__RETURNADDRESS'

dotnet $1