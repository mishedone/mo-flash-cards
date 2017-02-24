<?php

namespace Tests\MoFlashCards\ResourceBundle\Service;

use MoFlashCards\ResourceBundle\Service\TextToSpeechService;

class TextToSpeechServiceTest extends \PHPUnit_Framework_TestCase
{
    public function testGetAudio()
    {
        $service = new TextToSpeechService();
        $audio = $service->getAudio('hello');
        
        // check audio mime type
        $fileInfo = finfo_open();
        $mimeType = finfo_buffer($fileInfo, $audio, FILEINFO_MIME_TYPE);
        finfo_close($fileInfo);
        $this->assertEquals('audio/mpeg', $mimeType, 'Mimetype is audio.');
    }
}