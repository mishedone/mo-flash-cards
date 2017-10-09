#!/usr/bin/env bash

# add ppa repositories
apt-get install -y python-software-properties
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

apt-get update

# setup node js
apt-get install -y nodejs

# copy the project out of the mount to enable npm reloading
rsync -a /vagrant/ /home/vagrant/app/ --exclude=.vagrant --exclude=node_modules

# install dependencies
cd /home/vagrant/app
npm install