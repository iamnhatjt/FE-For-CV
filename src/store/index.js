import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosFuntion from "../axios";

export const getData = createAsyncThunk("bookpost", async () => {
  const data = await axiosFuntion({}, "/homepage");
  return data;
});

const bookPosts = createSlice({
  name: "bookposts",
  initialState: {
    books: [],
    login: false,
    username: "",
  },
  reducers: {},
  extraReducers: {
    [getData.fulfilled]: (status, action) => {
      console.log(action);
      if (action.payload.data.login === true) {
        status.login = true;
        status.username = action.payload.data.username;
      }

      status.books = action.payload.data.data;
    },
  },
});

export default bookPosts;
