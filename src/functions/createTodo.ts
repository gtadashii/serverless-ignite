import { document } from "../utils/dynamodbClient";
import { v4 as uuidV4 } from "uuid";

interface ICreateTODO {
  user_id: string;
  title: string;
  deadline: Date;
}

export const handle = async (event) => {

  const { user_id, title, deadline } = JSON.parse(event.body) as ICreateTODO;

  await document.put({
    TableName: "user_todo",
    Item: {
      id: uuidV4(),
      user_id,
      title,
      done: false,
      deadline,
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created!"
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};