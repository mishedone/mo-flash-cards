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
        $this->assertEquals(1, $crawler->filter('a[href="/en/learn/cards/animals"]:contains("Animals")')->count(), 'First link is there.');
        $this->assertEquals(1, $crawler->filter('a[href="/en/learn/cards/cars"]:contains("Cars")')->count(), 'Second link is there.');
    }
    
    public function testCards()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/en/learn/cards/animals');
        
        // check if all elements are there
        $this->assertEquals(1, $crawler->filter('#card-player-question')->count(), 'Questions are shown.');
        $this->assertEquals(1, $crawler->filter('#card-player-answer')->count(), 'You can answer a question.');
        $this->assertEquals(1, $crawler->filter('#card-player-show-hint')->count(), 'You can ask for a hint.');
        $this->assertEquals(1, $crawler->filter('#card-player-hint')->count(), 'Hints are shown.');
        $this->assertEquals(1, $crawler->filter('a[href="/en/learn/decks"]')->count(), 'You can go back to the decks page.');
    }
}
