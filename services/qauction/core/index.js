module.exports.response = {
  OK: (data) => {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(data)
    }
  },
  BAD: (err) => {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(new Error(err))
    }
  }
};
