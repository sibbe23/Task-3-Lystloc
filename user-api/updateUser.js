const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);
  const { UserId, UserStatus, UserName } = requestBody;

  const params = {
    TableName: process.env.USER_TABLE,
    Key: {
      UserId: UserId,
      UserName: UserName
    },
    UpdateExpression: 'SET UserStatus = :status',
    ExpressionAttributeValues: {
      ':status': UserStatus
    },
    ReturnValues: 'ALL_NEW' // To return the updated attributes
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User updated successfully!', updatedAttributes: result.Attributes })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ err: `Could not complete request: ${err.message}` })
    };
  }
};
