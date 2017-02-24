<?php

namespace MoFlashCards\ResourceBundle\Service;

class TextToSpeechService
{
    /**
     * @param string $text
     * @return string
     */
    public function getAudio($text)
    {
        return file_get_contents('https://api.voicerss.org/?' . http_build_query([
            'key' => '36b73c895a48485faedd7f6f8de71eb0',
            'hl' => 'en-gb',
            'src' => $text,
            'c' => 'mp3',
            'f' => '48khz_16bit_stereo'
        ]));
    }
}
    