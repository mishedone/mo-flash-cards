<?php

namespace Tests\MoFlashCards\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MoFlashCards\DeckBundle\Document\Card;
use MoFlashCards\DeckBundle\Document\Deck;

class LoadDecks implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        // create pets deck
        $petsDeck = new Deck('Pets', 'pets');
        $petsDeck->addCard(new Card('kitty', 'kotence'));
        $petsDeck->addCard(new Card('doggy', 'kuchence'));

        // create cards deck
        $cardsDeck = new Deck('Cards', 'cards');
        
        // save decks
        $manager->persist($petsDeck);
        $manager->persist($cardsDeck);
        $manager->flush();
    }
}

