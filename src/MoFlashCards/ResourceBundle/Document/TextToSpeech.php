<?php

namespace MoFlashCards\ResourceBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document(collection="resources.texttospeech")
 */
class TextToSpeech
{
    /**
     * @MongoDB\Id
     */
    protected $id;
    
    /**
     * @MongoDB\Field(type="string")
     * @MongoDB\UniqueIndex
     */
    protected $text;
    
    /**
     * @MongoDB\Field(type="bin")
     */
    protected $audio;
    
    /**
     * @param string $text
     * @param string $audio
     */
    public function __construct($text, $audio)
    {
        $this->text = mb_strtolower($text, 'UTF-8');
        $this->audio = $audio;
    }
    
    /**
     * @return string
     */
    public function getAudio()
    {
        return $this->audio;
    }
}