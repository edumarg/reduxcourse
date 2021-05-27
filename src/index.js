import configureStore from "./store/configureStore";
import { addBug, loadBugs, resolveBug, assigneUserToBug } from "./store/bugs";

const store = configureStore();

store.dispatch(loadBugs());

setTimeout(() => {
  store.dispatch(addBug({ description: "!!!new bug!!!" }));
}, 2000);

setTimeout(() => {
  store.dispatch(resolveBug({ id: 2 }));
}, 3000);

setTimeout(() => {
  store.dispatch(assigneUserToBug({ id: 4, userId: 30 }));
}, 4000);
