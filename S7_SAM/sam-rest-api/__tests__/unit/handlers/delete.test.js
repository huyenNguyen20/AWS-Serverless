// Import all functions from get-all-items.js 
const lambda = require('../../../delete'); 
// Import dynamodb from aws-sdk 
const dynamodb = require('aws-sdk/clients/dynamodb'); 
 
// This includes all tests for delete() 
describe('Test delete()', () => { 
    let deleteSpy; 
 
    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => { 
        // Mock dynamodb delete methods 
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
        deleteSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'delete'); 
    }); 
 
    // Clean up mocks 
    afterAll(() => { 
        deleteSpy.mockRestore(); 
    }); 
 
    it('should return 200', async () => { 
        const returnedResult = {}; 
 
        // Return the specified value whenever the spied scan function is called 
        deleteSpy.mockReturnValue({ 
            promise: () => Promise.resolve(returnedResult) 
        }); 
 
        const event = { 
            httpMethod: 'DELETE',
            pathParameters: 'id1'
        } 
 
        // Invoke helloFromLambdaHandler() 
        const result = await lambda.handler(event); 
 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify({
                message: 'User deleted successfully'
            }) 
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
