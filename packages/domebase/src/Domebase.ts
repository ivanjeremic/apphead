import {
	initDomeDB,
	createUserHandler,
	createCollectionHandler,
	deleteOneHandler,
	type Storage,
	type StorageValue,
	type Driver,
} from "./storage.js";
import { nanoid } from "nanoid";
import { checkErrors } from "./utils/errors.js";
import { join } from "pathe";

type PluginFunction<T> = {
	name: string;
	instance: (domebase: T) => unknown;
};

interface DomebaseOptions<T> {
	baseURL?: string;
	driver?: Driver<unknown, unknown>;
	plugins?: PluginFunction<T>[];
}

/**
 * DomeDB class
 */
export class Domebase {
	path = ".domebase";
	kv: Storage<StorageValue>;
	user = "";
	plugin = new Map();
	baseURL = "";

	constructor(ngin: DomebaseOptions<Domebase>) {
		if (ngin.baseURL) {
			this.baseURL = ngin.baseURL;
		}

		for (const fn of ngin.plugins ?? []) {
			const res = fn;
			this.plugin.set(res.name, res.instance(this));
		}

		this.kv = initDomeDB(
			{
				driver: ngin.driver,
			},
			{ path: this.path },
		);
	}

	public async createUser() {
		const res = await createUserHandler(this.kv, this.path);

		return res;
	}

	/*
	 * handle collections
	 */
	public async createCollection(collectionName: string, schema?: unknown) {
		const res = await createCollectionHandler(
			this.kv,
			this.path,
			this.insert.bind(this),
			collectionName,
			schema,
		);

		return res;
	}

	/**
	 *
	 * @param collectionName
	 * @param data
	 *
	 * @TODO THE ID NEEDS TO BE CHANGES TO BE creatorId:fields.
	 */
	public async insert({
		collection,
		data,
	}: { collection: string; data: unknown }) {
		const collectionExists = await this.kv.hasItem(collection, {
			lmdb_path: join(this.path, "__collections"),
		});

		// onBeforeInsert

		const { hasErrors, errorList } = checkErrors([
			{
				condition: !collectionExists,
				msg: (errors) => errors.shared.collectionDoesNotExist(collection),
			},
		]);

		if (hasErrors) {
			return { hasErrors, errorList };
		}

		await this.kv.setItem(nanoid(), JSON.stringify(data), {
			lmdb_path: join(this.path, this.user, collection),
		});
	}

	/**
	 *
	 * @param param0
	 * @returns {Promise<unknown>}
	 */
	public async query({
		collection,
		filter,
		options,
	}: {
		collection: string;
		filter?: unknown;
		options?: unknown;
	}): Promise<unknown> {
		/* const collectionExists = await this.kv.hasItem(collection, {
      path: join(this.path, "__collections"),
    });

    const { hasErrors, errorList } = checkErrors([
      {
        condition: !collectionExists,
        msg: (errors) => errors.shared.collectionDoesNotExist(collection),
      },
    ]);

    if (hasErrors) {
      return { hasErrors, errorList };
    } */

		if (this.baseURL === "/") {
			const res = await fetch("/domebase/api/books");

			const data = await res.json();

			return data;
		}

		const cleanPath = collection.startsWith("__")
			? collection
			: `${this.user}/${collection}`;

		const values = await this.kv.getItem(join(this.path, cleanPath), {
			lmdb_path: join(this.path, cleanPath),
		});

		return { data: values };
	}

	/**
	 *
	 * @param collection
	 */
	public async deleteOne(collection: string, id: string) {
		try {
			await deleteOneHandler(this.kv, this.path, collection, id);
		} catch (error) {
			console.error("Error deleting item:", error);
		}
	}

	// handle plugins
	public async registerPlugin<T>(name: string, plugin: PluginFunction<T>) {
		// create a js file on the file system or a serverless function if hosted serverless
	}

	public async deletePlugin<T>(name: string, plugin: PluginFunction<T>) {
		//
	}
}
