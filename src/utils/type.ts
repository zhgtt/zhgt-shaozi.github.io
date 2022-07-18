/**
 * 自定义 ts 高级类型 - 部分代码取自 antd 源码
 * @tuple - 实现一个由多个 string 组成的数组，通过函数参数解构实现
 * @tupleNum - 实现一个由多个 number 组成的数组，通过函数参数解构实现
 *
 * 对函数的参数进行解构时，会返回那些参数组成的一个数组
 */
export const tuple = <T extends string[]>(...args: T) => args;

export const tupleNum = <T extends number[]>(...args: T) => args;

export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never;

// https://github.com/Microsoft/TypeScript/issues/29729
export type LiteralUnion<T extends U, U = string> = T | (U & {});
