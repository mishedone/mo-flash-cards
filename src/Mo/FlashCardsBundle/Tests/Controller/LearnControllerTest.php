<?php

namespace Mo\FlashCardsBundle\Tests\Controller;

use Mo\FlashCardsBundle\Test\DocumentWebTestCase;

class LearnControllerTest extends DocumentWebTestCase
{
    public function testDecks()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/en/learn/decks');
        
        // check the deck link list
        $this->assertEquals(1, $crawler->filter('a[href="/en/learn/cards/animals"]:contains("Animals")')->count());
        $this->assertEquals(1, $crawler->filter('a[href="/en/learn/cards/cars"]:contains("Cars")')->count());
    } 
}
