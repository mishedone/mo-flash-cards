<?php

namespace Mo\FlashCardsApiBundle\Tests\Controller;

use Mo\FlashCardsApiBundle\Tests\ApiTestCase;

class DeckControllerTest extends ApiTestCase
{
    public function testGetDecks()
    {
        $client = static::createClient();
        $url = $this->generateUrl($client, 'mofc_api_get_decks');
        $client->request('GET', $url);
        $response = $client->getResponse();
        $json = json_decode($response->getContent(), true);
        
        // check response
        $this->assertJsonResponse($response);
        
        // check first deck is there
        $this->assertEquals('Cards', $json[0]['name']);
        $this->assertEquals('cards', $json[0]['slug']);
        
        // check second deck is there
        $this->assertEquals('Pets', $json[1]['name']);
        $this->assertEquals('pets', $json[1]['slug']);
    }
    
    public function testGetDeck()
    {
        $client = static::createClient();
        $url = $this->generateUrl($client, 'mofc_api_get_deck', array('slug' => 'pets'));
        $client->request('GET', $url);
        $response = $client->getResponse();
        $json = json_decode($response->getContent(), true);
        
        // check response
        $this->assertJsonResponse($response);
        
        // check result deck
        $this->assertEquals('Pets', $json['name']);
        $this->assertEquals('pets', $json['slug']);
        $this->assertEquals(2, count($json['cards']));
        $this->assertEquals('kitty', $json['cards'][0]['front']);
        $this->assertEquals('kotence', $json['cards'][0]['back']);
        $this->assertEquals('doggy', $json['cards'][1]['front']);
        $this->assertEquals('kuchence', $json['cards'][1]['back']);
    }
}
