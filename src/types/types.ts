// Recursive type to generate dot notation keys
export type DotNotation<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? `${Prefix}${Extract<K, string>}` | DotNotation<T[K], `${Prefix}${Extract<K, string>}.`>
    : `${Prefix}${Extract<K, string>}`
}[keyof T]

export type PropsArray<T, K extends number> = K extends 1 ? T : _TupleOf<T, K, []>
type _TupleOf<T, K extends number, R extends unknown[]> = R['length'] extends K ? Partial<R> : _TupleOf<T, K, [T, ...R]>

export const isServer = () => typeof window === 'undefined'

export type MergeTypes<A, B> = {
  [key in keyof A]: key extends keyof B ? B[key] : A[key]
} & B

export const isPrimitive = (val: any) => {
  return val !== Object(val)
}

export const isNumber = (val: any) => !isNaN(+val)

export const isArray = <T>(value: T | T[]): value is T[] => {
  return Array.isArray(value)
}

export const isString = <T>(value: T) => typeof value === 'string'

export type Writable<T> = {
  -readonly [K in keyof T]: T[K]
}
