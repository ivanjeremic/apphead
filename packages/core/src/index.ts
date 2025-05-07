import {
	createStorage,
	type StorageValue,
	type Storage,
	type Driver,
} from "./db/storage";
import { nanoid } from "nanoid";
import { checkErrors } from "./utils/errors";
import { join } from "pathe";

/**
 * DomeDB class
 */
export class DomeCore {
	path = "./data/";
	kv: Storage<StorageValue>;
	handleQuery: (cleanPath: string) => unknown;
	user: string;

	constructor(ngin: { driver: Driver<unknown, unknown>; path?: string }) {
		if (ngin.path) {
			this.path = ngin.path;
		}

		this.kv = createStorage({
			driver: ngin.driver,
		});

		/**
		 * CREATE SYSTEM COLLECTIONS:
		 * __users
		 * __collections
		 */
		this.kv
			.hasItem("__users", {
				lmdb_path: join(this.path, "__collections"),
			})
			.then((exists) => {
				if (!exists) {
					this.kv.setItem(
						"__users",
						{
							collectionName: "__users",
							schema: { collectionName: "string" },
						},
						{
							lmdb_path: join(this.path, "__collections"),
						},
					);
				}
			});

		this.kv
			.hasItem("__collections", {
				lmdb_path: join(this.path, "__collections"),
			})
			.then((exists) => {
				if (!exists) {
					this.kv.setItem(
						"__collections",
						{
							collectionName: "__collections",
							schema: { collectionName: "string" },
						},
						{
							lmdb_path: join(this.path, "__collections"),
						},
					);
				}
			});
	}

	public async createUser() {
		const id = nanoid();

		const collectionExists = await this.kv.hasItem("__users", {
			lmdb_path: join(this.path, "__collections"),
		});

		const { hasErrors, errorList } = checkErrors([
			{
				condition: collectionExists,
				msg: (errors) => errors.shared.collectionDoesNotExist("__users"),
			},
		]);

		if (hasErrors) {
			return { hasErrors, errorList };
		}

		await this.kv.setItem(id, JSON.stringify({ id }), {
			lmdb_path: join(this.path, "__users"),
		});
	}

	/*
	 * handle collections
	 */
	public async createCollection(collectionName: string, schema?: unknown) {
		const collectionExists = await this.kv.hasItem(collectionName, {
			lmdb_path: join(this.path, "__collections"),
		});

		const { hasErrors, errorList } = checkErrors([
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

		if (hasErrors) {
			return { hasErrors, errorList };
		}

		/* await this.kv.setItem(collectionName, JSON.stringify(schema), {
      path: join(this.path, "__collections"),
    }); ;;;*/

		await this.insert({
			collection: "__collections",
			data: { collectionName, schema },
		});

		return { hasErrors, errorList };
	}

	public async deleteCollection(collectionName: string) {
		//this.ngin.storage.remove(collectionName);
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
		filter: unknown;
		options: unknown;
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
		//ddddddsdsa
		const cleanPath = collection.startsWith("__")
			? collection
			: `${this.user}/${collection}`;

		const values = await this.kv.getItem(join(this.path, cleanPath), {
			lmdb_path: join(this.path, cleanPath),
		});

		return { data: values };
	}

	/*
	 * handle delte documents.
	 */
	public async deleteOne(collectionName: string, query: string | object) {
		//await this.ngin.handleDelete(collectionName, query, true);
	}

	public async deleteMany(collectionName: string, query: string | object) {
		//await this.ngin.handleDelete(collectionName, query, false);
	}
}
