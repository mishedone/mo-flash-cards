<?php

namespace Mo\FlashCardsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Actions taking care of the learning aspects.
 */
class LearnController extends Controller
{
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
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function cardsAction($deckSlug)
    {
        $deck = $this->get('doctrine_mongodb')
            ->getRepository('MoFlashCardsBundle:Deck')
            ->findOneBySlug($deckSlug);
        
        // 404 if there is no such deck
        if (!$deck) {
            throw $this->createNotFoundException();
        }
        
        return $this->render('MoFlashCardsBundle:Learn:cards.html.twig', array('deck' => $deck));
    }
}