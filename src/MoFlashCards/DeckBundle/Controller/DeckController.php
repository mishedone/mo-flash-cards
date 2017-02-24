<?php

namespace MoFlashCards\DeckBundle\Controller;

use JMS\Serializer\SerializationContext;
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
        
        $context = SerializationContext::create()->setGroups(['list']);
        $json = $this->get('jms_serializer')->serialize($decks, 'json', $context);
        
        $response = new Response();
        $response->setContent($json);
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
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
        
        $context = SerializationContext::create()->setGroups(['details']);
        $json = $this->get('jms_serializer')->serialize($deck, 'json', $context);
        
        $response = new Response();
        $response->setContent($json);
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }
}