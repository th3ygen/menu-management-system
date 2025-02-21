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

const formSchema = z.object({
	menuId: z.string(),
	depth: z.number(),
	parent: z.string(),
	name: z.string().min(2).max(30),
});
const MenuForm: React.FC = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "New menu",
		},
	});

	const onSubmit = () => {};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="menuId"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-thin">Menu ID</FormLabel>
							<FormControl>
								<Input
									placeholder="shadcn"
									{...field}
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
									placeholder="shadcn"
									{...field}
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
									placeholder="shadcn"
									{...field}
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
									placeholder="shadcn"
									{...field}
									className=" w-[15rem] rounded-xl"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Save</Button>
			</form>
		</Form>
	);
};

export default MenuForm;
