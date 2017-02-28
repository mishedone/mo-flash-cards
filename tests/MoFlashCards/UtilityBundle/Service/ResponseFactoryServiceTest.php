<?php

namespace Tests\MoFlashCards\UtilityBundle\Service;

use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\HttpFoundation\Response;

class ResponseFactoryServiceTest extends KernelTestCase
{
    /**
     * @dataProvider createSerializedResponseProvider
     * @param array $groups
     */
    public function testCreateSerializedResponse(array $groups)
    {
        $data = [
            'name' => 'John',
            'power' => 'Doe'
        ];
        
        static::bootKernel();
        $service = static::$kernel->getContainer()->get('utility.response.factory');
        $response = $service->createSerializedResponse($data, $groups);
        
        $this->assertInstanceOf(Response::class, $response);
        $this->assertEquals('application/json', $response->headers->get('Content-Type'));
        $this->assertEquals('{"name":"John","power":"Doe"}', $response->getContent());
    }
    
    /**
     * @return array
     */
    public function createSerializedResponseProvider()
    {
        return [
            // check without any groups
            [[]],
            // check with groups
            [['chuck']]
        ];
    }
}