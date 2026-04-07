import { createSlice } from "@reduxjs/toolkit";

export let scoreListSlice = createSlice({
  name: "scoreList",
  initialState: { results: [] },
  reducers: {
    addResult: (state, action) => {
      let { score, time } = action.payload;

      state.results.push({
        id: Date.now(),
        score: score,
        time: time,
      });
    },

    deleteResult: (state, action) => {
      let id = action.payload;
      state.results = state.results.filter((item) => item.id !== id);
    },
  },
});

export let { addResult, deleteResult } = scoreListSlice.actions;
