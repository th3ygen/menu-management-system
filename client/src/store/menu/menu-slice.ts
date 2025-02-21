import { TreeNode } from "@/components/menu/tree-viewer";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MenuState {
	tree: TreeNode[];
	activeNode: TreeNode | null;
	activeNodeId: string;
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

type NewMenuParams = {
	parentId: string;
};

export const newMenu = createAsyncThunk(
	"/menus/new",
	async (data: NewMenuParams) => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}` +
				"/menus",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const result = await response.json();

		const parsed = parseMenu(result);

		return parsed;
	}
);

export const fetchMenus = createAsyncThunk("/menus/roots", async () => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}` +
			"/menus/roots"
	);
	const data = await response.json();

	const parsed = parseMenu(data);

	return parsed;
});

type UpdateMenuParams = {
	id: string;
	label: string;
};

export const updateMenu = createAsyncThunk(
	"/menus/update",
	async (data: UpdateMenuParams) => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}` +
				`/menus/${data.id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const result = await response.json();

		const parsed = parseMenu(result);

		return parsed;
	}
);

export const deleteMenu = createAsyncThunk(
	"/menus/delete",
	async (id: string) => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}` +
				`/menus/${id}`,
			{
				method: "DELETE",
			}
		);
		const result = await response.json();

		const parsed = parseMenu(result);

		return parsed;
	}
);

const initialState: MenuState = {
	tree: [],
	activeNode: null,
	activeNodeId: "",
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
		setActiveNode: (state, action: PayloadAction<TreeNode>) => {
			state.activeNode = action.payload;
			state.activeNodeId = action.payload.id;
		}
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

		builder.addCase(newMenu.fulfilled, (state, action) => {
			state.tree = action.payload;
			state.status = "success";
		});
		builder.addCase(newMenu.rejected, (state) => {
			state.status = "failed";
		});
		builder.addCase(newMenu.pending, (state) => {
			state.status = "pending";
		});

		builder.addCase(deleteMenu.fulfilled, (state, action) => {
			state.tree = action.payload;
			state.status = "success";
		});
		builder.addCase(deleteMenu.rejected, (state) => {
			state.status = "failed";
		});
		builder.addCase(deleteMenu.pending, (state) => {
			state.status = "pending";
		});

		builder.addCase(updateMenu.fulfilled, (state, action) => {
			state.tree = action.payload;
			state.status = "success";
		});
		builder.addCase(updateMenu.rejected, (state) => {
			state.status = "failed";
		});
		builder.addCase(updateMenu.pending, (state) => {
			state.status = "pending";
		});
	},
});

export const { setTree, setExpanded, setActiveNode } = menuSlice.actions;

export default menuSlice.reducer;
