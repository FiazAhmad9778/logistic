import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOrderState {
  selectedOrderIds: number[];
}

const initialState: IOrderState = {
  selectedOrderIds: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setSelectedOrderIds: (state, actions: PayloadAction<number[]>) => {
      state.selectedOrderIds = actions.payload;
    },
  },
});

export const { setSelectedOrderIds } = orderSlice.actions;
export default orderSlice.reducer;
