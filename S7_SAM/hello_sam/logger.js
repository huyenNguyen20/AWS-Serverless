exports.handler = async (event) => {
    let eventJSON = JSON.stringify(event);
    console.log(eventJSON)
    return {
        status: 200,
        body: eventJSON
    }
}