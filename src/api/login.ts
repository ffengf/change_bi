
import { info, UserModule } from "@/store/user"
import { Http } from "./http/base"


export interface login_res {
	id: number
	username: string
	token: string
	phone: string
}

export interface sign_up {
	username: string
	password: string
	real_name: string
	gender: string
	birth: string
	phone: string
	address: string
	address_code: string
	address_detail: string
	favorite_category: number[]
	is_library: number
	is_publish: number
	is_email: number
	is_sms: number
}

class Login extends Http {
	signin(data: { username: string, password: string }) {
		return this.post<login_res>(data, '/user/login')
	}

	signup(data: sign_up) {
		return this.post(data)
	}

	find_account(data: { phone: string, code: string }) {
		return this.get<{
			username: string
			create_time: string
		}>(data, '/user/find_account/')
	}

	send_sms(data: { phone: string }) {
		return this.post(data, '/user/send_sms')
	}

	check_username(data: { username: string }) {
		return this.post(data, '/user/check_username/')
	}

	check_phone(data: any) {
		return this.post(data, '/user/check_phone/')
	}

	check_sms(data: { phone: string, code: string }) {
		return this.post(data, '/user/check_sms/')
	}

	check_account(data: { username: string, phone: string, code: string }) {
		return this.post<{
			id: number
			token: string
		}>(data, '/user/check_account/')
	}

	edit_user<T extends { id: number, token?: string }>({ id, ...data }: T) {
		return this.server.patch(`/user/${id}/`, data, {
			headers: {
				"Accept": 'application/json',
				"Content-Type": 'application/json',
				"Authorization": `token=${data.token}`
			}
		})
	}

	edit_cover(avatar:string){
		return this.patch<info>({ avatar },`/user/${UserModule.info?.id}/`)
	}
}


export const api_login = new Login('/user/')
