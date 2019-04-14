module.exports = {
  handleMongooseError: (err) => {
    const key = Object.keys(err.errors)[0];
    const message = err.errors[key].message;
    return message;
  }
};