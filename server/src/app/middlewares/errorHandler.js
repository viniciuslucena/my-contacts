// eslint-disable-next-line no-unused-vars
module.exports = (error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
};
