<?php

namespace Mo\FlashCardsBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\EmbeddedDocument
 */
class Card
{
    /**
     * @MongoDB\String
     */
    protected $front;
    
    /**
     * @MongoDB\String
     */
    protected $back;
    
    /**
     * @param string $front
     */
    public function setFront($front)
    {
        $this->front = $front;
    }
    
    /**
     * @param string $back
     */
    public function setBack($back)
    {
        $this->back = $back;
    }
}
