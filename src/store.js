import { configureStore } from "@reduxjs/toolkit";
import { scoreListSlice } from "./scoreListSlice";

export let store = configureStore({
  reducer: { scoreList: scoreListSlice.reducer },
});
