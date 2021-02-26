import { UserModule } from "@/store/user"

export type pay_type = 'card' | 'trans' | 'phone' | 'naverpay'



export const pay = (amount: number, pay_method: pay_type, other: Object = {}) => {
	const pg = {
		phone:'danal',
		trans:'danal_tpay',
		card:'danal_tpay',
		naverpay:'naverpay',
	}[pay_method]
	return new Promise((resolve, reject) => {
		try {
			IMP.request_pay({

				name: '',
				buyer_email: UserModule.info?.username,
				buyer_name: UserModule.info?.real_name,
				buyer_tel: UserModule.info?.phone,
				buyer_addr: UserModule.info?.address_detail,
				buyer_postcode: UserModule.info?.address_code,

				pg,
				merchant_uid:"switch_" + new Date().getTime() ,

				...other,
				amount,
				pay_method:pay_method === 'naverpay' ? undefined : pay_method,
			}, (res:any) => {
				if (res.success) {
					resolve(res)
				} else {
					reject(res)
				}
			})
		} catch (e) {
			reject(e)
		}
	})
}
