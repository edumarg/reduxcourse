const toasty = (store) => (next) => (action) => {
  console.log("action:", action);
  if (action.type === "error") console.log("Toasty: ", action.payload.message);
  else next(action);
};

export default toasty;
