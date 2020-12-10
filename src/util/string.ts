


export function numFormat(num:number | string) {
	return num.toString().replace(/\d+/, function (n) {
		return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
			return $1 + ",";
		});
	})
}
