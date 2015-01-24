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
     * @return string
     */
    public function getFront()
    {
        return $this->front;
    }
    
    /**
     * @param string $front
     */
    public function setFront($front)
    {
        $this->front = $front;
    }
    
    /**
     * @return string
     */
    public function getBack()
    {
        return $this->back;
    }
    
    /**
     * @param string $back
     */
    public function setBack($back)
    {
        $this->back = $back;
    }
}
