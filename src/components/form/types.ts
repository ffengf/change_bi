import { type } from "ramda"

type fn<T> = ((T: T) => boolean) | boolean

interface base<T extends string, U> {
	type: T
	show?: fn<U>
	disable?: fn<U>
}

type needKey<T extends Array<T>> = { [ prop in keyof T ]:T[prop] }

interface video<T> extends base<'video', T> {

}

interface input<T> extends base<'input', T> {

}

type ele<T> = input<T> | video<T>

type data<T> = {
	info: T
	element: ele<T>[]
}



interface info {
	radio: number
	input: string
}


const data: data<info> = {
	info: {
		radio: 1,
		input: "",
	},
	element: []
}
