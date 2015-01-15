<?php

namespace Mo\FlashCardsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Actions for running test suites.
 */
class TestController extends Controller
{
    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function jasmineAction()
    {
        return $this->render('MoFlashCardsBundle:Test:jasmine.html.twig');
    }
}

