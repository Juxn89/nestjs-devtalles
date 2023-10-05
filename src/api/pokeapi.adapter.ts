import axios from "axios";

export class PokeApiAdapter {
	private readonly axios = axios;

	async get<T>(url: string) {
		const { data } = await this.axios.get<T>(url)
		return data;
	}

	async post<T>(url: string, data: any) {

	}

	async patch<T>(url: string, data: any) {

	}

	async delete<T>(url: string) {

	}
}