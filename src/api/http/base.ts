
import axios, { AxiosInstance } from 'axios';

import { app as Vue } from '@/main'
import { UserModule } from '@/store/user';
import { debounce,throttle } from '@/util/function';
import { Encryption } from '@/util/encryption';

const alert_403 = debounce((err:any)=>{
	let title = ''
	if(err?.response?.data === 4001){
		title = '토큰 유효기간이 지났습니다.'
	}else{
		title = '로그인후 다시 시도해 주세요.'
	}
	Vue.$alert(title,{
		confirmButtonText:'로그인 하기',
		callback(){
			Vue.$router.push({
				path:'/login',
				query:{
					last:Encryption.base_enc(Vue.$route.fullPath)
				}
			})
		}
	})
},100)

const server = axios.create({
	baseURL: 'https://api.changbi.com:8000',
	timeout: 10000,
	headers: {
		"Accept": 'application/json',
		"Content-Type": 'application/json',
		"Accept-Language": 'kr;q=0.9',
	},
})


server.interceptors.request.use(config => {
	if (UserModule.token !== null && UserModule.token !== ''){
		config.headers.Authorization = `token=${UserModule.token}`
	}
	return config;
}, err => {
	return Promise.reject(err);
})
server.interceptors.response.use(({ data, status }) => {
	if(data.code === 50001){
		return data
	}
	if(data.code === 4004){
		Vue.$alert('잘못된 접근입니다. 홈페이지로 이동하겠습니다.',{
			confirmButtonText:'확인',
			callback(){
				Vue.$router.replace('/')
			}
		})
		return
	}
	if (data.code) {
		Vue.$message.error(data.msg)
		return Promise.reject(data)
	}
	return data
}, err => {
	if (err?.response?.status === 401) {
		Vue.$message.error(`권한이 부여되지 않았습니다.`)
		return Promise.reject(err)
	}
	if (err?.response?.status === 403) {
		alert_403(err)
		return Promise.reject(err)
	}
	Vue.$message.error(`서비스 응답 오류`)
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
	protected delete<T = unknown>(id:number,uri = this.uri):Promise<T> {
		return this.server.delete(`${uri}${id}/`)
	}
}
