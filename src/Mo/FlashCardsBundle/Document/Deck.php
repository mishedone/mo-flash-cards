<?php

namespace Mo\FlashCardsBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

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
    protected $cards = array();
    
    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
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
     * @param \Mo\FlashCardsBundle\Document\Card $card
     */
    public function addCard(Card $card)
    {
        $this->cards[] = $card;
    }
}
