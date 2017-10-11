#!/usr/bin/env bash

# add ppa repositories
apt-get install -y python-software-properties
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

apt-get update

# setup node js
apt-get install -y nodejs

# install dependencies (first locally and then copy them to the project)
mkdir /home/vagrant/temp
cp /vagrant/package.json /home/vagrant/temp/package.json
cd /home/vagrant/temp
npm install
rsync -a --no-owner --no-group --remove-source-files "/home/vagrant/temp/node_modules/" "/vagrant/node_modules/"
rm -r /home/vagrant/temp

# install and configure supervisor
apt-get install -y supervisor
if ! [ -d /home/vagrant/logs ]; then
    mkdir /home/vagrant/logs
    touch /home/vagrant/logs/tmp
fi