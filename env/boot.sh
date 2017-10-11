#!/usr/bin/env bash

# remove supervisor logs from previous sessions
rm /home/vagrant/logs/*

# reload supervisor daemons
cp -a /vagrant/env/supervisor/. /etc/supervisor/conf.d/
service supervisor restart