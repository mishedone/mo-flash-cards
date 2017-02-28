<?php

namespace Tests\MoFlashCards\ResourceBundle\Controller;

use Tests\MoFlashCards\TestCase;

class TextToSpeechControllerTest extends TestCase
{
    public function testGetAudio()
    {
        $client = static::createClient();
        $url = $this->generateUrl($client, 'resource_text_to_speech_get_audio', ['text' => 'hello']);
        $client->request('GET', $url);
        
        // clean up the database
        $this->resetDatabase();

        // check response headers
        $response = $client->getResponse();
        $this->assertTrue($response->isSuccessful(), 'Response is successful.');
        $this->assertTrue($response->headers->contains('Content-Type', 'audio/mpeg'), 'Content is audio.');

        // check response mime type
        $fileInfo = finfo_open();
        $mimeType = finfo_buffer($fileInfo, $response->getContent(), FILEINFO_MIME_TYPE);
        finfo_close($fileInfo);
        $this->assertEquals('audio/mpeg', $mimeType, 'Mimetype is audio.');
    }
}
