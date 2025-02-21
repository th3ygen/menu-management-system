"use client";

import ActiveMenu from "@/components/menu/active-menu";
import MenuForm from "@/components/menu/menu-form";
import MenuSelector from "@/components/menu/menu-selector";
import TreeView from "@/components/menu/tree-viewer";
import { useAppDispatch } from "@/store/hooks";
import { fetchMenus } from "@/store/menu/menu-slice";
import { useEffect } from "react";

const Home: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchMenus());
	}, []);

	return (
		<div className="grid grid-cols-3 gap-4">
			<div className="col-span-3 mt-10">
				<ActiveMenu label="Menus" />
			</div>
			<div className="col-span-3 my-4">
				<MenuSelector />
			</div>
			<div>
				<TreeView />
			</div>
			<div>
				<MenuForm />
			</div>
		</div>
	);
};

export default Home;
