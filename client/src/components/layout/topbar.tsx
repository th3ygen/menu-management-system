import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash, Folder } from "lucide-react";

const Topbar: React.FC = () => {
	return (
		<div className="h-[5rem] z-50 flex items-end gap-2">
			<Folder fill="white" size={"1.2rem"} />
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<Slash />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink href="/components">
							Components
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
};

export default Topbar;
