import protobuf from "protobufjs";

/**
 * Creates a Protobuf schema dynamically from an array of field definitions.
 * @param {string} name - The name of the message type.
 * @param {Array} fields - The schema definition array.
 * @returns {protobuf.Type} - The generated Protobuf Type.
 */
export function createSchema(name, fields) {
  const messageType = new protobuf.Type(name);

  fields.forEach((field) => {
    messageType.add(new protobuf.Field(field.field, field.index, field.type));
  });

  return messageType;
}
