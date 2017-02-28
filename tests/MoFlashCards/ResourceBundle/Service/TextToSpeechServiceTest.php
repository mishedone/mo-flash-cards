<?php

namespace Tests\MoFlashCards\ResourceBundle\Service;

use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class TextToSpeechServiceTest extends KernelTestCase
{
    public function testGetAudio()
    {
        static::bootKernel();
        $service = static::$kernel->getContainer()->get('resource.text.to.speech');
        $audio = $service->get('hello')->getAudio();
        
        // check audio mime type
        $fileInfo = finfo_open();
        $mimeType = finfo_buffer($fileInfo, $audio, FILEINFO_MIME_TYPE);
        finfo_close($fileInfo);
        $this->assertEquals('audio/mpeg', $mimeType, 'Mimetype is audio.');
    }
}