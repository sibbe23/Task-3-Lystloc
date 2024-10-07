const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();



module.exports.handler = async () => {
  const params = {
    TableName : process.env.USER_TABLE
  }

  try{
    const result = await dynamoDb.scan(params).promise()
    return {
        statusCode : 200,
        body : JSON.stringify(result.Items)
    }
  }
  catch(err){
    return {
        statusCode:500,
        body: JSON.stringify({err:`Could not get user data : ${err.message}`})
    }
  }
}