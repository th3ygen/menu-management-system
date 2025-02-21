import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface NavigationState {
	activeMenuId: string;
	activeBranchId: string;
    activeLabel: string;
}

const initialState: NavigationState = {
    activeMenuId: "3",
    activeBranchId: "1",
    activeLabel: "Menus",
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
        setActiveLabel: (state, action: PayloadAction<string>) => {
            state.activeLabel = action.payload;
        }
    },
});

export const { setActiveMenuId, setActiveBranchId, setActiveLabel } = navigationSlice.actions;

export default navigationSlice.reducer;
