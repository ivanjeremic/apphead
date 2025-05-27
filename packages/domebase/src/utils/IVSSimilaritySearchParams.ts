import type { IVSFilterOptions } from "./IVSFilterOptions.js";

export interface IVSSimilaritySearchParams {
	query: string;
	k?: number;
	filterOptions?: IVSFilterOptions;
	includeValues?: boolean;
}
