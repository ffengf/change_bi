
import axios, { AxiosInstance } from 'axios';

import { app as Vue } from '@/main'


const server = axios.create({
	baseURL: 'http://13.125.137.129:8000',
	timeout: 10000,
	headers: {
		"Accept": 'application/json',
		"Content-Type": 'application/json',
	},
})


server.interceptors.request.use(config => {
	if(config.url?.includes('/user/') && config.method === 'patch' ){
		config.headers.Authorization = `token=${config?.data?.token}`
	}
	return config;
}, err => {
	return Promise.reject(err);
})
server.interceptors.response.use(({ data, status }) => {
	if (data.code) {
		Vue.$message.error(data.msg)
		return Promise.reject(data)
	}
	return data
}, err => {
	if (err?.response?.status === 401) {
		Vue.$message.error(`401:error`)
		return Promise.reject(err)
	}
	if (err?.response?.status === 403) {
		Vue.$router.push('/login')
		Vue.$message.error('token:error')
		return Promise.reject(err)
	}
	Vue.$message.error(`fail:serve error`)
	return Promise.reject(err)
})




export abstract class Http {
	protected readonly uri: string
	protected readonly server: AxiosInstance = server;

	constructor(uri: string) {
		this.uri = uri
	}

	protected post<T = unknown>(data: any, uri = this.uri): Promise<T> {
		return this.server.post(uri, data)
	}

	protected get<T = unknown>(params?: any, uri = this.uri): Promise<T> {
		return this.server.get(uri, { params })
	}

	protected patch<T = unknown>(data, uri = this.uri): Promise<T> {
		return this.server.patch(uri, data)
	}
}
