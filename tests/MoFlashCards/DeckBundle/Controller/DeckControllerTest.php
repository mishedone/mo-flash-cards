<?php

namespace Tests\MoFlashCards\DeckBundle\Controller;

use Tests\MoFlashCards\TestCase;

class DeckControllerTest extends TestCase
{
    public function testList()
    {
        $client = static::createClient();
        $url = $this->generateUrl($client, 'deck_list');
        $client->request('GET', $url);
        
        // check response
        $response = $client->getResponse();
        $json = json_decode($response->getContent(), true);
        $this->assertJsonResponse($response);
        
        // check first deck is there
        $this->assertEquals('Pets', $json[0]['name']);
        $this->assertEquals('pets', $json[0]['slug']);
        
        // check second deck is there
        $this->assertEquals('Cards', $json[1]['name']);
        $this->assertEquals('cards', $json[1]['slug']);
    }
    
    public function testGet()
    {
        $client = static::createClient();
        $url = $this->generateUrl($client, 'deck_get', ['slug' => 'pets']);
        $client->request('GET', $url);
        
        // check response
        $response = $client->getResponse();
        $json = json_decode($response->getContent(), true);
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
