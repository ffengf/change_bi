
const fs = require('fs')






function start(src) {
	if (fs.statSync(src).isFile()) {
		const reg = /.vue$/g
		if (reg.test(src)) {

		}else{
			console.log(`${src}:continue`)
		}
	} else {
		const dir = fs.readdirSync(src)
		dir.forEach(ele => {
			start(`${src}/${ele}`)
		})
	}
}
