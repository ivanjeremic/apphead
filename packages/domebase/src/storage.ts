import {
  createStorage,
  type StorageValue,
  type Storage,
  type Driver,
  type CreateStorageOptions,
} from "unstorage";
import { join } from "pathe";
import { nanoid } from "nanoid";
import { checkErrors } from "./utils/errors.js";

/**
 *
 * @TODO consider moving createStorage to the drivers
 */
function initDomeDB(
  storageOptions: CreateStorageOptions | undefined,
  options: { path: string },
) {
  const storage = createStorage(storageOptions);

  /**
   * CREATE SYSTEM COLLECTIONS:
   * __users
   * __collections
   */
  storage
    .hasItem("__users", {
      lmdb_path: join(options.path, "__collections"),
    })
    .then((exists) => {
      if (!exists) {
        storage.setItem(
          "__users",
          {
            collectionName: "__users",
            schema: { collectionName: "string" },
          },
          {
            lmdb_path: join(options.path, "__collections"),
          },
        );
      }
    });

  storage
    .hasItem("__collections", {
      lmdb_path: join(options.path, "__collections"),
    })
    .then((exists) => {
      if (!exists) {
        storage.setItem(
          "__collections",
          {
            collectionName: "__collections",
            schema: { collectionName: "string" },
          },
          {
            lmdb_path: join(options.path, "__collections"),
          },
        );
      }
    });

  return storage;
}

/**
 *
 *  createUserHandler
 */
async function createUserHandler(storage: Storage<StorageValue>, path: string) {
  const id = nanoid();

  const collectionExists = await storage.hasItem("__users", {
    lmdb_path: join(path, "__collections"),
  });

  const errio = checkErrors([
    {
      condition: collectionExists,
      msg: (errors) => errors.shared.collectionDoesNotExist("__users"),
    },
  ]);

  if (errio.hasErrors) {
    return { hasErrors: errio.hasErrors, errorList: errio.errorList };
  }

  await storage.setItem(id, JSON.stringify({ id }), {
    lmdb_path: join(path, "__users"),
  });

  return {
    data: { id },
    hasErrors: errio.hasErrors,
    errorList: errio.errorList,
  };
}

/**
 *
 *  createCollectionHandler
 */
async function createCollectionHandler(
  storage: Storage<StorageValue>,
  path: string,
  insert: (arg0: {
    collection: string;
    data: { collectionName: string; schema: unknown };
  }) => unknown,
  collectionName: string,
  schema?: unknown,
) {
  const collectionExists = await storage.hasItem(collectionName, {
    lmdb_path: join(path, "__collections"),
  });

  const errio = checkErrors([
    {
      condition: collectionName.includes("_"),
      msg: (errors) =>
        errors.createCollection.invalidCollectionName(collectionName),
    },
    {
      condition: collectionExists,
      msg: (errors) =>
        errors.createCollection.collectionAlreadyExists(collectionName),
    },
  ]);

  if (errio.hasErrors) {
    return { hasErrors: errio.hasErrors, errorList: errio.errorList };
  }
  await insert({
    collection: "__collections",
    data: { collectionName, schema },
  });

  return {
    collectionName,
    schema,
    hasErrors: errio.hasErrors,
    errorList: errio.errorList,
  };
}

async function deleteOneHandler(
  storage: Storage<StorageValue>,
  path: string,
  collection: string,
  id: string,
) {
  try {
    await storage.remove(id, {
      lmdb_path: join(path, collection),
    });
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

export {
  initDomeDB,
  createUserHandler,
  createCollectionHandler,
  deleteOneHandler,
  type Storage,
  type StorageValue,
  type Driver,
};
