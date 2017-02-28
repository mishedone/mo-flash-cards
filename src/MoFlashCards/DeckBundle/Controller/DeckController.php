<?php

namespace MoFlashCards\DeckBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeckController extends Controller
{
    /**
     * Lists all available decks.
     *
     * @return Response
     */
    public function listAction()
    {
        $decks = $this->get('doctrine_mongodb')
            ->getRepository('DeckBundle:Deck')
            ->findAll();
            
        return $this->get('utility.response.factory')
            ->createSerializedResponse($decks, ['list']);
    }
    
    /**
     * Loads a certain deck by it's slug.
     *
     * @param string $slug
     * @return Response
     */
    public function getAction($slug)
    {
        $deck = $this->get('doctrine_mongodb')
            ->getRepository('DeckBundle:Deck')
            ->findOneBySlug($slug);
            
        if (!$deck) {
            throw new NotFoundHttpException();
        }
        
        return $this->get('utility.response.factory')
            ->createSerializedResponse($deck, ['details']);
    }
}