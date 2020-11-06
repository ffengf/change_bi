


const fs = require('fs')
const { copyDir } = require('./copy')
const { zh } = require('../src/i18n/lang/zh.js')

const input_src = 'src'
const output_src = '__src__'

Array.prototype.duplicate = function () {
	var tmp = [];
	this.concat().sort().sort(function (a, b) {
		if (a == b && tmp.indexOf(a) === -1) tmp.push(a);
	});
	return tmp;
}

const values = Object.values(zh)
const zh_to_en = Object.fromEntries(Object.entries(zh).map(([k, v]) => ([v, k])))
const reg_arr = values.map(e => ({ key: e, reg: create_reg(e) }))

if (values.duplicate().length !== 0) {
	console.log('-----------------------------------------------------------------------------------------')
	console.log(values.duplicate(), 'fail:redefinition')
	console.log('-----------------------------------------------------------------------------------------')
} else {
	copyDir(input_src, output_src)
	console.log('-----------------------------------------------------------------------------------------')
	console.log('copy:success')
	console.log('-----------------------------------------------------------------------------------------')

	start(output_src)

	console.log('-----------------------------------------------------------------------------------------')
	console.log('done:success')
	console.log('-----------------------------------------------------------------------------------------')
}


function reset(v) {
	let str = v
	reg_arr.forEach(e => {
		if (e.reg.test(v)) {
			str = str.replace(e.reg, ($1)=>{
				return $1.replace(e.key,zh_to_en[e.key])
				// return `$t("${zh_to_en[e.key]}")`
			})
		}
	})
	return str
}


function create_reg(str) {
	return new RegExp(`\\$t\\(('|")${str}('|")\\)`, 'g')
}

function start(src) {
	if (fs.statSync(src).isFile()) {
		const reg = /.vue$/g
		if (reg.test(src)) {
			const file_value = fs.readFileSync(src, 'utf-8')
			fs.writeFileSync(src, reset(file_value))
			console.log(`${src}:reset success`)
		} else {
			console.log(`${src}:continue`)
		}
	} else {
		const dir = fs.readdirSync(src)
		dir.forEach(ele => {
			start(`${src}/${ele}`)
		})
	}
}
