<?php

namespace Mo\FlashCardsApiBundle\Controller;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use FOS\RestBundle\Controller\Annotations\View;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use Mo\FlashCardsApiBundle\Document\Deck;

/**
 * Provide REST for decks, cards and all subrelated stuff.
 */
class DeckController
{
    /**
     * @var ManagerRegistry
     */
    protected $mongo;
    
    /**
     * @return ManagerRegistry
     */
    protected function getMongo()
    {
        return $this->mongo;
    }
    
    /**
     * @param ManagerRegistry $mongo
     */
    public function __construct(ManagerRegistry $mongo)
    {
        $this->mongo = $mongo;
    }
    
    /**
     * Lists all available decks.
     *
     * @ApiDoc(
     *   statusCodes={
     *     200="On success"
     *   }
     * )
     *
     * @View(serializerGroups={"list"})
     *
     * @return array
     */
    public function getDecksAction()
    {
        return $this->getMongo()
            ->getRepository('MoFlashCardsApiBundle:Deck')
            ->findAll();
    }
    
    /**
     * Loads a certain deck by it's slug.
     *
     * @ApiDoc(
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
     * @View(serializerGroups={"details"})
     *
     * @throws NotFoundHttpException When deck does not exist.
     *
     * @param string $slug
     * @return Deck
     */
    public function getDeckAction($slug)
    {
        $deck = $this->getMongo()
            ->getRepository('MoFlashCardsApiBundle:Deck')
            ->findOneBySlug($slug);
        
        // 404 when no deck is found
        if (!$deck) {
            throw new NotFoundHttpException('Not found');
        }
        
        return $deck;
    }
}