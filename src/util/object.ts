
import { filter } from "ramda";

export const clean = (data: Record<string, string | number>): any => {
	return filter(x => x !== "", data)
}
