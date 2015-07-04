<?php

namespace Mo\FlashCardsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Actions taking care of the learning aspects.
 */
class LearnController extends Controller
{
    /**
     * Define card directions.
     */
    const FRONT_TO_BACK = 'front-to-back';
    const BACK_TO_FRONT = 'back-to-front';
    
    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function decksAction()
    {
        $decks = $this->get('mofc.api.controller.deck')->getDecksAction();
        
        return $this->render('MoFlashCardsBundle:Learn:decks.html.twig', array('decks' => $decks));
    }
    
    /**
     * @param string $deckSlug
     * @param string $direction
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function cardsAction($deckSlug, $direction)
    {
        $deck = $this->get('mofc.api.controller.deck')->getDeckAction($deckSlug);
        
        // choose proper direction
        $forward = self::BACK_TO_FRONT == $direction ? false : true;
        
        return $this->render('MoFlashCardsBundle:Learn:cards.html.twig', array(
            'deck' => $deck,
            'forward' => $forward
        ));
    }
}
