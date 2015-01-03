<?php

namespace Mo\FlashCardsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiController extends Controller
{
    public function cardsAction($group)
    {
        $cards = array(
            'dog' => 'doggy',
            'cat' => 'kitty'
        );
        
        // setup response
        $response = new JsonResponse();
        $response->setData($cards);
        
        return $response;
    }
}
