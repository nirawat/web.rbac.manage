import reducers from "../reducers";
import { createStore, applyMiddleware } from "redux";

const middleware = applyMiddleware();

const store = createStore(reducers, middleware);

// store.subscribe(() => {
//   console.log("store change", store.getState());
// });

export default store;
