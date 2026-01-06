//@ts-ignore
declare var JSON: {
	stringify(object: object): string;
	parse(string: string): object;
};
type LicenseType = {
	key: string;
	plan: string;
	last_check: number;
};
