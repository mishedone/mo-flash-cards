#!/usr/bin/env bash

# sync
rsync -a /vagrant/ /home/vagrant/app/ --exclude=.vagrant --exclude=node_modules