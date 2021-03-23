


export const toTop = () =>{
	const div = document.getElementById('scrollbar')?.getElementsByClassName('el-scrollbar__wrap')[0]
	div && (div.scrollTop = 0);
}

export const winopen = (str:string) => {
	// try{
	// 	window.open(str)
	// }catch(e){
	// 	window.location.href = str
	// }
	try{
		location.href = str
	}catch(e){
		window.location.href = str
	}
}
