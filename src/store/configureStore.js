import { configureStore } from "@reduxjs/toolkit";
import reducer from "./bugs";

export default function configureStore() {
  const store = configureStore({ reducer });
  return store;
}
