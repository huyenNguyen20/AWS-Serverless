exports.handler = async (event) => {
    let {num1, num2} = JSON.parse(event.body);
    return {
        status: 200,
        body: JSON.stringify({
            num1,
            num2,
            result: num1 + num2
        })
    }
}