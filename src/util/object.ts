
import { filter } from "ramda";

export const clean = (data: Record<string, any>): any => {
	return filter(x => (x !== "" && x !== null), data)
}
