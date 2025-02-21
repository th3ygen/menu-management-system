type Menu = {
	id: string;

	label: string;
	depth?: number;

	parent?: Menu;
	childs?: Menu[];
};
