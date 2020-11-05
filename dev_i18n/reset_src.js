


const fs = require('fs')
const { copyFileSync } = require('fs-extra')
const v = fs.readFileSync('./src/App.vue','utf-8')
const { zh } = require('../src/i18n/lang/zh.js')

Array.prototype.duplicate = function () {
	var tmp = [];
	this.concat().sort().sort(function (a, b) {
		if (a == b && tmp.indexOf(a) === -1) tmp.push(a);
	});
	return tmp;
}

const values = Object.values(zh)
const zh_to_en = Object.fromEntries( Object.entries(zh).map(([k,v]) => ([v, k])) )
const reg_arr = values.map(e => ({ key:e,reg:create_reg(e) }))

if(values.duplicate().length !== 0){
	console.log('-----------------------------------------------------------------------------------------')
	console.log(values.duplicate(),'fail:redefinition')
	console.log('-----------------------------------------------------------------------------------------')
}else{

	// copyFileSync('./src','./__src__','')
	// fs.copyFileSync('src','__src__')

	// const a = fs.readFileSync('./__src__')

	// console.log(a)
	console.log('-----------------------------------------------------------------------------------------')
	console.log('success')
	console.log('-----------------------------------------------------------------------------------------')
}


function reset(v){
	reg_arr.forEach(e =>{
		if(e.reg.test(v)){
			str = str.replace(e.reg,`$t("${zh_to_en[e.key]}")`)
		}
	})
}


function create_reg(str){
	return new RegExp(`\\$t\\(('|")${str}('|")\\)`,'g')
}
