import Valkey from "iovalkey";

const valkey = new Valkey();

export async function replicate(op, key, buffer, type = "Car") {
	await valkey.xadd(
		"replication_stream",
		"*",
		"op",
		op,
		"key",
		key,
		"value",
		buffer.toString("base64"),
		"type",
		type,
		"ts",
		Date.now().toString(),
	);
}

export async function consumeStream(fromId = "0-0", schemaMap) {
	while (true) {
		const res = await valkey.xread(
			"BLOCK",
			1000,
			"STREAMS",
			"replication_stream",
			fromId,
		);
		if (!res) continue;

		const [, entries] = res[0];
		for (const [id, fields] of entries) {
			const data = parseStreamFields(fields);
			const buffer = Buffer.from(data.value, "base64");

			const schema = schemaMap[data.type];
			if (!schema) throw new Error(`Unknown type: ${data.type}`);

			const decoded = schema.decode(buffer);
			console.log(`[REPLICA] ${data.op} ${data.key}:`, decoded);
			fromId = id;
		}
	}
}

function parseStreamFields(arr) {
	const obj = {};
	for (let i = 0; i < arr.length; i += 2) {
		obj[arr[i]] = arr[i + 1];
	}
	return obj;
}
