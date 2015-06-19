<?php

namespace Mo\FlashCardsApiBundle\Tests\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Mo\FlashCardsApiBundle\Document\Deck;
use Mo\FlashCardsApiBundle\Document\Card;

class LoadDecks implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        // create pets deck
        $petsDeck = $this->createDeck('Pets', 'pets');
        $petsDeck->addCard($this->createCard('kitty', 'kotence'));
        $petsDeck->addCard($this->createCard('doggy', 'kuchence'));

        // create cards deck
        $cardsDeck = $this->createDeck('Cards', 'cards');
        
        // save decks
        $manager->persist($petsDeck);
        $manager->persist($cardsDeck);
        $manager->flush();
    }
    
    /**
     * @param string $name
     * @param string $slug
     * @return \Mo\FlashCardsApiBundle\Document\Deck
     */
    protected function createDeck($name, $slug)
    {
        $deck = new Deck();
        $deck->setName($name);
        $deck->setSlug($slug);
        
        return $deck;
    }
    
    /**
     * @param string $front
     * @param string $back
     * @return \Mo\FlashCardsApiBundle\Document\Card
     */
    protected function createCard($front, $back)
    {
        $card = new Card();
        $card->setFront($front);
        $card->setBack($back);
        
        return $card;
    }
}

