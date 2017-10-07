#!/usr/bin/env bash

# add ppa repositories
apt-get install -y python-software-properties
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

apt-get update

# setup node js
apt-get install -y nodejs