const fs = require('fs')
function copyDir(src, dist, callback) {
	try{
		fs.accessSync(dist);
		_copy(null, src, dist);
	}catch(e){
		fs.mkdirSync(dist);
		_copy(null, src, dist);
	}

	function _copy(err, src, dist) {
		if (err) {
			callback(err);
		} else {
			const paths = fs.readdirSync(src)
			paths.forEach(function (path) {
				var _src = src + '/' + path;
				var _dist = dist + '/' + path;
				const stat = fs.statSync(_src)
				if (stat.isFile()) {
					console.log(fs.readFileSync(_src,'utf-8'))
					fs.writeFileSync(_dist, fs.readFileSync(_src,'utf-8'));
				} else if (stat.isDirectory()) {
					copyDir(_src, _dist, callback)
				}
			})
		}
	}
}
copyDir('src','__src__')
