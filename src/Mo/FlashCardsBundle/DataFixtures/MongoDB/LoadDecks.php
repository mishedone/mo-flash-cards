<?php

namespace Acme\HelloBundle\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Mo\FlashCardsBundle\Document\Deck;
use Mo\FlashCardsBundle\Document\Card;

class LoadDecks implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        // create animals deck
        $animalsDeck = $this->createDeck('Animals', 'animals');
        $animalsDeck->addCard($this->createCard('cat', 'котка'));
        $animalsDeck->addCard($this->createCard('dog', 'куче'));

        // create cars deck
        $carsDeck = $this->createDeck('Cars', 'cars');
        
        // save decks
        $manager->persist($animalsDeck);
        $manager->persist($carsDeck);
        $manager->flush();
    }
    
    /**
     * @param string $name
     * @param string $slug
     * @return \Mo\FlashCardsBundle\Document\Deck
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
     * @return \Mo\FlashCardsBundle\Document\Card
     */
    protected function createCard($front, $back)
    {
        $card = new Card();
        $card->setFront($front);
        $card->setBack($back);
        
        return $card;
    }
}

