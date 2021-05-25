import configureStore from "./store/configureStore";
import { addBug, loadBugs } from "./store/bugs";

const store = configureStore();

// store.dispatch(loadBugs());

store.dispatch(addBug({ description: "new bug!!!" }));
