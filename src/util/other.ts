


export const toTop = () =>{
	const div = document.getElementById('scrollbar')?.getElementsByClassName('el-scrollbar__wrap')[0]
	div && (div.scrollTop = 0);
}
