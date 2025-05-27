import protobuf from "protobufjs";

export function createSchema(typeName, fields) {
	const messageType = new protobuf.Type(typeName);
	for (const field of fields) {
		messageType.add(new protobuf.Field(field.name, field.id, field.type));
	}
	const root = new protobuf.Root().define("models").add(messageType);
	return { root, messageType };
}
