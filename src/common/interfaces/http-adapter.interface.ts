export abstract class IHttpAdapter {
	abstract get<T>(url: string): Promise<T>;
}
