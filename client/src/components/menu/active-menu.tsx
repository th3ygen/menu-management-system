import { LayoutGrid } from "lucide-react";

type ActiveMenuProps = {
	label: string;
};

const ActiveMenu: React.FC<ActiveMenuProps> = ({ label }) => {
	return (
		<div className="flex gap-4 items-center">
			<div className="p-4 rounded-full bg-blue-700">
				<LayoutGrid className="text-white" size={"1.5rem"} fill="white" />
			</div>
			<span className="font-extrabold text-3xl text-black">{label}</span>
		</div>
	);
};

export default ActiveMenu;
