export const errors = {
  shared: {
    collectionDoesNotExist: (collectionName: string) =>
      `collection '${collectionName}' does not exist`,
  },
  createCollection: {
    invalidCollectionName: (collectionName: string) =>
      `collection name '${collectionName}' is invalid`,
  },
};
