const logger = (param) => (store) => (next) => (action) => {
  console.log("logger destination: ", param);
  return next(action);
};

export default logger;
