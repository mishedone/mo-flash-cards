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
        $audio = file_get_contents('https://api.voicerss.org/?' . http_build_query(array(
            'key' => '36b73c895a48485faedd7f6f8de71eb0',
            'hl' => 'en-gb',
            'src' => $text,
            'c' => 'mp3',
            'f' => '48khz_16bit_stereo'
	    )));

        // build response
        $response = new Response();
        $response->setContent($audio);
        $response->headers->set('Content-Type', 'audio/mpeg');

        return $response;
    }
}
