"use client";

import LogoSVG from "@/logo.svg";
import Image from "next/image";
import { Menu as MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export type NavCategory = {
	icon: React.ReactNode;
	label: string;
	items: NavItem[];
};

export type NavItem = {
	icon: React.ReactNode;
	label: string;
	href: string;
	active?: boolean;
};

const ActiveItem: React.FC = () => {
	return (
		<motion.div
			className="absolute left-0 top-0 w-full h-full rounded-2xl bg-primary z-0 pointer-events-none"
			layoutId="active-item"
		></motion.div>
	);
};

const Category: React.FC<{ nav: NavCategory }> = ({ nav }) => {
	const Items = () =>
		nav.items.map((item) => (
			<li key={item.label}>
				<a href={item.href}>
					<div
						className={cn(
							"relative text-sm text-white/40 p-4 font-bold rounded-2xl"
						)}
					>
						{item.active && <ActiveItem />}

						<div
							className={cn(
								"relative flex gap-4 z-10",
								item.active && "text-secondary"
							)}
						>
							{item.icon}
							<p>{item.label}</p>
						</div>
					</div>
				</a>
			</li>
		));

	return (
		<div className="flex flex-col bg-secondary-foreground rounded-xl py-2">
			<div className="flex gap-4 px-4 py-2">
				{nav.icon}
				<h2 className="font-semibold text-sm">{nav.label}</h2>
			</div>
			<ul className="flex flex-col">
				<Items />
			</ul>
		</div>
	);
};

const Sidebar: React.FC<{ navs: NavCategory[] }> = ({ navs }) => {
	const Navs = () =>
		navs.map((nav) => <Category key={nav.label} nav={nav} />);

	return (
		<section className="fixed top-0 left-0 px-4 py-6 h-[100vh] w-[17rem]">
			<div className="w-full h-full bg-secondary rounded-3xl p-4">
				{/* heading */}
				<div className="flex w-full justify-between px-2 py-4 mb-6">
					<Image src={LogoSVG} alt="logo" />
					<MenuIcon className="text-white" />
				</div>

				{/* groups */}
				<Navs />
			</div>
		</section>
	);
};

export default Sidebar;
