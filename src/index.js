import { sortedIndex } from "lodash";
import store from "./store";
import * as actions from "./actions";

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());
});

store.dispatch(actions.bugAdded("Bug 1!!"));

store.dispatch(actions.bugResolved(1));

unsubscribe();

store.dispatch(actions.bugRemoved(1));

console.log("--store--", store.getState());
