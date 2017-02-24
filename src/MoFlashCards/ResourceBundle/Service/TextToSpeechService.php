<?php

namespace MoFlashCards\ResourceBundle\Service;

use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use MoFlashCards\ResourceBundle\Document\TextToSpeech;

class TextToSpeechService
{
    /**
     * @var ManagerRegistry
     */
    protected $mongo;
    
    /**
     * @var string Key used for voice rss service authentication.
     */
    protected $apiKey;
    
    /**
     * @param ManagerRegistry $mongo
     * @param string          $apiKey
     */
    public function __construct(ManagerRegistry $mongo, $apiKey)
    {
        $this->mongo = $mongo;
        $this->apiKey = $apiKey;
    }
    
    /**
     * @param string $text
     * @return TextToSpeech
     */
    public function get($text)
    {
        $text = mb_strtolower($text, 'UTF-8');
        $textToSpeech = $this->mongo->getRepository('ResourceBundle:TextToSpeech')->findOneByText($text);
        
        // we do not have the audio cached so fetch it
        if (!$textToSpeech) {
            $audio = file_get_contents('https://api.voicerss.org/?' . http_build_query(array(
                'key' => $this->apiKey,
                'hl' => 'en-gb',
                'src' => $text,
                'c' => 'mp3',
                'f' => '48khz_16bit_stereo'
            )));
            
            // create new text to speech and cache it for next requests
            $textToSpeech = new TextToSpeech($text, $audio);
            $this->mongo->getManager()->persist($textToSpeech);
        }
        
        return $textToSpeech;
    }
}
    