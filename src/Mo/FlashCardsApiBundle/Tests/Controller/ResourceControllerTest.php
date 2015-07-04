<?php

namespace Mo\FlashCardsApiBundle\Tests\Controller;

use Mo\FlashCardsApiBundle\Tests\ApiTestCase;

class ResourceControllerTest extends ApiTestCase
{
    public function testTextToSpeech()
    {
        $client = static::createClient();
        $url = $this->generateUrl($client, 'mofc_api_get_tts', array('text' => 'hello'));
        $client->request('GET', $url);

        // check response headers
        $response = $client->getResponse();
        $this->assertTrue($response->isSuccessful(), 'Response is successful.');
        $this->assertTrue($response->headers->contains('Content-Type', 'audio/mpeg'), 'Content is audio.');

        // check response mimetype
        $finfo = finfo_open();
        $mimetype = finfo_buffer($finfo, $response->getContent(), FILEINFO_MIME_TYPE);
        finfo_close($finfo);
        $this->assertEquals('audio/mpeg', $mimetype, 'Mimetype is audio.');
    }
}
