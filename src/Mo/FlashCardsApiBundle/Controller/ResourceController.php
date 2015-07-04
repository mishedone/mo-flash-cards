<?php

namespace Mo\FlashCardsApiBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

/**
 * Actions serving different resources.
 */
class ResourceController
{
    /**
     * Creates an audio/mpeg pronouncing the text parameter.
     *
     * @ApiDoc(
     *   statusCodes={
     *     200="On success"
     *   }
     * )
     *
     * @param string $text
     * @return Response
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
