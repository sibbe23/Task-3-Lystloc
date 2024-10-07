const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);
  const {userId, userName,userEmail} = requestBody;

  const params ={
    TableName : process.env.USER_TABLE,
    Key :{
        UserId : userId,
        UserName:userName,
        userEmail: userEmail
    }
  }

  try{
    await dynamoDb.delete(params).promise();
    return {
        statusCode : 200,
        body : JSON.stringify({message: 'User data deleted successfully!'})
    }
  }
  catch(err)
  {
    return{
        statusCode: 500,
        body :JSON.stringify({err:`Could not delete user : ${err.message}`})
    }
  }

}