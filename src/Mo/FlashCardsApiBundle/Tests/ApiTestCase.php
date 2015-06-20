<?php

namespace Mo\FlashCardsApiBundle\Tests;

use Symfony\Bundle\FrameworkBundle\Client;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Bundle\FrameworkBundle\Console\Application;

use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Console\Input\ArrayInput;

/**
 * Provides useful common tasks for testing the api.
 */
abstract class ApiTestCase extends WebTestCase
{
    /**
     * Checks whether a certain response has correct status code and is
     * in the json format.
     *
     * @param Response $response
     * @param int      $statusCode Default: 200.
     */
    protected function assertJsonResponse($response, $statusCode = 200)
    {
        $this->assertEquals($statusCode, $response->getStatusCode());
        $this->assertTrue($response->headers->contains('Content-Type', 'application/json'));
        
        // check if response content is a really really valid json
        $json = json_decode($response->getContent());
        $this->assertTrue($json != null && $json != false);
    }
    
    /**
     * Resets the state of the database.
     */
    static protected function resetDatabase()
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
