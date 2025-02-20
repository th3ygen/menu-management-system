type Menu = {
	id: string;

	label: string;
	icon: React.ReactNode;
	depth?: number;
	childs: Menu[];

	isActive: boolean;
};
