<?php

namespace MoFlashCards\DeckBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DeckController extends Controller
{
    /**
     * Lists all available decks.
     *
     * @ApiDoc(
     *   section="Deck",
     *   statusCodes={
     *     200="On success"
     *   }
     * )
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
     * @ApiDoc(
     *   section="Deck",
     *   requirements={
     *     {
     *       "name"="slug",
     *       "dataType"="string",
     *       "description"="Deck identifier"
     *     }
     *   },
     *   statusCodes={
     *     200="On success",
     *     404="When no deck is found"
     *   }
     * )
     * 
     * @throws NotFoundHttpException When deck does not exist.
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