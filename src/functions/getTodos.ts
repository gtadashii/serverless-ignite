export const handle = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Todos listed!"
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};