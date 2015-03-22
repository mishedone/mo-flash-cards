<?php

namespace Mo\FlashCardsBundle\Test;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;

/**
 * DocumentTestCase ensures that our fixtures are loaded before each test.
 */
abstract class DocumentWebTestCase extends WebTestCase
{
    /**
     * User authentication credentials.
     */
    protected $user = array(
        'PHP_AUTH_USER' => 'kalitko',
        'PHP_AUTH_PW' => 'e_ovchar4e'
    );
    
    /**
     * Resets the state of the database.
     */
    protected static function resetDatabase()
    {
        static::bootKernel();
        
        $console = new Application(static::$kernel);
        $console->setAutoExit(false);
        $console->run(new ArrayInput(array(
            'command' => 'doctrine:mongodb:fixtures:load',
            '--env' => 'test',
            '--fixtures' => __DIR__ . '/../Tests/DataFixtures',
            '--quiet' => null
        )));
    }
}
