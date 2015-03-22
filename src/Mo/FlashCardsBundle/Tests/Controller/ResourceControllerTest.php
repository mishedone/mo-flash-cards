<?php

namespace Mo\FlashCardsBundle\Tests\Controller;

use Mo\FlashCardsBundle\Test\DocumentWebTestCase;

class ResourceControllerTest extends DocumentWebTestCase
{
    public function testTextToSpeech()
    {
        $client = static::createClient(array(), $this->user);
        $client->request('GET', '/resource/text-to-speech/hello');
        
        // check response headers
        $response = $client->getResponse();
        $this->assertTrue($response->isSuccessful(), 'Text to speech resource is available.');
        $this->assertTrue($response->headers->contains('Content-Type', 'audio/mpeg'), 'Correct headers are set.');
        
        // check response mimetype
        $finfo = finfo_open();
        $mimetype = finfo_buffer($finfo, $response->getContent(), FILEINFO_MIME_TYPE);
        finfo_close($finfo);
        $this->assertEquals('audio/mpeg', $mimetype, 'Returned resource is really audio');
    }
}