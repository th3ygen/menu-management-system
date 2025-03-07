"use client";

import { ChevronRight, PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	deleteMenu,
	newMenu,
	setActiveNode,
	setExpanded,
	setHoveredId,
} from "@/store/menu/menu-slice";
import { motion } from "motion/react";

export interface TreeNode {
	id: string;
	label: string;
	childs?: TreeNode[];
	depth: number;
	isLastChild?: boolean;
}

const TreeNode: React.FC<{ node: TreeNode }> = ({ node }) => {
	const [isOpen, setIsOpen] = useState(false);
	const isExpanded = useAppSelector((state) => state.menu.isExpanded);
	const hoveredId = useAppSelector((state) => state.menu.hoveredId);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setIsOpen(isExpanded);
	}, [isExpanded]);

	const hasChildren = node.childs && node.childs.length > 0;

	const handleNewNode = () => {
		dispatch(newMenu({ parentId: node.id }));
	};

	const handleDeleteNode = () => {
		dispatch(deleteMenu(node.id));
	};

	const handleEdit = () => {
		dispatch(setActiveNode(node));
	};

	const handleHover = () => {
		dispatch(setHoveredId(node.id));
	};

	const IndicatorLine = () => {
		if (node.depth === 0) {
			return;
		}

		/* if last child, draw L */
		if (node.isLastChild) {
			/* FIX short vertical */
			if (!node.childs || node.childs.length === 0) {
				return (
					<div className="absolute top-0 -left-[13px] h-full w-5">
						{/* vertical */}
						<div className="absolute left-0 top-0 h-full w-[1.5px] bg-gray-300 scale-y-[.65] -translate-y-[2px] origin-top"></div>
						{/* horizontal */}
						<div className="absolute left-0 top-[11px] h-0.5 w-2/3 bg-gray-300"></div>
					</div>
				);
			}

			return (
				<div className="absolute top-0 -left-[13px] h-full w-5">
					{/* vertical */}
					<div className="absolute left-0 top-0 h-full w-[1.5px] bg-gray-300 scale-y-[.55] -translate-y-[2px] origin-top"></div>
					{/* horizontal */}
					<div className="absolute left-0 top-[11px] h-0.5 w-2/3 bg-gray-300"></div>
				</div>
			);
		}

		/* else draw T */
		return (
			<div className="absolute top-0 -left-[13px] h-full w-5">
				{/* vertical */}
				<div className="absolute left-0 top-0 h-full w-[1.5px] bg-gray-300 scale-y-[1.5] origin-top"></div>
				{/* horizontal */}
				<div className="absolute left-0 top-[11px] h-0.5 w-2/3 bg-gray-300"></div>
			</div>
		);
	};

	return (
		<li className="relative my-3">
			{node.childs &&
				node.childs.length > 0 &&
				node.depth > 0 &&
				!node.isLastChild && (
					<div className="absolute -left-[13px] top-0 h-[115%] w-0.5 bg-gray-300 "></div>
				)}
			<div className="relative flex items-center">
				<IndicatorLine />
				{hasChildren && (
					<button
						className="relative p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
						onClick={() => setIsOpen(!isOpen)}
					>
						<ChevronRight
							size={16}
							className={`transform transition-transform duration-200 ${
								isOpen ? "rotate-90" : ""
							}`}
						/>
					</button>
				)}
				{!hasChildren && (
					<>
						<span className="w-6"></span>
						<div className="absolute left-0 top-[11px] h-0.5 w-6 bg-gray-300"></div>
					</>
				)}
				<motion.div
					className="relative flex gap-4 items-center group"
					onHoverStart={handleHover}
				>
					<span className="ml-1 text-sm">{node.label}</span>
					{node.depth > 1 && hoveredId === node.id && (
						<motion.div
							className="h-0 flex gap-2 mb-4"
							layoutId="actions"
							layout="position"
						>
							<Button
								size="icon"
								className="rounded-full h-6 w-6 transition-all duration-300 bg-blue-700 hover:bg-blue-400"
								onClick={handleNewNode}
							>
								<PlusIcon className="text-white" />
							</Button>
							<Button
								size="icon"
								className="rounded-full h-6 w-6 transition-all duration-300 bg-blue-700 hover:bg-blue-400"
								onClick={handleEdit}
							>
								<PenIcon className="text-white" />
							</Button>
							<Button
								size="icon"
								className="rounded-full h-6 w-6 transition-all duration-300 bg-red-700 hover:bg-blue-400"
								onClick={handleDeleteNode}
							>
								<TrashIcon className="text-white" />
							</Button>
						</motion.div>
					)}
				</motion.div>
			</div>
			{hasChildren && (
				<div
					className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${
						isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
					}`}
				>
					<div className="relative overflow-hidden">
						<ul className="pl-6 mt-1">
							{node.childs!.map((childNode) => (
								<TreeNode key={childNode.id} node={childNode} />
							))}
						</ul>
					</div>
				</div>
			)}
		</li>
	);
};

type TreeViewProps = {
	maxHeight?: string;
};

const TreeViewer: React.FC<TreeViewProps> = ({ maxHeight = "600px" }) => {
	const dispatch = useAppDispatch();
	const tree = useAppSelector((state) => state.menu.tree);

	const handleExpandAll = () => {
		dispatch(setExpanded(true));
	};

	const handleCollapseAll = () => {
		dispatch(setExpanded(false));
	};

	return (
		<div>
			<div className="flex gap-2">
				<Button
					className="bg-secondary text-accent px-8 rounded-3xl"
					onClick={handleExpandAll}
				>
					Expand All
				</Button>
				<Button
					variant="outline"
					className="px-8 rounded-3xl"
					onClick={handleCollapseAll}
				>
					Collapse All
				</Button>
			</div>
			<div className="overflow-auto" style={{ maxHeight }}>
				<ul className="p-2">
					{tree.map((node) => (
						<TreeNode key={node.id} node={node} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default TreeViewer;
