import {
  createStorage,
  defineDriver,
  Driver,
  Storage,
  StorageValue,
} from "unstorage";

type DriverFactory<OptionsT, InstanceT> = (
  opts: OptionsT
) => Driver<OptionsT, InstanceT>;

export type NGIN = {
  defineKVStore?: DriverFactory<any, never>;
  UNSAFE_custom_external_kv?: Driver<any, never>;
  createCollection: (collectionName: string, schema?: any) => Promise<void>;
  handleInsert: (
    collectionName: string,
    data: any | Array<any>,
    inInsertOne: boolean
  ) => Promise<void>;
  handleDelete: (
    collectionName: string,
    query: string | object,
    isDeleteOne: boolean
  ) => Promise<void>;
};

export function createStorageEngine(ngin: (s: Storage<StorageValue>) => NGIN) {
  if ("UNSAFE_custom_external_kv" in ngin({} as Storage<StorageValue>)) {
    const storage = createStorage({
      driver: ngin({} as Storage<StorageValue>).UNSAFE_custom_external_kv,
    });

    const options = ngin(storage);

    return options;
  } else {
    const kv = defineDriver((options) => {
      const driver = ngin({} as Storage<StorageValue>).defineKVStore!(options);
      return driver;
    });

    const storage = createStorage({
      driver: kv({}),
    });

    const options = ngin(storage);
    return options;
  }
}
