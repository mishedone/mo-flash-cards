<?php

namespace MoFlashCards\ResourceBundle\Service;

class TextToSpeechService
{
    /**
     * @var string Key used for voice rss service authentication.
     */
    protected $apiKey;
    
    /**
     * @param string $apiKey
     */
    public function __construct($apiKey)
    {
        $this->apiKey = $apiKey;
    }
    
    /**
     * @param string $text
     * @return string
     */
    public function getAudio($text)
    {
        return file_get_contents('https://api.voicerss.org/?' . http_build_query([
            'key' => $this->apiKey,
            'hl' => 'en-gb',
            'src' => $text,
            'c' => 'mp3',
            'f' => '48khz_16bit_stereo'
        ]));
    }
}
    