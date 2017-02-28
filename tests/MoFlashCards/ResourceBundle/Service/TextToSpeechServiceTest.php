<?php

namespace Tests\MoFlashCards\ResourceBundle\Service;

use Tests\MoFlashCards\TestCase;

class TextToSpeechServiceTest extends TestCase
{
    public function testGetAudio()
    {
        static::bootKernel();
        $service = static::$kernel->getContainer()->get('resource.text.to.speech');
        $audio = $service->get('hello')->getAudio();
        
        // clean up the database - text to speech caches things
        $this->resetDatabase();
        
        // check audio mime type
        $fileInfo = finfo_open();
        $mimeType = finfo_buffer($fileInfo, $audio, FILEINFO_MIME_TYPE);
        finfo_close($fileInfo);
        $this->assertEquals('audio/mpeg', $mimeType, 'Mimetype is audio.');
    }
}