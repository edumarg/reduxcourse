const toasty = (store) => (next) => (action) => {
  if (action.type === "error") console.log("Toasty: ", action.payload.message);
  else return next(action);
};

export default toasty;
