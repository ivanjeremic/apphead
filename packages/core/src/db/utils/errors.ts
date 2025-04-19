function defineErrorMessages<T>(definedErrors: T) {
  const checkErrors = (
    errorsToCheck: { condition: boolean; msg: (errors: T) => string }[]
  ) => {
    const errorList = [];
    for (const { condition, msg } of errorsToCheck) {
      if (condition) {
        errorList.push(msg(definedErrors));
        console.error(msg(definedErrors));
      }
    }

    return { hasErrors: errorList.length > 0, errorList };
  };

  return checkErrors;
}

export const checkErrors = defineErrorMessages({
  shared: {
    collectionDoesNotExist: (collectionName: string) =>
      `collection '${collectionName}' does not exist`,
  },
  createCollection: {
    invalidCollectionName: (collectionName: string) =>
      `collection name '${collectionName}' is invalid`,
    collectionAlreadyExists: (collectionName: string) =>
      `collection name '${collectionName}' already exists`,
  },
});
