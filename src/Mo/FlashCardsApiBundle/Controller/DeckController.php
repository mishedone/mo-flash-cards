<?php

namespace Mo\FlashCardsApiBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;

use Mo\FlashCardsApiBundle\Document\Deck;

/**
 * Provide REST for decks, cards and all subrelated stuff.
 */
class DeckController extends FOSRestController
{
    /**
     * Lists all available decks.
     *
     * @return array
     */
    public function getDecksAction()
    {
        return $this->get('doctrine_mongodb')
            ->getRepository('MoFlashCardsApiBundle:Deck')
            ->findAll();
    }
    
    /**
     * Loads a certain deck.
     *
     * @return Deck
     */
    public function getDeckAction($slug)
    {
        return $this->get('doctrine_mongodb')
            ->getRepository('MoFlashCardsApiBundle:Deck')
            ->findOneBySlug($slug);
    }
}