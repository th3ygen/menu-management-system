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
			<Select>
				<SelectTrigger className="w-[20rem] bg-gray-50">
					<SelectValue placeholder="Theme" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="light">Light</SelectItem>
					<SelectItem value="dark">Dark</SelectItem>
					<SelectItem value="system">System</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

export default MenuSelector;
