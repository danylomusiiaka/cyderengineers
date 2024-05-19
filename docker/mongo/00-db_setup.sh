#!/usr/bin/env bash
echo 'Creating application user and db'
mongosh mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/${MONGO_INITDB_DATABASE} \
    --authenticationDatabase admin \
    --eval "db.createUser({user: '${MONGO_INITDB_ROOT_USERNAME}', pwd: '${MONGO_INITDB_ROOT_PASSWORD}', roles:[{role:'dbOwner', db: '${MONGO_INITDB_DATABASE}'}]});"
