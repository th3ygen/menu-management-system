import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MenuState {
	tree: Menu[];
	isExpanded: boolean;
}

const initialState: MenuState = {
	tree: [
		{
			id: "sys-root",
			label: "system management",
			depth: 0,
			childs: [
				{
					id: "root",
					label: "System Management",
					childs: [],
					depth: 1,
				},
			],
		},
	],
	isExpanded: true,
};

export const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		setTree: (state, action: PayloadAction<Menu[]>) => {
			state.tree = action.payload;
		},
		setExpanded: (state, action: PayloadAction<boolean>) => {
			state.isExpanded = action.payload;
		},
	},
});

export const { setTree, setExpanded } = menuSlice.actions;

export default menuSlice.reducer;
