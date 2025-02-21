"use client";

import LogoSVG from "@/logo.svg";
import Image from "next/image";
import { Menu as MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveMenuId } from "@/store/navigation/navigation-slice";

export type NavCategory = {
	icon: React.ReactNode;
	label: string;
	items: NavItem[];
};

export type NavItem = {
	id: string;
	icon: React.ReactNode;
	label: string;
};

const ActiveItem: React.FC = () => {
	return (
		<motion.div
			className="absolute top-0 left-0 w-full h-full rounded-2xl bg-primary z-0 pointer-events-none"
			layoutId="active-item"
			layout="position"
		></motion.div>
	);
};

const Category: React.FC<{ nav: NavCategory }> = ({ nav }) => {
	const activeMenuId = useAppSelector(
		(state) => state.navigation.activeMenuId
	);
	const dispatch = useAppDispatch();

	const handleClick = (id: string) => {
		dispatch(setActiveMenuId(id));
	};
	const renderItems = () =>
		nav.items.map((item) => (
			<li key={item.label}>
				<div
					className={cn(
						"relative text-sm text-white/40 p-4 font-bold rounded-2xl cursor-pointer"
					)}
					onClick={() => handleClick(item.id)}
				>
					{activeMenuId === item.id ? <ActiveItem /> : null}

					<div
						className={cn(
							"relative flex gap-4 z-10 duration-300",
							activeMenuId === item.id && "text-secondary"
						)}
					>
						{item.icon}
						<p>{item.label}</p>
					</div>
				</div>
			</li>
		));

	return (
		<div className="flex flex-col bg-secondary-foreground rounded-xl py-2">
			<div className="flex gap-4 px-4 py-2">
				{nav.icon}
				<h2 className="font-semibold text-sm text-accent">{nav.label}</h2>
			</div>
			<ul className="flex flex-col">{renderItems()}</ul>
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
