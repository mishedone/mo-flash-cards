<?php

namespace Mo\FlashCardsBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @MongoDB\Document(collection="decks")
 */
class Deck
{
    /**
     * @MongoDB\Id
     */
    protected $id;
    
    /**
     * @MongoDB\String
     */
    protected $name;
    
    /**
     * @MongoDB\String
     * @MongoDB\UniqueIndex
     */
    protected $slug;
    
    /** 
     * @MongoDB\EmbedMany(targetDocument="Card") 
     */
    protected $cards;
    
    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
    
    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }
    
    /**
     * @return string
     */
    public function getSlug()
    {
        return $this->slug;
    }
    
    /**
     * @param string $slug
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;
    }
    
    /**
     * @return array
     */
    public function getCards()
    {
        return $this->cards;
    }
    
    /**
     * @param Mo\FlashCardsBundle\Document\Card $card
     */
    public function addCard(Card $card)
    {
        $this->cards[] = $card;
    }
    
    /**
     * @param Mo\FlashCardsBundle\Document\Card $card
     */
    public function removeCard(Card $card)
    {
        $this->cards->removeElement($card);
    }
    
    /**
     * Initializes collections.
     */
    public function __construct()
    {
        $this->cards = new ArrayCollection();
    }
}
