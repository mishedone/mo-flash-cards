#!/usr/bin/env bash

# add ppa repositories
apt-get install -y python-software-properties
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

apt-get update

# setup node js
apt-get install -y nodejs

# lsyncd - file change sync daemon
apt-get install -y lsyncd

# copy the project out of the mount to enable npm reloading
rsync -a /vagrant/ /home/vagrant/app/ --exclude=.vagrant

# insall dependencies
cd /home/vagrant/app
npm install