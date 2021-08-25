'use strict';

module.exports.add = async (event) => {
  let {num1, num2} = JSON.parse(event.body);
  const output = {
      num1,
      num2,
      result: num1 + num2
  }
  return {
    statusCode: 200,
    body: JSON.stringify(output)
  }
};