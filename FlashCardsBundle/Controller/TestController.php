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
        // turn off profiler since it is not needed here
        if ($this->container->has('profiler')) {
            $this->container->get('profiler')->disable();
        }
        
        return $this->render('MoFlashCardsBundle:Test:jasmine.html.twig');
    }
}

