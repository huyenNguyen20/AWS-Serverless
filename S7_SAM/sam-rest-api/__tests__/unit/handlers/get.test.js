const lambda = require('../../../get'); 
// Import dynamodb from aws-sdk 
const dynamodb = require('aws-sdk/clients/dynamodb'); 
 
// This includes all tests for get() 
describe('Test get', () => { 
    let getSpy; 
 
    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => { 
        // Mock dynamodb get and put methods 
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
        getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get'); 
    }); 
 
    // Clean up mocks 
    afterAll(() => { 
        getSpy.mockRestore(); 
    }); 
 
    // This test invokes getByIdHandler() and compare the result  
    it('should get user by userid', async () => { 
        const item = {  
            userid: 'id1',
            timestamp: new Date().getTime(), 
            firstName: 'Huyen', 
            lastName: 'Nguyen', 
            email: 'abc@example.com'}; 
 
        // Return the specified value whenever the spied get function is called 
        getSpy.mockReturnValue({ 
            promise: () => Promise.resolve({ Item: item }) 
        }); 
        // 1.Invoke get() - return 200
        let event = { 
            httpMethod: 'GET', 
            pathParameters: { 
                id: 'id1' 
            } 
        }      
        let result = await lambda.handler(event); 
 
        let expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(item) 
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 

        // 2.Invoke get() - return 404
        event = { 
            httpMethod: 'GET', 
            pathParameters: { 
                id: 'id2' 
            } 
        }     
        result = await lambda.handler(event); 
 
        expectedResult = { 
            statusCode: 404, 
            body: JSON.stringify({
                message: 'User Not Found'
            }) 
        }; 
 
        // Compare the result with the expected result 
        expect(result).not.toEqual(expectedResult); 

    }); 
}); 
 