import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRouteState {
  selectedRouteIds: number[];
}

const initialState: IRouteState = {
  selectedRouteIds: [],
};

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setSelectedRouteIds: (state, actions: PayloadAction<number[]>) => {
      state.selectedRouteIds = actions.payload;
    },
  },
});

export const { setSelectedRouteIds } = routeSlice.actions;
export default routeSlice.reducer;
