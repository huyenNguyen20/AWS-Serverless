const AWS = require("aws-sdk");
AWS.config.update({region: 'ap-southeast-1'});
const https = require("https");

/**
 * Get stack name from environment variable AWS_SAM_STACK_NAME and make an API call to verify the stack exists.
 * throw exception if AWS_SAM_STACK_NAME is not set.
 */
const getAndVerifyStackName = async () => {
  const stackName = "sam-rest-api-stack";
  if (!stackName) {
    throw new Error(
      `Cannot find env var ${stackName}.\n` +
        "Please setup this environment variable with the stack name where we are running integration tests."
    );
  }

  const client = new AWS.CloudFormation();
  try {
    await client
      .describeStacks({
        StackName: stackName,
      })
      .promise();
  } catch (e) {
    throw new Error(
      `Cannot find stack ${stackName}: ${e.message}\n` +
        `Please make sure stack with the name "${stackName}" exists.`
    );
  }

  return stackName;
};

/**
 * This integration will make request to the API Gateway to verify the responses.
 * Make sure env variable AWS_SAM_STACK_NAME exists with the name of the stack we are going to test.
 */
describe("Test Web Endpoint", function () {
  let apiEndpoint;

  /**
   * Based on the provided stack name,
   * here we use cloudformation API to find out what the WebEndpoint URL is
   */
  beforeAll(async () => {
    const stackName = await getAndVerifyStackName();

    const client = new AWS.CloudFormation();
    const response = await client
      .describeStacks({
        StackName: stackName,
      })
      .promise();

    const stacks = response.Stacks;
    console.log(stacks)
    expect(stacks).not.toBe(undefined);
    expect(stacks).not.toBe([]);

    const stackOutputs = stacks[0].Outputs;
    const apiOutput = stackOutputs.find(
      (output) => output.OutputKey === "WebEndpoint"
    );

    expect(apiOutput).not.toBe(undefined);

    apiEndpoint = apiOutput.OutputValue;
  });

  /**
   * Call the API Gateway endpoint GET /, the response should be an array
   */
  it("GET /user/1 should respond with an item", (done) => {
    console.info("api endpoint:", apiEndpoint);
    https
      .get(apiEndpoint, (res) => {
        expect(res.statusCode).toBe(200);

        res.on("data", (data) => {
          const response = JSON.parse(data);
          expect(response).toBeInstanceOf(Object);
          done();
        });
      })
      .on("error", (e) => {
        throw e;
      });
  });
});
