<?php

namespace Mo\FlashCardsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Actions taking care of the learning aspects.
 */
class LearnController extends Controller
{
    /**
     * @param string $group
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function cardsAction($group)
    {
        return $this->render('MoFlashCardsBundle:Learn:cards.html.twig');
    }
}