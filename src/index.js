import configureStore from "./store/configureStore";
import * as bugsActions from "./store/bugs";
import * as projectActions from "./store/projects";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());
});

// bugs store
store.dispatch(bugsActions.bugAdded({ description: "Bug 1!!" }));
store.dispatch(bugsActions.bugAdded({ description: "Bug 2!!" }));
store.dispatch(bugsActions.bugAdded({ description: "Bug 3!!" }));

store.dispatch(bugsActions.bugResolved({ id: 1 }));

unsubscribe();

store.dispatch(bugsActions.bugRemoved({ id: 1 }));

// projects store
store.dispatch(projectActions.projectAdded({ name: "Project 1" }));
store.dispatch(projectActions.projectRemoved({ id: 1 }));

console.log("--store--", store.getState());
