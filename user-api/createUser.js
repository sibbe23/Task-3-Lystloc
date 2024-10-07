const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

module.exports.handler = async(event)=>{
    const reqBody = JSON.parse(event.body)
    const userName = reqBody.userName
    const userEmail = reqBody.userEmail
    const userId = uuidv4();

    const params = {
        TableName : process.env.USER_TABLE,
        Item:{
            UserId : userId,
            userName : userName,
            userEmail : userEmail,
            userStatus : 'Not yet Activated'
        }
    }

    try{
        await dynamoDb.put(params).promise();
        return {
            statusCode : 200,
            body: JSON.stringify({message:'User Created successfully!', UserId:userId})
        }
    }
    catch(err){
        return{
            statusCode:500,
            body: JSON.stringify({err:`Could not create user : ${err.message}`})
        }
    }
}