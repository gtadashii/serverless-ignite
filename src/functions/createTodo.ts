import { document } from "../utils/dynamodbClient";
import { v4 as uuidV4 } from "uuid";
import { APIGatewayEvent } from "aws-lambda";

interface ICreateTODO {
  title: string;
  deadline: string;
}

export const handle = async (event: APIGatewayEvent) => {

  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTODO;

  const todo = {
    id: uuidV4(),
    user_id,
    title,
    done: false,
    deadline: new Date(deadline).toUTCString(),
  }

  await document.put({
    TableName: "user_todo",
    Item: todo,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created!",
      todo: todo,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};