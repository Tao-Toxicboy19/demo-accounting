import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '../../types/users-type';

type AuthState = {
  user: User | null;
  isLoading: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    clearUser(state) {
      state.user = null;
      state.isLoading = true;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const authSelector = (store: RootState) => store.authSlice;
export default authSlice.reducer;
