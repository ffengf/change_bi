


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
	// try{
	// 	location.href = str
	// }catch(e){
	// 	window.location.href = str
	// }

	//@ts-ignore
	// window.location.target="_self";
	// window.location.href = str;

	open(str,'_self')//ios app
}


export const kakao_export = (title:string,imageUrl:string,url:string) =>{
	Kakao.Link.sendDefault({
		objectType:"feed",
		content:{
			title,
			imageUrl,
			link:{
				mobileWebUrl:url,
				webUrl:url
			}
		}

	})
}
