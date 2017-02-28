<?php

namespace MoFlashCards\ResourceBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class TextToSpeechController extends Controller
{
    /**
     * Creates an audio/mpeg pronouncing the text parameter.
     *
     * @ApiDoc(
     *   section="Resource",
     *   requirements={
     *     {
     *       "name"="text",
     *       "dataType"="string",
     *       "description"="The text to pronounce"
     *     }
     *   },
     *   statusCodes={
     *     200="On success"
     *   }
     * )
     *
     * @param string $text
     * @return Response
     */
    public function getAudioAction($text)
    {
        $audio = $this->get('resource.text.to.speech')->get($text)->getAudio();
        
        // save data changes
        $this->get('doctrine_mongodb')->getManager()->flush();

        // build response
        $response = new Response();
        $response->setContent($audio);
        $response->headers->set('Content-Type', 'audio/mpeg');

        return $response;
    }
}