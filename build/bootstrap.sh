#!/usr/bin/env bash

# update repositories
add-apt-repository ppa:ondrej/php
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list
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

# setup php
apt-get install -y php7.0 php7.0-fpm php7.0-mbstring php7.0-zip php7.0-xml php7.0-intl php7.0-curl php7.0-mysql php7.0-mongo
apt-get install -y libapache2-mod-php7.0
sed -i "s|display_errors = Off|display_errors = On|" /etc/php7.0/apache2/php.ini
sed -i "s|APACHE_RUN_USER=www-data|APACHE_RUN_USER=vagrant|" /etc/apache2/envvars
sed -i "s|APACHE_RUN_GROUP=www-data|APACHE_RUN_GROUP=vagrant|" /etc/apache2/envvars
service apache2 restart

# setup composer
apt-get install -y git unzip
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# clean up
apt-get --purge -y autoremove

# setup swap before composer install
# https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04
if ! [ -f /swapfile ]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo "/swapfile   none    swap    sw    0   0" >> /etc/fstab
fi

# setup application
cd /vagrant
composer install --prefer-dist
php bin/console cache:clear --env=prod
php bin/console cache:clear --env=dev
php bin/console cache:clear --env=test
#cp build/parameters.yml app/config/parameters.yml
#php app/console doctrine:mongodb:fixtures:load

# setup mongo
apt-get install -y mongodb-org
