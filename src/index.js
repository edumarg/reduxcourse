import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  bugRemoved,
  bugAssignedToUser,
  getUnresolvedBugs,
  getBugsbyUser,
} from "./store/bugs";
import { projectAdded, projectRemoved } from "./store/projects";
import { userAdded } from "./store/users";

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

// Users store
store.dispatch(userAdded({ name: "User 1" }));
store.dispatch(userAdded({ name: "User 2" }));
console.log("--store--", store.getState());

store.dispatch(bugAssignedToUser({ bugId: 3, userId: 1 }));
store.dispatch(bugAssignedToUser({ bugId: 2, userId: 1 }));

const bugsByUserid = getBugsbyUser(1)(store.getState());
console.log("Bugs from user 1", bugsByUserid);

// The code above id the same as:
// let bugsByUserid = getBugsbyUser(1);
// bugsByUserid = bugsByUserid(store.getState());
// console.log("Bugs from user 1", bugsByUserid);

// middleware
store.dispatch((dispath, getState) => {
  dispath({ type: "bugsReceided", payload: [1, 2, 3] });
  console.log("middleware store", getState());
});

store.dispatch({
  type: "error",
  payload: { message: "An error occured" },
});
