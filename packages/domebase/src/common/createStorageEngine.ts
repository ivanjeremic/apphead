import {
	createStorage,
	defineDriver,
	type Driver,
	type Storage,
	type StorageValue,
} from "unstorage";

type DriverFactory<OptionsT, InstanceT> = (
	opts: OptionsT,
) => Driver<OptionsT, InstanceT>;

export type NGIN = {
	defineKVStore?: DriverFactory<any, never>;
	UNSAFE_custom_external_kv?: Driver<any, never>;
	createCollection: (collectionName: string, schema?: any) => Promise<void>;
	handleInsert: (
		collectionName: string,
		data: any | Array<any>,
		inInsertOne: boolean,
	) => Promise<void>;
	handleDelete: (
		collectionName: string,
		query: object,
		isDeleteOne: boolean,
	) => Promise<void>;
};

export function createStorageEngine(ngin: (s: Storage<StorageValue>) => NGIN) {
	if ("UNSAFE_custom_external_kv" in ngin({} as Storage<StorageValue>)) {
		const storage = createStorage({
			driver: ngin({} as Storage<StorageValue>).UNSAFE_custom_external_kv,
		});

		const options = ngin(storage);

		return options;
	}

	const kv = defineDriver((options: any) => {
		const driver = ngin({} as Storage<StorageValue>).defineKVStore?.(options);
		if (!driver) {
			throw new Error("KV store driver is not defined");
		}
		return driver;
	});

	const storage = createStorage({
		driver: kv({}),
	});

	const options = ngin(storage);
	return options;
}
