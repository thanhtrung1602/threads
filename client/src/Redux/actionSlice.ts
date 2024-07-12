import { createSlice } from "@reduxjs/toolkit";
const actionSlice = createSlice({
  name: "api",
  initialState: {
    actions: {
      feedType: "home",
      idUser: 0,
      postApi: "",
      isPostComment: false,
      isPost: false,
      idComment: 0,
      isEdit: false,
      idPost: 0,
    },
  },
  reducers: {
    setHome: (state) => {
      state.actions.feedType = "home";
    },
    setProfile: (state, action) => {
      state.actions.idUser = action.payload.idUser;
      state.actions.feedType = "profile";
    },
    setSearch: (state) => {
      state.actions.feedType = "search";
    },
    setComment: (state, action) => {
      state.actions.idComment = action.payload;
      state.actions.isPostComment = true;
      state.actions.postApi = "/comment/postComment/";
    },
    setCreatePost: (state) => {
      state.actions.isPost = true;
      state.actions.postApi = "/posts/upPost/";
    },
    setCloseCreatePost: (state) => {
      state.actions.isPost = false;
    },
    setCloseComment: (state) => {
      state.actions.isPostComment = false;
    },
    setUpdateProfile: (state) => {
      state.actions.isEdit = true;
    },
    setCloseEditProfile: (state) => {
      state.actions.isEdit = false;
    },
    setDetail: (state, action) => {
      state.actions.feedType = action.payload.feedType;
      state.actions.idPost = action.payload.idPost;
    },
    setIdUser: (state, action) => {
      state.actions.idUser = action.payload;
    },
  },
});

export const {
  setHome,
  setProfile,
  setComment,
  setCreatePost,
  setCloseCreatePost,
  setCloseComment,
  setUpdateProfile,
  setCloseEditProfile,
  setDetail,
  setIdUser,
  setSearch,
} = actionSlice.actions;
export default actionSlice.reducer;
