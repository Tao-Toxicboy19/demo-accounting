import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type PaginationState = {
  page: number;
  totalPage: number;
};

const initialState: PaginationState = {
  page: 1,
  totalPage: 1,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setTotalPage: (state: PaginationState, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },
    setPage: (state: PaginationState, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    nextPage: (state) => {
      state.page = Math.min(state.page + 1, state.totalPage);
    },
    prevPage: (state) => {
      state.page = Math.max(1, state.page - 1);
    },
  },
});

export const { setTotalPage, setPage, nextPage, prevPage } =
  paginationSlice.actions;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const paginationSelector = (store: RootState) => store.paginationSlice;
export default paginationSlice.reducer;
