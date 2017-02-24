<?php

namespace MoFlashCards\DeckBundle\DataFixtures\MongoDB;

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
        $fixtureFiles = scandir($this->getFilesDir());
        foreach ($fixtureFiles as $filename) {
            if (preg_match('/.csv$/', $filename)) {
                $deck = $this->createDeckFromFile($filename);
                $manager->persist($deck);
            }
        }

        // save generated decks
        $manager->flush();
    }

    /**
     * @param string $filename
     * @return Deck
     */
    protected function createDeckFromFile($filename)
    {
        $handle = fopen($this->getFilesDir() . '/' . $filename, 'r');
        $deckData = fgetcsv($handle);
        $deck = new Deck($deckData[0], $deckData[1]);
        while (false !== $cardData = fgetcsv($handle)) {
            $card = new Card($cardData[0], $cardData[1]);
            $deck->addCard($card);
        }
        fclose($handle);

        return $deck;
    }

    /**
     * @return string
     */
    protected function getFilesDir()
    {
        return __DIR__ . '/../CSV';
    }
}

