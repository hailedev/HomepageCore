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
	if [ -n "${val}" ]; then
		export "$var"="$val"
	fi
	unset "$fileVar"
}

file_env 'CONNECTIONSTRINGS__DEFAULTCONNECTION'
file_env 'CONNECTIONSTRINGS__IDSERVERDBCONNECTION'
file_env 'AUTHENTICATION__GOOGLE__CLIENTSECRET'
file_env 'AUTHENTICATION__GOOGLE__CLIENTID'
file_env 'AUTHENTICATION__FACEBOOK__CLIENTSECRET'
file_env 'AUTHENTICATION__FACEBOOK__CLIENTID'

dotnet $1