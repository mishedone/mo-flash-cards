#!/usr/bin/env bash

# add ppa repositories
apt-get install -y python-software-properties
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

apt-get update

# setup node js
apt-get install -y nodejs

# install dependencies
cd /vagrant
npm install

# install and configure supervisor
apt-get install -y supervisor
if ! [ -d /home/vagrant/logs ]; then
    mkdir /home/vagrant/logs
    touch /home/vagrant/logs/tmp
fi