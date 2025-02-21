"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAppSelector } from "@/store/hooks";
import { Slash, Folder } from "lucide-react";

const Topbar: React.FC = () => {
	const activeLabel = useAppSelector((state) => state.navigation.activeLabel);
	return (
		<div className="h-[5rem] z-50 flex items-end gap-2">
			<Folder fill="white" size={"1.2rem"} />
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbSeparator>
						<Slash />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">{activeLabel}</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
};

export default Topbar;
