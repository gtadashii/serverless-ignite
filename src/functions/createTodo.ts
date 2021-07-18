export const handle = async (event) => {
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