# run file sync daemon
lsyncd -rsync /vagrant /home/vagrant/app

# run web server
cd /home/vagrant/app
npm start