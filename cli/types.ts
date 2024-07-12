export type Result<
	Data extends Record<PropertyKey, any> | string,
	Error extends Record<PropertyKey, any> | string,
	Ok extends boolean = boolean,
> = [Ok, Ok extends true ? Data : null, Ok extends false ? Error : null]
