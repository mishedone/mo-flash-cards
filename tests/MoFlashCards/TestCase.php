<?php

namespace Tests\MoFlashCards;

use Symfony\Bundle\FrameworkBundle\Client;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\HttpFoundation\Response;

/**
 * Provides useful methods for our test suites.
 */
abstract class TestCase extends WebTestCase
{
    /**
     * Checks whether a response has correct status code and is
     * in the json format.
     *
     * @param Response $response
     * @param int      $statusCode Default: 200.
     */
    protected function assertJsonResponse(Response $response, $statusCode = 200)
    {
        $this->assertEquals($statusCode, $response->getStatusCode());
        $this->assertTrue($response->headers->contains('Content-Type', 'application/json'));
        
        // check if response content is a really really valid json
        $json = json_decode($response->getContent());
        $this->assertTrue($json != null && $json != false);
    }
    
    /**
     * Uses the router service to generate urls so tests
     * pass with whatever prefix they are setup.
     *
     * @param Client $client
     * @param string $name
     * @param array  $parameters Default: [].
     * @return string
     */
    protected function generateUrl(Client $client, $name, $parameters = [])
    {
        return $client->getContainer()->get('router')->generate($name, $parameters);
    }

    /**
     * Resets the state of the database.
     */
    protected function resetDatabase()
    {
        if (!static::$kernel) {
            static::bootKernel();
        }
        
        // drop the database and load fixtures
        $console = new Application(static::$kernel);
        $console->setAutoExit(false);
        $console->run(new ArrayInput([
            'command' => 'doctrine:mongodb:fixtures:load',
            '--env' => 'test',
            '--fixtures' => __DIR__ . '/DataFixtures',
            '--quiet' => null
        ]));
    }
}
