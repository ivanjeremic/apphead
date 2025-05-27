export async function loader({ context }: Route.LoaderArgs) {
	const colls = await domebase.query({ collection: "__collections" });

	return colls;
}