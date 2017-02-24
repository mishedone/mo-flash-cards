<?php

namespace MoFlashCards\DeckBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
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
     * @MongoDB\Field(type="string")
     */
    protected $name;
    
    /**
     * @MongoDB\Field(type="string")
     * @MongoDB\UniqueIndex
     */
    protected $slug;
    
    /** 
     * @MongoDB\EmbedMany(targetDocument="Card") 
     */
    protected $cards;
    
    /**
     * @param string $name
     * @param string $slug
     */
    public function __construct($name, $slug)
    {
        $this->name = $name;
        $this->slug = $slug;
        $this->cards = new ArrayCollection();
    }
    
    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
    
    /**
     * @return string
     */
    public function getSlug()
    {
        return $this->slug;
    }
    
    /**
     * @return ArrayCollection
     */
    public function getCards()
    {
        return $this->cards;
    }
    
    /**
     * @param Card $card
     */
    public function addCard(Card $card)
    {
        $this->cards[] = $card;
    }
}
