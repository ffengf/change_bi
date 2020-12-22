import { api_login, api_user, login_res } from '@/api';
import {
	VuexModule,
	Mutation,
	Action,
	getModule,
	Module
} from "vuex-module-decorators";
import StorageDb from "@/util/storage"
import store from "./index"


interface info {
	username: string
	phone: string
	id: number
}


@Module({ name: 'user', dynamic: true, namespaced: true, stateFactory: true, store })
export default class User extends VuexModule {

	private TOKEN: null | string = StorageDb.getLocal('token')
	private INFO: info | null = null

	@Mutation
	private LOGIN({ username, token, id, phone }: login_res) {
		this.INFO = {
			id,
			username,
			phone,
		}
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
		const { id,username,phone } = await api_user.get_user_info()
		this.SET_INFO({ id,username,phone })
	}
	@Mutation
	private SET_INFO({ username, id, phone }: any) {
		this.INFO = {
			id,
			username,
			phone,
		}
	}


	public get token() {
		return this.TOKEN
	}


	public get info() {
		return this.INFO
	}

}


export const UserModule = getModule(User);
