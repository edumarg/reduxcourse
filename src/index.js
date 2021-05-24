import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  bugRemoved,
  getUnresolvedBugs,
} from "./store/bugs";
import { projectAdded, projectRemoved } from "./store/projects";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());
});

// bugs store
store.dispatch(bugAdded({ description: "Bug 1!!" }));
store.dispatch(bugAdded({ description: "Bug 2!!" }));
store.dispatch(bugAdded({ description: "Bug 3!!" }));

store.dispatch(bugResolved({ id: 1 }));

unsubscribe();

store.dispatch(bugRemoved({ id: 1 }));

// projects store
store.dispatch(projectAdded({ name: "Project 1" }));
store.dispatch(projectRemoved({ id: 1 }));

console.log("--store--", store.getState());

const unresolvedBugs = getUnresolvedBugs(store.getState());
console.log("Unresolved bugs: ", unresolvedBugs);
