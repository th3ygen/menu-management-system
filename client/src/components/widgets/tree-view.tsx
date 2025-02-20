"use client";

import { ChevronRight } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface TreeNode {
	id: string;
	name: string;
	children?: TreeNode[];
	depth: number;
	isLastChild?: boolean;
}

interface TreeViewProps {
	data: TreeNode[];
	maxHeight?: string;
}

const TreeView: React.FC<TreeViewProps> = ({ data, maxHeight = "400px" }) => {
	return (
		<div
			className={`overflow-auto border border-gray-200 rounded-lg`}
			style={{ maxHeight }}
		>
			<ul className="p-2">
				{data.map((node) => (
					<TreeNode key={node.id} node={node} />
				))}
			</ul>
		</div>
	);
};

const TreeNode: React.FC<{ node: TreeNode }> = ({ node }) => {
	const [isOpen, setIsOpen] = useState(false);

	const hasChildren = node.children && node.children.length > 0;

	const IndicatorLine = () => {
		if (node.depth === 0) {
			return;
		}
        
		/* if last child, draw L */
		if (node.isLastChild) {
            /* FIX short vertical */
            if (!node.children || node.children.length === 0) {
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
		<li className="my-3">
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
				<span className="ml-1 text-sm">{node.name}</span>
			</div>
			{hasChildren && (
				<div
					className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${
						isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
					}`}
				>
					<div className="relative overflow-hidden">
						<ul className="pl-6 mt-1">
							{node.children!.map((childNode) => (
								<TreeNode key={childNode.id} node={childNode} />
							))}
						</ul>
					</div>
				</div>
			)}
		</li>
	);
};

export default TreeView;
