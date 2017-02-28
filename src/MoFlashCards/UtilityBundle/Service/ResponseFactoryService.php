<?php

namespace MoFlashCards\UtilityBundle\Service;

use JMS\Serializer\SerializationContext;
use JMS\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;

/**
 * Responsible for creating different custom response instances that depend
 * on other services.
 */
class ResponseFactoryService
{
    /**
     * @var Serializer
     */
    protected $serializer;
    
    /**
     * @param Serializer $serializer
     */
    public function __construct(Serializer $serializer)
    {
        $this->serializer = $serializer;
    }
    
    /**
     * Creates JSON response by serializing the passed in data via JMS
     * serializer.
     *
     * @param mixed $data
     * @param array $groups Default: [].
     * @return Response
     */
    public function createSerializedResponse($data, array $groups = [])
    {
        $context = (empty($groups)) ? null : SerializationContext::create()->setGroups($groups);
        $json = $this->serializer->serialize($data, 'json', $context);
        
        $response = new Response();
        $response->setContent($json);
        $response->headers->set('Content-Type', 'application/json');
        
        return $response;
    }
}