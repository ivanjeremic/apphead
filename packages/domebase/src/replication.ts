// write local browser compatible code
export async function replicate(
	_op: any,
	_key: any,
	_buffer: any,
	_type = "Car",
) {
	/* await redis.xadd(
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
	); */
}

// write local browser compatible code
export async function consumeStream(/* fromId = "0-0", schemaMap */) {
	/* while (true) {
		const res = await redis.xread(
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
	} */
}

function parseStreamFields(arr: string | any[]) {
	const obj: { [key: string]: any } = {};
	for (let i = 0; i < arr.length; i += 2) {
		obj[arr[i]] = arr[i + 1];
	}
	return obj;
}
