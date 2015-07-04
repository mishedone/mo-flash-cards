<?php

namespace Mo\FlashCardsBundle\DataFixtures\MongoDB;

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
        $deck = $this->createDeck($deckData[0], $deckData[1]);
        while (false !== $cardData = fgetcsv($handle)) {
            $card = $this->createCard($cardData[0], $cardData[1]);
            $deck->addCard($card);
        }
        fclose($handle);

        return $deck;
    }

    /**
     * @param string $name
     * @param string $slug
     * @return Deck
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
     * @return Card
     */
    protected function createCard($front, $back)
    {
        $card = new Card();
        $card->setFront($front);
        $card->setBack($back);

        return $card;
    }

    /**
     * @return string
     */
    protected function getFilesDir()
    {
        return __DIR__ . '/../CSV';
    }
}

