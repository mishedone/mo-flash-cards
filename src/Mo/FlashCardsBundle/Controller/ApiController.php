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
     * @param string $deckSlug
     * @return \Symfony\Component\HttpFoundation\JsonResponse
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
        
        // TODO: consider doing in it in a better place
        // transform cards
        $result = array();
        foreach ($deck->getCards() as $card) {
            $result[] = array('question' => $card->getFront(), 'answer' => $card->getBack());
            $result[] = array('question' => $card->getBack(), 'answer' => $card->getFront());
        }

        // setup response
        $response = new JsonResponse();
        $response->setData($result);
        
        return $response;
    }
}
