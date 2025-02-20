import TreeView from "@/components/widgets/tree-view";

const sampleData = [
	{
		id: "1",
		name: "Root",
		depth: 0,
		children: [
			{
				id: "2",
				name: "Child 1",
				depth: 1,
				isLastChild: true,
				children: [
					{ id: "5", name: "Grandchild 1", depth: 2 },
					{
						id: "6",
						name: "Grandchild 2",
						depth: 2,
						isLastChild: true,
						children: [
							{
								id: "3",
								name: "Child 2",
								depth: 3,
								isLastChild: true,
								children: [
									{ id: "7", name: "Grandchild 3", depth: 4 },
									{
										id: "8",
										name: "Grandchild 4",
										depth: 4,
										isLastChild: true,
										children: [
											{
												id: "9",
												name: "Great Grandchild 1",
												depth: 4,
											},
											{
												id: "10",
												name: "Great Grandchild 2",
												depth: 4,
												isLastChild: true,
											},
										],
									},
								],
							},
						],
					},
				],
			},
			/* {
				id: "3",
				name: "Child 2",
				depth: 1,
				children: [
					{ id: "7", name: "Grandchild 3", depth: 2 },
					{
						id: "8",
						name: "Grandchild 4",
						depth: 2,
						children: [
							{ id: "9", name: "Great Grandchild 1", depth: 3 },
							{ id: "10", name: "Great Grandchild 2", depth: 3 },
						],
					},
				],
			}, */
			/* { id: "4", name: "Child 3", depth: 1 },
			{
				id: "11",
				name: "Child 4",
				depth: 1,
				children: [
					{
						id: "12",
						name: "Grandchild 5",
						depth: 2,
						children: [
							{ id: "13", name: "Great Grandchild 3", depth: 3 },
							{ id: "14", name: "Great Grandchild 4", depth: 3 },
							{
								id: "15",
								name: "Great Grandchild 5",
								depth: 3,
								children: [
									{
										id: "16",
										name: "Great Great Grandchild 1",
										depth: 4,
									},
									{
										id: "17",
										name: "Great Great Grandchild 2",
										depth: 4,
									},
								],
							},
						],
					},
					{ id: "18", name: "Grandchild 6", depth: 2 },
				],
			}, */
		],
	},
];

export default function Home() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Tree View Example</h1>
			<TreeView data={sampleData} maxHeight="400px" />
		</div>
	);
}
