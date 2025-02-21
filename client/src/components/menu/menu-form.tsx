"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { updateMenu } from "@/store/menu/menu-slice";

const formSchema = z.object({
	id: z.string(),
	depth: z.number(),
	parent: z.string().optional(),
	name: z.string().min(2).max(30),
});
const MenuForm: React.FC = () => {
	const activeNode = useAppSelector((state) => state.menu.activeNode);
	const dispatch = useAppDispatch();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	useEffect(() => {
		if (activeNode) {
			form.setValue("id", activeNode.id);
			form.setValue("depth", activeNode.depth);
			form.setValue("name", activeNode.label);
		}
	}, [activeNode, form]);

	const onSubmit = () => {
		const data = form.getValues();
		dispatch(
			updateMenu({
				id: data.id,
				label: data.name,
			})
		);
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="id"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-thin">Menu ID</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={field.value || ""}
									disabled
									className="bg-gray-100 rounded-xl"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="depth"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-thin">Depth</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={field.value || ""}
									className="bg-gray-300 w-[15rem] rounded-xl"
									disabled
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="parent"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-thin">
								Parent Data
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={field.value || ""}
									className=" w-[15rem] rounded-xl"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-thin">Name</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={field.value || ""}
									className=" w-[15rem] rounded-xl"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="bg-blue-700 w-[15rem] text-white py-6 rounded-3xl"
				>
					Save
				</Button>
			</form>
		</Form>
	);
};

export default MenuForm;
