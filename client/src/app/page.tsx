import ActiveMenu from "@/components/menu/active-menu";
import MenuForm from "@/components/menu/menu-form";
import MenuSelector from "@/components/menu/menu-selector";
import { TreeNode } from "@/components/menu/tree-viewer";
import TreeView from "@/components/menu/tree-viewer";

const sampleData: Menu[] = [
	{
		id: "1",
		label: "Root",
		depth: 0,
		childs: [
			{
				id: "2",
				label: "Child 1",
				depth: 1,
				childs: [
					{ id: "5", label: "Grandchild 1", depth: 2 },
					{
						id: "6",
						label: "Grandchild 2",
						depth: 2,
						childs: [
							{
								id: "3",
								label: "Child 2",
								depth: 3,
								childs: [
									{
										id: "7",
										label: "Grandchild 3",
										depth: 4,
									},
									{
										id: "8",
										label: "Grandchild 4",
										depth: 4,
										childs: [
											{
												id: "9",
												label: "Great Grandchild 1",
												depth: 4,
											},
											{
												id: "10",
												label: "Great Grandchild 2",
												depth: 4,
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	},
];

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

const Home: React.FC = () => {
	return (
		<div className="grid grid-cols-3 gap-4">
			<div className="col-span-3 mt-10">
				<ActiveMenu label="Menus" />
			</div>
			<div className="col-span-3 my-4">
				<MenuSelector />
			</div>
			<div>
				<TreeView data={parseMenu(sampleData)} />
			</div>
			<div>
				<MenuForm />
			</div>
		</div>
	);
};

export default Home;
