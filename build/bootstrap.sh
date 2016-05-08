#!/usr/bin/env bash

# add repositories
add-apt-repository ppa:ondrej/php
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list

# refresh repositories
apt-get update

# setup apache
apt-get install -y apache2
if ! [ -L /var/www/html ]; then
    rm -rf /var/www/html
    ln -fs /vagrant /var/www/html
fi
sed -i "s|DocumentRoot /var/www/html|DocumentRoot /var/www/html/web\\
\\
        <Directory /var/www/html/web>\\
                Options -Indexes +FollowSymLinks\\
                AllowOverride All\\
        </Directory>|" /etc/apache2/sites-available/000-default.conf
a2enmod rewrite

# setup mongo
apt-get install -y mongodb-org

# setup php
apt-get install -y php5 php5-curl php5-cli php5-mongo
apt-get install -y libapache2-mod-php5
sed -i "s|display_errors = Off|display_errors = On|" /etc/php5/apache2/php.ini
sed -i "s|APACHE_RUN_USER=www-data|APACHE_RUN_USER=vagrant|" /etc/apache2/envvars
sed -i "s|APACHE_RUN_GROUP=www-data|APACHE_RUN_GROUP=vagrant|" /etc/apache2/envvars
service apache2 restart

# setup composer
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# clean up
apt-get --purge -y autoremove

# setup application
cd /vagrant
composer install
cp build/parameters.yml app/config/parameters.yml
php app/console doctrine:mongodb:fixtures:load
