<?php

namespace Mo\FlashCardsApiBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

use Mo\FlashCardsApiBundle\Document\Deck;

/**
 * Provide REST for decks, cards and all subrelated stuff.
 */
class DeckController extends FOSRestController
{
    /**
     * Lists all available decks.
     *
     * @ApiDoc()
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
     * Loads a certain deck by it's slug.
     *
     * @ApiDoc()
     *
     * @throws NotFoundHttpException When deck does not exist.
     *
     * @param string $slug
     * @return Deck
     */
    public function getDeckAction($slug)
    {
        $deck = $this->get('doctrine_mongodb')
            ->getRepository('MoFlashCardsApiBundle:Deck')
            ->findOneBySlug($slug);
        
        // 404 when no deck is found
        if (!$deck) {
            throw $this->createNotFoundException();
        }
        
        return $deck;
    }
}