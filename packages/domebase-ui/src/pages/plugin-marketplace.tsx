import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function PluginMarketplace() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{[1, 2, 3, 4, 5].map((item) => (
				<Card key={item} className="mb-4">
					<CardHeader>
						<CardTitle>Plugin {item}</CardTitle>
						<CardDescription>
							This is a description of plugin {item}.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p>Details about plugin {item}...</p>
					</CardContent>
					<CardFooter>
						<CardAction>Install</CardAction>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
