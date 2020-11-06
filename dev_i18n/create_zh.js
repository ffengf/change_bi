
const fs = require('fs')
const { zh } = require('../src/i18n/lang/zh.js')


Array.prototype.duplicate = function () {
	var tmp = [];
	this.concat().sort().sort(function (a, b) {
		if (a == b && tmp.indexOf(a) === -1) tmp.push(a);
	});
	return tmp;
}


const values = Object.values(zh)

if (values.duplicate().length === 0) {
	const zh_to_zh = Object.fromEntries( Object.entries(zh).map(([_,v]) => ([v, v])) )
	const str = `exports.dev = ${JSON.stringify(zh_to_zh)}`
	fs.writeFileSync('./src/i18n/lang/dev.js', str)
	console.log('-----------------------------------------------------------------------------------------')
	console.log('\x1B[32m%s\x1B[0m','success')
	console.log('-----------------------------------------------------------------------------------------')
} else {
	console.log('-----------------------------------------------------------------------------------------')
	console.log('\x1B[31m%s\x1B[0m',values.duplicate(),'fail:redefinition')
	console.log('-----------------------------------------------------------------------------------------')
}




