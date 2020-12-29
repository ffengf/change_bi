

export class Encryption {
	static base_enc<T extends { toString:Function }>(str:T):string{
		return btoa(str.toString())
	}

	static base_dec(str:string):string{
		return atob(str)
	}
}
