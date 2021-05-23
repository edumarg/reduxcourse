import configureStore from "./store/configureStore";
// import * as actions from "./store/bugs";
import * as actions from "./store/projects";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());
});

// bugs store
// store.dispatch(actions.bugAdded({ description: "Bug 1!!" }));
// store.dispatch(actions.bugAdded({ description: "Bug 2!!" }));
// store.dispatch(actions.bugAdded({ description: "Bug 3!!" }));

// store.dispatch(actions.bugResolved({ id: 1 }));

// unsubscribe();

// store.dispatch(actions.bugRemoved({ id: 1 }));

// projects store
store.dispatch(actions.projectAdded({ name: "Project 1" }));
store.dispatch(actions.projectRemoved({ id: 1 }));

console.log("--store--", store.getState());
