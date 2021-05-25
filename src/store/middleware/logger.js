const logger = (params) => (store) => (next) => (action) => {
  console.log("logger destination: ", params.destination);
  console.log("user: ", params.user);
  console.log("logger store", store.getState());
  next(action);
};

export default logger;
