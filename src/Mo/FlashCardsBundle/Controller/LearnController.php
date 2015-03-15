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
        $decks = $this->get('doctrine_mongodb')
            ->getRepository('MoFlashCardsBundle:Deck')
            ->findAll();
        
        return $this->render('MoFlashCardsBundle:Learn:decks.html.twig', array('decks' => $decks));
    }
    
    /**
     * @param string $deckSlug
     * @param string $direction
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function cardsAction($deckSlug, $direction)
    {
        $deck = $this->get('doctrine_mongodb')
            ->getRepository('MoFlashCardsBundle:Deck')
            ->findOneBySlug($deckSlug);
        
        // 404 if there is no such deck
        if (!$deck) {
            throw $this->createNotFoundException();
        }
        
        // choose proper direction
        $forward = self::BACK_TO_FRONT == $direction ? false : true;
        
        return $this->render('MoFlashCardsBundle:Learn:cards.html.twig', array(
            'deck' => $deck,
            'forward' => $forward
        ));
    }
}