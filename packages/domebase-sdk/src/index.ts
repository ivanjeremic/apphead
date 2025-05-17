import { DomeCore } from "domebase";
import localStorageDriver from "unstorage/drivers/localstorage";

export class DomebaseClient extends DomeCore {
	constructor() {
		super({
			driver: localStorageDriver({ base: "domebase" }),
			path: ".domebase",
		});
	}

	async addCollection({ collection }: { collection: string }) {
		const res = await fetch("http://localhost:3001/api/db/insert", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ collection, fields: "{}" }),
		});
		const data = await res.json();

		if (!data.success && data.message) {
			// biome-ignore lint/complexity/noForEach: <explanation>
			data.message.forEach((message: string) => {
				console.error(message);
			});
		}
	}
}
