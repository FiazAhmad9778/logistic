import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUserPrivilege {
  newRoleDialog: boolean;
  deleteRoleDialog: boolean;
}

const initialState: IUserPrivilege = {
  newRoleDialog: false,
  deleteRoleDialog: false,
};

const userPrivilegeSlice = createSlice({
  name: 'userPrivilege',
  initialState,
  reducers: {
    toggleNewRoleDialog: (state, actions: PayloadAction<boolean>) => {
      state.newRoleDialog = actions.payload;
    },
    toggleDeleteNewRoleDialog: (state, actions: PayloadAction<boolean>) => {
      state.deleteRoleDialog = actions.payload;
    },
  },
});

export const { toggleNewRoleDialog, toggleDeleteNewRoleDialog } = userPrivilegeSlice.actions;
export default userPrivilegeSlice.reducer;
