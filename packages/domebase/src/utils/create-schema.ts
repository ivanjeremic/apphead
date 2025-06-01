import protobuf from "protobufjs";

/**
 * Creates a Protobuf schema dynamically from an array of field definitions.
 * @param {string} name - The name of the message type.
 * @param {Array} fields - The schema definition array.
 * @returns {protobuf.Type} - The generated Protobuf Type.
 */
export function createSchema(name: any, fields: any[]) {
	const messageType = new protobuf.Type(name);

	for (const field of fields) {
		messageType.add(new protobuf.Field(field.field, field.index, field.type));
	}

	return messageType;
}
