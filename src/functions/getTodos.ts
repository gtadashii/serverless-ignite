import { APIGatewayEvent } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handle = async (event: APIGatewayEvent) => {

  const { user_id } = event.pathParameters;

  const response = await document.query({
    TableName: "user_todo",
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": user_id
    }
  }).promise();

  const user_todos = response.Items;

  if (user_todos) {
    return {
      statusCode: 200,
      body: JSON.stringify(user_todos),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "No todo found for this user."
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

};