#!/bin/bash

# default mongodb daemon stop.
systemctl stop mongod

# stop shard process
./stop_shard.sh 
export IP_TEMP=$(ip addr | grep enp0s3 | grep inet | cut -d " " -f6 | cut -d "/" -f1)
echo $IP_TEMP

# remove data directory
if [ -d /shard/data ]; then
    rm -rf /shard/data
fi

# Config Server
mkdir -pv /shard/data/configdb
mkdir -pv /shard/data/logs
touch /shard/data/logs/configsvr.log

mongod --config /work/neo/mongodb/shard/mongoConfig.conf &
sleep 3s

mongo $IP_TEMP:27019 < rs.init

# Router Server
touch /shard/data/logs/mongorouter.log

mongos --config /work/neo/mongodb/shard/mongoRouter.conf &
sleep 3s

# Shard1 Server
mkdir -pv /shard/data/shard1db
touch /shard/data/logs/shard1.log

mongod --config /work/neo/mongodb/shard/mongoShard1.conf &
sleep 2s

mongo $IP_TEMP:27021 < rs.init

# Shard2 Server
mkdir -pv /shard/data/shard2db
touch /shard/data/logs/shard2.log

mongod --config /work/neo/mongodb/shard/mongoShard2.conf &
sleep 2s

mongo $IP_TEMP:27022 < rs.init

# process status
sleep 2s

mongo $IP_TEMP:27017 < rs.addShard

# netstatus
netstat -ntlp | grep mongo
