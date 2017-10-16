<?php

namespace Mo\FlashCardsBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Entry point for our flash cards application.
 */
class AppController extends Controller
{
    /**
     * @return Response
     */
    public function indexAction()
    {
        return $this->render('MoFlashCardsBundle::app.html.twig', array(
            'locales' => array('bg', 'en')
        ));
    }
}
