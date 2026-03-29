//#region src/utils/fetch-metadata.ts
function isBrowserFetchRequest(headers) {
	return headers?.get("sec-fetch-mode") === "cors";
}

//#endregion
export { isBrowserFetchRequest };
//# sourceMappingURL=fetch-metadata.mjs.map