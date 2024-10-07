const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);
  const {userId, userStatus, userEmail, userName} = requestBody;

  const params = {
    TableName : process.env.USER_TABLE,
    Key :{
        UserId : userId,
        userName : userName,
        userEmail : userEmail,
    },
    UpdateExpression : 'SET userStatus = :status',
    ExpressionAttributeValues : {
        ':status' : userStatus
    }
  }

  try {
    await dynamoDb.update(params).promise();
    return{
        statusCode : 200,
        body : JSON.stringify({message: 'User updated successfully!'})

    }
  }
  catch(err)
  {
    return{
        statusCode : 500,
        body : JSON.stringify({err:`Could not complete request : ${err.message}`})
    }
  }
}