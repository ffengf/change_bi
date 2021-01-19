


export const debounce = (fn: Function, wait: number) => {
	let timeout: null | number = null
	return (...arg) => {
		if (timeout !== null) {
			clearInterval(timeout)
		}
		timeout = setTimeout(fn.bind(null,...arg), wait)
	}
}
export const throttle = (func: Function, wait: number) => {
	let lastTime = 0
	return (...args) => {
		const now = Date.now()
		const coolingDown = now - lastTime < wait
		if (coolingDown) {
			return
		}
		lastTime = Date.now()
		func.apply(null, args)
	}
}
