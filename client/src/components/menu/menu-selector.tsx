import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const MenuSelector: React.FC = () => {
	return (
		<div className="flex flex-col gap-2">
			<label className="text-sm font-extralight">Menu</label>
			<Select defaultValue="system">
				<SelectTrigger className="w-[20rem] bg-gray-50">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="system">system management</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

export default MenuSelector;
