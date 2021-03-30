import { UserModule } from "@/store/user"

export type pay_type = 'card' | 'trans' | 'phone' | 'naverpay'



export const pay = (amount: number, pay_method: pay_type, other: Object = {},naverUseCfm:string,name:string) => {
	const pg = {
		phone:'danal',
		trans:'danal_tpay',
		card:'danal_tpay',
		naverpay:'naverpay',
	}[pay_method]
	return new Promise((resolve, reject) => {
		try {
			const data = {

				name: '',
				buyer_email: UserModule.info?.username,
				buyer_name: UserModule.info?.real_name,
				buyer_tel: UserModule.info?.phone,
				buyer_addr: UserModule.info?.address_detail,
				buyer_postcode: UserModule.info?.address_code,
				app_scheme: 'switch.changbi',
				pg,
				merchant_uid:"switch_" + new Date().getTime() ,
				//读书会截止时间
				naverUseCfm,
				// naverUseCfm: `${new Date().getFullYear()}${new Date().getMonth()+1 < 10 ? '0' + (new Date().getMonth()+1): new Date().getMonth()+1}${new Date().getDate() < 10 ? '0'+new Date().getDate():new Date().getDate()}`,
				m_redirect_url:"https://switch.changbi.com/other/pay/success?go_1=%2Fuser%2Fclub&go_2=%2Fuser%2Fpay",
				...other,
				amount,
				pay_method,
				naverPopupMode:false,
				naverProducts:[
					{
						"categoryType": "ETC",
						"categoryId": "ETC",
						"uid": "imp07867187",
						"name": name,//读书会name
						"count": 1
					}
				]
			}
			console.log(data)
			IMP.request_pay(data, (res:any) => {
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


export const naverpay = (amount: number,name:string,naverUseCfm:string,submit_obj:string) =>{
	return new Promise((resolve, reject)=>{
		const data = {
			name,
			buyer_email: UserModule.info?.username,
			buyer_name: UserModule.info?.real_name,
			buyer_tel: UserModule.info?.phone,
			buyer_addr: UserModule.info?.address_detail,
			buyer_postcode: UserModule.info?.address_code,
			app_scheme: 'switch.changbi',
			pg:"naverpay",
			merchant_uid:"switch_" + new Date().getTime() ,
			//读书会截止时间
			naverUseCfm,
			// naverUseCfm: `${new Date().getFullYear()}${new Date().getMonth()+1 < 10 ? '0' + (new Date().getMonth()+1): new Date().getMonth()+1}${new Date().getDate() < 10 ? '0'+new Date().getDate():new Date().getDate()}`,
			m_redirect_url:`https://switch.changbi.com/other/naverpay?submit_obj=${submit_obj}`,
			amount,
			pay_method:"naverpay",
			naverPopupMode:true,
			naverProducts:[
				{
					"categoryType": "ETC",
					"categoryId": "ETC",
					"uid": "imp07867187",
					"name": name,//读书会name
					"count": 1
				}
			]
		}
		console.log(data)
		IMP.request_pay(data, (res:any) => {
			if (res.success) {
				resolve(res)
			} else {
				reject(res)
			}
		})
	})
}
