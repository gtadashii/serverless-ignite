import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;

  const response = await document.query({
    TableName: "user_todo",
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": userid
    }
  }).promise();

  console.log(response.Items);

  const user_todos = response.Items;

  if (user_todos.length > 0) {
    return {
      statusCode: 200,
      body: JSON.stringify(user_todos),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No todo found for this user."
      }),
    };
  }

};