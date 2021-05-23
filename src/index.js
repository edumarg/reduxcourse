import store from "./customStrore";
import * as actions from "./actions";

store.subscribe(() => {
  console.log("Subscribe changed!!");
});

store.dispatch(actions.bugAdded("bug 1!!!"));
console.log(store.getState());
