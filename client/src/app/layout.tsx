import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/* providers */
import { ThemeProvider } from "@/providers/theme-provider";
import { StoreProvider } from "@/providers/store-provider";

import Sidebar, { NavCategory } from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

import { Folder as FolderIcon, LayoutGrid as GridIcon } from "lucide-react";

const plusJakartaSans = Plus_Jakarta_Sans({
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

const navs = [
	{
		label: "Systems",
		icon: <FolderIcon fill="white" size={"1.2rem"} />,
		id: "1",
		items: [
			{
				label: "System Code",
				id: "1",
				icon: <GridIcon size={"1.2rem"} />,
			},
			{
				label: "Properties",
				id: "2",
				icon: <GridIcon size={"1.2rem"} />,
			},
			{
				label: "Menus",
				id: "3",
				icon: <GridIcon size={"1.2rem"} />,
			},
			{
				label: "API List",
				id: "4",
				icon: <GridIcon size={"1.2rem"} />,
			},
		],
	},
] satisfies NavCategory[];

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		/* surpressing hydration warning for next-themes + shadcn */
		<html lang="en" suppressHydrationWarning>
			<body className={`${plusJakartaSans.className} antialiased`}>
				<StoreProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
					>
						<Sidebar navs={navs} />
						<main className="w-full h-full pl-[19rem]">
							<Topbar />
							<div className="w-full h-full">{children}</div>
						</main>
					</ThemeProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
