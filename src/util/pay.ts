
export type pay_type = 'card' | 'trans' | 'phone'

export const pay = (amount: number, pay_method: pay_type, other: Object = {}) => {
	return new Promise((resolve, reject) => {
		try {
			IMP.request_pay({
				pg: 'inicis',
				name: '주문명:결제테스트',
				buyer_email: 'iamport@siot.do',
				buyer_name: '구매자이름',
				buyer_tel: '01052301547',
				buyer_addr: '서울특별시 강남구 삼성동',
				buyer_postcode: '123-456',
				merchant_uid:"switch_" + new Date().getTime() ,

				...other,
				amount,
				pay_method,
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
