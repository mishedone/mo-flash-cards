<?php

namespace Mo\FlashCardsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

/**
 * Actions serving different resources.
 */
class ResourceController extends Controller
{
    /**
     * @param string $text
     */
    public function textToSpeechAction($text)
    {
        $audio = file_get_contents('http://translate.google.com/translate_tts?' . http_build_query(array(
            'tl' => 'en',
            'q' => $text
	    )));
        
        // build response
        $response = new Response();
        $response->setContent($audio);
        $response->headers->set('Content-Type', 'audio/mpeg');
        
        return $response;
    }
}