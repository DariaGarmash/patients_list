import { TStyleMap } from "../../../types/status";

export type TStatus = 'is-success' | 'is-warning' | 'is-danger' | "is-not-started"

export const defineStatus = <T extends string, K>(statusValue: T, styleMap: TStyleMap<T, K>): K => {
    return styleMap[statusValue]
};