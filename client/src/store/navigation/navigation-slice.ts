import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface NavigationState {
	activeMenuId: string;
	activeBranchId: string;
}

const initialState: NavigationState = {
    activeMenuId: "1",
    activeBranchId: "1",
};

export const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        setActiveMenuId: (state, action: PayloadAction<string>) => {
            state.activeMenuId = action.payload;
        },
        setActiveBranchId: (state, action: PayloadAction<string>) => {
            state.activeBranchId = action.payload;
        },
    },
});

export const { setActiveMenuId, setActiveBranchId } = navigationSlice.actions;

export default navigationSlice.reducer;
