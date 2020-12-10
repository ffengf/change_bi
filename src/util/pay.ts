

export const pay = (merchant_uid:string|number,amount: number, pay_method: 0 | 1 | 2, other: Object = {}) => {
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

				...other,
				merchant_uid,
				amount,
				pay_method,
			}, (res) => {
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
