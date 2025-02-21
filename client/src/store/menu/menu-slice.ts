import { TreeNode } from "@/components/menu/tree-viewer";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MenuState {
	tree: TreeNode[];
	status: "pending" | "success" | "failed";
	isExpanded: boolean;
}

function parseMenu(data: Menu[]): TreeNode[] {
	if (!data || data.length === 0) return [];

	function traverse(menus: Menu[], depth: number): TreeNode[] {
		if (!menus || menus.length === 0) return [];

		return menus.map((menu, x) => ({
			id: menu.id,
			label: menu.label,
			depth,
			isLastChild: x === menus.length - 1,
			childs: menu.childs && traverse(menu.childs, depth + 1),
		}));
	}

	return traverse(data, 0);
}

export const fetchMenus = createAsyncThunk(
	`${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}` +
		"/menus/roots",
	async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}` +
				"/menus/roots"
		);
		const data = await response.json();

		const parsed = parseMenu(data);

		return parsed;
	}
);

const initialState: MenuState = {
	tree: [],
	isExpanded: true,
	status: "pending",
};

export const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		setTree: (state, action: PayloadAction<TreeNode[]>) => {
			state.tree = action.payload;
		},
		setExpanded: (state, action: PayloadAction<boolean>) => {
			state.isExpanded = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMenus.fulfilled, (state, action) => {
			state.tree = action.payload;
			state.status = "success";
		});
		builder.addCase(fetchMenus.rejected, (state) => {
			state.status = "failed";
		});
		builder.addCase(fetchMenus.pending, (state) => {
			state.status = "pending";
		});
	},
});

export const { setTree, setExpanded } = menuSlice.actions;

export default menuSlice.reducer;
