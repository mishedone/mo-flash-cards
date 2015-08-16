<?php

namespace Mo\FlashCardsApiBundle\Controller;

use AppKernel;
use Symfony\Component\HttpFoundation\Response;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

/**
 * Actions serving different resources.
 */
class ResourceController
{
    /**
     * @var AppKernel
     */
    protected $kernel;

    /**
     * @return AppKernel
     */
    protected function getKernel()
    {
        return $this->kernel;
    }

    /**
     * @param AppKernel $kernel
     */
    public function __construct(AppKernel $kernel)
    {
        $this->kernel = $kernel;
    }

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
        $key = md5(mb_strtolower($text, 'UTF-8'));
        $cachePath = $this->getKernel()->getRootDir() . '/tts/' . $key . '.mp3';

        // try loading the audio from cache
        if (file_exists($cachePath)) {
            $audio = file_get_contents($cachePath);
        } else {
            $audio = file_get_contents('https://api.voicerss.org/?' . http_build_query(array(
                'key' => '36b73c895a48485faedd7f6f8de71eb0',
                'hl' => 'en-gb',
                'src' => $text,
                'c' => 'mp3',
                'f' => '48khz_16bit_stereo'
            )));
            file_put_contents($cachePath, $audio);
        }

        // build response
        $response = new Response();
        $response->setContent($audio);
        $response->headers->set('Content-Type', 'audio/mpeg');

        return $response;
    }
}
