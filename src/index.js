import configureStore from "./store/configureStore";
import { bugAdded, loadBugs } from "./store/bugs";

const store = configureStore();

store.dispatch(loadBugs());
