<?php

namespace Mo\FlashCardsApiBundle\Tests\Controller;

use Mo\FlashCardsApiBundle\Tests\ApiTestCase;

class DeckControllerTest extends ApiTestCase
{
    public function testGetDecks()
    {
        $client = static::createClient();
        $client->request('GET', '/api/decks');
        $response = $client->getResponse();
        $json = json_decode($response->getContent(), true);
        
        // check response
        $this->assertJsonResponse($response);
        
        // check first deck is there
        $this->assertEquals('Cards', $json[0]['name']);
        $this->assertEquals('cards', $json[0]['slug']);
        $this->assertEquals(0, count($json[0]['cards']));
        
        // check second deck is there
        $this->assertEquals('Pets', $json[1]['name']);
        $this->assertEquals('pets', $json[1]['slug']);
        $this->assertEquals(2, count($json[1]['cards']));
        $this->assertEquals('kitty', $json[1]['cards'][0]['front']);
        $this->assertEquals('kotence', $json[1]['cards'][0]['back']);
        $this->assertEquals('doggy', $json[1]['cards'][1]['front']);
        $this->assertEquals('kuchence', $json[1]['cards'][1]['back']);
    }
    
    public function testGetDeck()
    {
        $client = static::createClient();
        $client->request('GET', '/api/decks/cards');
        $response = $client->getResponse();
        $json = json_decode($response->getContent(), true);
        
        // check response
        $this->assertJsonResponse($response);
        
        // check result deck
        $this->assertEquals('Cards', $json['name']);
        $this->assertEquals('cards', $json['slug']);
        $this->assertEquals(0, count($json['cards']));
    }
}