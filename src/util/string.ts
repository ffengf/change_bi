


export function numFormat(num:number | string) {
	return num.toString().replace(/\d+/, function (n) {
		return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
			return $1 + ",";
		});
	})
}

export function editor_length(html_str:string) {
	const reg = /<.+?>/g
	return html_str.replace(reg,'').length
}
