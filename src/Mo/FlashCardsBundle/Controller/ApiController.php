<?php

namespace Mo\FlashCardsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Actions handling the data flow.
 */
class ApiController extends Controller
{
    /**
     * @param string $group
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
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
