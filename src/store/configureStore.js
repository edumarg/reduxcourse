import { configureStore } from "@reduxjs/toolkit";

// bugs store
// import reducer from "./bugs";

// export default function () {
//   return configureStore({ reducer });
// }

// projects store
import reducer from "./projects";

export default function () {
  return configureStore({ reducer });
}
