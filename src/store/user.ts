import { api_user, login_res } from '@/api/user';
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

	}

	@Action
	public async login(info: { username: string, password: string }) {
		const data = await api_user.signin(info)
		StorageDb.setLocal('token', data.token)
		this.LOGIN(data)
	}


	@Action
	public logout() {

	}

	public get token() {
		return this.TOKEN
	}


	public get info() {
		return this.INFO
	}

}


export const UserModule = getModule(User);
