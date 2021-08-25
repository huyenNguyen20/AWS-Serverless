// Import all functions from post.js 
const lambda = require('../../../post'); 
// Import dynamodb from aws-sdk 
const dynamodb = require('aws-sdk/clients/dynamodb'); 
 
// This includes all tests for putItemHandler() 
describe('Test post.js', function () { 
    let putSpy; 
 
    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => { 
        // Mock dynamodb get and put methods 
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
        putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put'); 
    }); 
 
    // Clean up mocks 
    afterAll(() => { 
        putSpy.mockRestore(); 
    }); 
 
    // This test invokes putItemHandler() and compare the result  
    it('should add user to the table', async () => { 
        const returnedItem = {}; 
 
        // Return the specified value whenever the spied put function is called 
        putSpy.mockReturnValue({ 
            promise: () => Promise.resolve(returnedItem) 
        }); 
 
        const event = { 
            httpMethod: 'POST', 
            pathParameters:{
                userid: 'id1'
            },
            body: JSON.stringify({
                firstName: 'Huyen', 
                lastName: 'Nguyen', 
                email: 'abc@example.com' 
            })
        }; 
     
        // Invoke post function
        const result = await lambda.handler(event); 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify({
                message: "User created successfully"
            }) 
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
 