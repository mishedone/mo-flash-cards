<?php

namespace MoFlashCards\DeckBundle\Controller;

use JMS\Serializer\SerializationContext;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

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
}