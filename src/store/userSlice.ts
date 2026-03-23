import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchUsers} from "../services/userApi";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (page: number) => {
    return await fetchUsers(page);
  }
);

interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;

        const newUsers = action.payload.filter(
          (newUser: any) => !state?.users?.some((extUsers: any) => extUsers.id === newUser.id)
        );

        if (newUsers.length > 0) {
          state.users = [...state.users, ...newUsers];
          state.page += 1;
        }

        if (action.payload.length === 0 || newUsers.length === 0) {
          state.hasMore = false;
        }
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const {resetUsers} = userSlice.actions;
export default userSlice.reducer;