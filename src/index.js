import store from "./customStrore";
import * as actions from "./actions";

store.subscribe(() => {
  console.log("Subscribe changed!!");
});

store.dispatch(actions.bugAdded("bug 1!!!"));
console.log("--store--", store.getState());

store.dispatch(actions.bugAdded("bug 2!!!"));
console.log("--store--", store.getState());

store.dispatch(actions.bugResolved(1));

console.log("--store--", store.getState());

store.dispatch(actions.bugResolved(2));

console.log("--store--", store.getState());

store.dispatch(actions.bugRemoved(1));

console.log("--store--", store.getState());

store.dispatch(actions.bugRemoved(2));

console.log("--store--", store.getState());
