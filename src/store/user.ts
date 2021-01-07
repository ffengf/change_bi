import { api_login, api_user, login_res, user_info } from '@/api';
import {
	VuexModule,
	Mutation,
	Action,
	getModule,
	Module
} from "vuex-module-decorators";
import StorageDb from "@/util/storage"
import store from "./index"


export interface info {
	username: string
	phone: string
	id: number
	real_name:string
	avatar:string
	address:string
	address_code:string
	address_detail:string

}


@Module({ name: 'user', dynamic: true, namespaced: true, stateFactory: true, store })
export default class User extends VuexModule {

	private TOKEN: null | string = StorageDb.getLocal('token')
	private INFO: info | null = null

	@Mutation
	private LOGIN({ token }: login_res) {
		this.TOKEN = token
	}

	@Mutation
	private LOGOUT() {
		this.TOKEN = null
		this.INFO = null
	}

	@Action
	public async login(info: { username: string, password: string }) {
		const data = await api_login.signin(info)
		StorageDb.setLocal('token', data.token)
		this.LOGIN(data)
		this.get_info()
	}


	@Action
	public logout() {
		StorageDb.removeLocal('token')
		this.LOGOUT()
	}

	@Action
	public async get_info() {
		if(this.TOKEN === null){
			return
		}
		const { id,username,phone,real_name,avatar,address,address_code,address_detail } = await api_user.get_user_info()
		this.SET_INFO({ id,username,phone,real_name,avatar,address,address_code,address_detail })
	}
	@Action
	public set_info(info:info){
		const { id,username,phone,real_name,avatar,address,address_code,address_detail } = info
		this.SET_INFO({ id,username,phone,real_name,avatar,address,address_code,address_detail })
	}


	@Mutation
	private SET_INFO({ id,username,phone,real_name,avatar,address,address_code,address_detail }: user_info) {
		this.INFO = { id,username,phone,real_name,avatar,address,address_code,address_detail }
	}


	public get token() {
		return this.TOKEN
	}


	public get info() {
		return this.INFO
	}

}


export const UserModule = getModule(User);
