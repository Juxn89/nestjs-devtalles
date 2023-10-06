import axios from "axios";
import { IHttpAdapter } from '../interfaces/httpAdapter.interface';

export class PokeApiFetchAdapter implements IHttpAdapter {
	post<T>(url: string, data: any): Promise<T> {
		throw new Error("Method not implemented.");
	}
	
	patch<T>(url: string, data: any): Promise<T> {
		throw new Error("Method not implemented.");
	}

	delete<T>(url: string): Promise<T> {
		throw new Error("Method not implemented.");
	}

	async get<T>(url: string): Promise<T> {
		const resp = await fetch(url)
		const data: T = await resp.json()

		return data
	}
}

export class PokeApiAdapter implements IHttpAdapter {	
	private readonly axios = axios;

	async get<T>(url: string): Promise<T> {
		const resp = await fetch(url)
		const data: T = await resp.json()

		return data
	}
	
	async post<T>(url: string, data: any): Promise<T> {
		throw new Error("Method not implemented.");
	}
	
	async patch<T>(url: string, data: any): Promise<T> {
		throw new Error("Method not implemented.");
	}
	
	async delete<T>(url: string): Promise<T> {
		throw new Error("Method not implemented.");
	}
}