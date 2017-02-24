<?php

namespace MoFlashCards\DeckBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\EmbeddedDocument
 */
class Card
{
    /**
     * @MongoDB\Field(type="string")
     */
    protected $front;
    
    /**
     * @MongoDB\Field(type="string")
     */
    protected $back;
    
    /**
     * @param string $front
     * @param string $back
     */
    public function __construct($front, $back)
    {
        $this->front = $front;
        $this->back = $back;
    }
    
    /**
     * @return string
     */
    public function getFront()
    {
        return $this->front;
    }
    
    /**
     * @return string
     */
    public function getBack()
    {
        return $this->back;
    }
}
