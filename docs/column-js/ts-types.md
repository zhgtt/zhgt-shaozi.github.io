---
title: TypeScript 高级类型 📦
id: ts-types
# sidebar_position: 6
toc_max_heading_level: 4
---

> 本章节记录 TypeScript 的一些高级类型、语法 & 实现

## 类型断言

类型断言 简言之就是 **强制将一个类型转换成另一个类型**，当一个有明确类型的变量，只是期望在使用的时候转换一下类型，而不改变其最初的类型，这时可以使用类型断言的方式来解决，如下;

```ts title="代码实现 - 壹" showLineNumbers
// 使用 <> 尖括号语法
const value = '12.344';
Math.round(<number>(<unknown>value)); // 由于 Math.round() 只能接收 number 类型，所以需要将变量进行转换，这里需先转为 unknown，再转为 number
```

```ts title="代码实现 - 贰" showLineNumbers
// 使用 as 语法，作用和 尖括号语法一致
const value = '12.344';
Math.round(value as unknown as number);
```

```ts title="代码实现 - 叁" showLineNumbers
// 非空断言，用 x! 表示，意思是排除掉 x 值中的 undefined 和 null 类型;
const value: string | null | undefined = '眼看他起高楼';
const newValue: string = value!; // 将 value 的空类型都排除
```

## 泛型

- 泛型是强类型语言中比较重要的一个概念，多用于定义函数的类型，表示函数的参数并没有指定明确的类型，而是由开发者根据自己的数据类型来传递参数 或 调用函数，复用性和灵活性较强;
- 泛型通过一对尖括号 `<>` 来表示，尖括号内的内容被称为 **类型变量**，也就是一个变量代表一个未知的类型;

```ts title="代码示例" showLineNumbers
const showType = <T>(value: T) => {
  // 或
  // function showType<T>(value: T) {
  return value;
};

showType('😄');
showType(123);

// 示例中的 showType 就为 泛型函数，在没有调用它之前，是不知道其参数的类型是什么，只有调用了该函数，传递了参数，才知道 T 表示什么类型;
```

##### 泛型接口

定义接口时，也可以使用泛型来约束其中的类型，灵活性更强;

```ts title="代码示例" showLineNumbers
// 定义一个泛型接口（支持多个参数），可以灵活的使用该接口
interface SelfInfo<T, U> {
  name: string;
  age: T;
  lives: U;
}

// 使用泛型接口时，需指定泛型中的类型
const func = (params: SelfInfo<number, string[]>) => {
  console.log(params);
};

func({ name: 'dino', age: 25, lives: ['杭州'] });
```

:::tip 参考资料

- 👉 [你不知道的 TypeScript 泛型 - 微信](https://mp.weixin.qq.com/s/WtTOxHKbegZHAcYopgYTrw)

:::

## 高级类型

### 交叉类型（&）

- 语法: `T & U`
- 作用: 将 **多个类型合并为一个类型**，其返回的类型既要符合 `T` 类型，也要符合 `U` 类型，相当于逻辑条件中的 **与**;

```ts title="代码示例" showLineNumbers
interface ArcoPublicProps {
  title: string;
}

interface ArcoBtnProps {
  type: string;
  style: React.CSSProperties;
}

// 需符合上述类型中定义的所有字段
const eleProps: ArcoPublicProps & ArcoBtnProps = {
  title: '标题',
  type: '类型',
  style: {},
};
```

### 联合类型（|）

- 语法: `T | U`
- 作用: 和交叉类型很像，也是将 多个类型合并为一个类型，只是其返回的类型可以是 **合并后类型中的任意一个**，相当于逻辑条件中的 **或**;

```ts title="代码示例" showLineNumbers
const value: string | number = '😪 😪'; // value 变量的类型可以是 string 和 number 中的任意一个

interface ArcoPublicProps {
  title: string;
}

interface ArcoBtnProps {
  type: string;
  style: React.CSSProperties;
}

// 需符合上述类型中的任意一个
const eleProps: ArcoPublicProps | ArcoBtnProps = {
  type: '类型', // 必须要符合 ArcoBtnProps 的类型，否则会报错
  style: {},
};
```

### 类型索引（keyof）🍉

- 语法: `keyof T`
- 作用: 遍历获取接口 `interface` 中的所有 **公共属性**，将它们组成一个 **联合类型**;

```ts title="代码示例 - 壹" showLineNumbers
interface ArcoBtnProps {
  type: string;
  style: React.CSSProperties;
}

type BtnKeys = keyof ArcoBtnProps; // 等同于 type BtnKeys = 'type' | 'style'

const value: BtnKeys = 'type';
```

```ts title="代码示例 - 贰 🐸" showLineNumbers
// 结合 typeof 将一个对象中的属性组成 联合类型，因为在 ts 中，typeof 会将一个变量转成其对应的类型
const person = { name: 'dino', age: 25 };

type PersonTypes = typeof person; // 等同于 type PersonTypes = { name: string, age: number }

type FiledTypes = keyof typeof person; // 等同于 type FiledTypes = 'name' | 'age'

const value: FiledTypes = 'name';
```

### 类型约束（extends）🍉

- 语法: `T extends K`
- 作用: 如果在接口 `interface` 中使用，其作用表示为 **继承**; 如果在 泛型 中使用，其主要作用是对泛型加以约束;

```ts title="代码示例 - 壹" showLineNumbers
type BaseType = string | number | boolean;

// 该函数的参数类型 T 只能符合 BaseType 类型
const func = <T extends BaseType>(params: T) => {
  console.log('params: ', params);
};

func('🍊 🍊');
```

```ts title="代码示例 - 贰 🐸" showLineNumbers
// 如果函数传入的参数是一个对象中的某个属性，由于不确定是哪个属性，这时可以结合 keyof 使用，来对类型进行约束
const person = { name: 'dino', age: 25 };

const func = <T extends keyof typeof person>(fieldName: keyof typeof person) => {
  console.log('fieldName: ', fieldName);
};

func('name'); // 只能以 person 对象中的某个属性为参数
```

### 类型映射（in）

- 语法: `P in keyof T`
- 作用: 结合 `keyof`，对一个联合类型进行遍历;

```ts title="代码示例 🐸" showLineNumbers
// 实现一个 Readlony 工具类型，将一个接口中所有属性的类型，都变成 只读
type ReadOnlyType<T> = {
  readonly [P in keyof T]: T[P];
};

// 使用该工具类型
interface PersonTypes {
  name: string;
  age: number;
}

type ReadOnlyPerson = ReadOnlyType<PersonTypes>;
// 等同于 type ReadOnlyPerson = { readonly name: string; readonly age: number }

const person: ReadOnlyPerson = { name: 'dino', age: 25 };
person.name = '🍊'; // 会报错，Cannot assign to 'name' because it is a read-only property
```

### 类型谓词（is）

- 语法: `parameterName is Type`
- 作用: 主要在函数中使用，`parameterName` 是函数的参数名，判断该参数是否为 `Type` 类型;

```ts title="代码示例" showLineNumbers
// 使用 class 定义类型
class Bird {
  fly() {
    console.log('Bird flying');
  }
}

class Fish {
  swim() {
    console.log('Fish swimming');
  }
}

// 定义一个函数，用来判断传来的参数是否为 Bird 类型
const isBird = (bird: Bird | Fish): bird is Bird => {
  return !!(bird as Bird).fly;
};

const start = (pet: Bird | Fish) => {
  // if (pet instanceof Bird) // 只针对构造函数 / class类 使用
  // 或
  if (isBird(pet)) {
    pet.fly();
  } else {
    pet.swim();
  }
  // 如果不采用上述方式实现，那就得采用 as 的方式，但那样写法上会比较冗余，如下
  //   if ((pet as Bird).fly) {
  //     (pet as Bird).fly();
  //   } else {
  //     (pet as Fish).swim();
  //   }
};

const bird = new Bird();
const fish = new Fish();
start(bird);
```

### 通过索引访问类型

- 语法: `T[K]`
- 作用: 类似于 js 访问对象属性，使用该方式可以访问到 一个接口中属性的类型 是什么;

```ts title="代码示例" showLineNumbers
interface PersonTypes {
  name: string;
  age: number;
}

type NameType = PersonTypes['name']; // string

const v: NameType = 12; // 会报错，Type 'number' is not assignable to type 'string'
```

## 工具类型（TS 内置）

### Partial（可选）

`Partial<T>` 的作用是将一个接口类型中的所有属性都变成 **可选的**;

```ts title="代码实现" showLineNumbers
// 源码
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 使用
interface Person {
  name: string;
  age: number;
}

type NewPerson = Partial<Person>; // type NewPerson = { name?: string; age?: number; }
```

### Readlony（只读）

`Readlony<T>` 的作用是将一个接口类型中的所有属性都变成 **只读的**;

```ts title="代码实现" showLineNumbers
// 源码
type Readlony<T> = {
  readonly [P in keyof T]: T[P];
};
```

### Required（必选）

`Required<T>` 的作用是将一个接口类型中的所有属性都变成 **必选的**;

```ts title="代码实现" showLineNumbers
// 源码
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

### Pick（提取）🍉

`Pick<T, K>` 的作用是 **提取** 接口类型中的某几个属性，组成一个新的类型;

```ts title="代码实现" showLineNumbers
// 源码
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 使用
interface Person {
  name: string;
  age?: number;
  favorite: string;
}

type NewPerson = Pick<Person, 'name'>; // type NewPerson = { name: string }
type NewPerson = Pick<Person, 'name' | 'favorite'>; // type NewPerson = { name: string; favorite: string; }
```

### Omit（过滤）🍉

`Omit<T, K>` 的作用和 `Pick<T, K>` 相反，是 **过滤** 掉接口类型中的某几个属性，将剩余的属性组成一个新的类型;

```ts title="代码实现" showLineNumbers
// 源码
type Omit<T, K extends string | number | symbol> = {
  [P in Exclude<keyof T, K>]: T[P];
};

// 使用
interface Person {
  name: string;
  age: number;
  jobs: string;
}

type NewPerson = Omit<Person, 'name'>; // type NewPerson = { age: number; jobs: string; }
type NewPerson = Omit<Person, 'name' | 'jobs'>; // type NewPerson = { age: number }
```

### Record（属性映射）🍉

`Record<T, K>` 的作用是用来 **映射类型**，主要作用于 **对象**，比如一个对象的类型已经被定义好了，但是在初始化的时候给他赋予一个空值或在传参时不确定其内容，可以使用该工具类型;

```ts title="代码实现" showLineNumber
// 源码
type Record<K extends string | number | symbol, T> = {
  [P in K]: T;
};

// 使用
interface Person {
  name: string;
  age: number;
}

const PersonList = [
  { name: 'dino', age: 25 },
  { name: '脸脸', age: 27 },
];

const personMap: Record<string, Person> = {}; // 使用 Record 类型
const personMap: Record<string, Person> = { '': { name: '', age: 0 } }; // 设置初始值

PersonList.map((item) => {
  personMap[item.name] = item;
});
```

### Exclude（过滤）

`Exclude<T, U>` 主要用于 **联合类型**，其作用是 **剔除** `T` 类型中符合 `U` 类型的内容（简言之 **过滤相同的，保留不同的**），保留剩下的内容，组成一个新的类型;

```ts title="代码实现" showLineNumber
// 源码
type Exclude<T, U> = T extends U ? never : T;

// 使用 - 壹
type PersonAttr = 'name' | 'age' | 'class' | 'school';
type StudentAttr = 'name' | 'age' | 'exams';

type Student = Exclude<PersonAttr, StudentAttr>; // 'class' | 'school'

// 使用 - 贰
interface Person {
  name: string;
  age: number;
  favorite: string;
  jobs: string;
}

interface PersonFirst {
  name: string;
  age: number;
}

type NewPerson = Exclude<keyof Person, keyof PersonFirst>; // 'favorite' | 'jobs'
```

### Extract（过滤）

`Extract<T, U>` 主要用于 **联合类型**，其作用和 `Exclude<T, U>` 刚好相反，**过滤不同的，保留相同的**;

```ts title="代码实现" showLineNumber
// 源码
type Extract<T, U> = T extends U ? T : never;

// 使用
type PersonAttr = 'name' | 'age' | 'class' | 'school';
type StudentAttr = 'name' | 'age' | 'exams';

type Student = Exclude<PersonAttr, StudentAttr>; // 'name' | 'age'
```

### InstanceType（构造函数）

`InstanceType<T>` 的作用是获取 class 构造函数（变量声明）的返回类型，也就是用来定义 `new` 出来的实例对象的类型;

```ts title="代码实现" showLineNumber
// 源码
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : any; // infer P 表示泛型 P 是一个待推断类型

// 使用
const Person = class {
  // 变量声明空间
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
};

type NewPerson = InstanceType<typeof Person>; // type NewPerson = Person

const person: NewPerson = new Person('dino', 25);
```

### NonNullable（过滤）

`NonNullable<T>` 会 **过滤空类型**，如 `null`、`undefined`、`never` 类型，不会剔除 `void`、`unknown` 类型;

```ts title="代码实现" showLineNumber
// 源码
type NonNullable<T> = T & {};
// 或
type NonNullable<T> = T extends null | undefined ? never : T;

// 使用
type StudentAttr = 'name' | 'age' | null | undefined;

type Student = NonNullable<StudentAttr>; // 'name' | 'age'
```

### Uppercase & Lowercase

- `Uppercase<T>` 主要用于 **联合类型**，将定义的字符串单词都转为 **大写**，组成一个新的类型;
- `Lowercase<T>` 的作用同上，不同之处在于其将字符串单词转为 **小写**;

```ts title="代码示例" showLineNumber
type StudentAttr = 'NAME' | 'age';

type NewPerson = Uppercase<StudentAttr>; // 'AGE' | 'NAME'
type NewPerson = Lowercase<StudentAttr>; // 'age' | 'name'
```

### Capitalize & Uncapitalize

- `Capitalize<T>` 主要用于 **联合类型**，将定义的字符串类型转成 **首字母大写** 的字符串，组成一个新的类型;
- `Uncapitalize<T>` 的作用同上，不同之处在于其转成 **首字母小写** 的字符串;

```ts title="代码示例" showLineNumber
type StudentAttr = 'Name' | 'age';

type NewPerson = Capitalize<StudentAttr>; // 'Name' | 'Age'
type NewPerson = Uncapitalize<StudentAttr>; // 'name' | 'age'
```

## 工具类型（自定义）

### Tuple（元祖）

`Tuple<T1, T2, ...>` 的作用是获取一个由 `string` 或 `number` 类型组成的 **元祖类型** 的数组;

```ts title="代码实现" showLineNumber
// 代码（这里只能用变量声明，不能用 类型声明 type）
export const Tuple = <T extends (string | number)[]>(...args: T) => args;

// 使用
const DirectionTuple = Tuple('left', 'right'); // DirectionTuple 的类型为 元祖类型 ["left", "right"]

type Direction = typeof DirectionTuple[number]; // 将 元祖类型 转为 联合类型，type Direction = 'left' | 'right'
```

### ElementOf（元祖）

`ElementOf<T>` 的作用是将一个 元祖类型 转换成 **联合类型**;

```ts title="代码实现" showLineNumber
// 代码 - 具体代码参考自 https://stackoverflow.com/questions/59184570/get-index-type-of-an-array-literal/59187769#59187769
export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never;

// 使用
const DirectionTuple = ['left', 'right'] as const; // 通过 const 断言 将 DirectionTuple 由原来 string[] 类型转为 只读的元祖类型 readonly ["left", "right"]

type Direction = ElementOf<typeof DirectionTuple>; // type Direction = 'left' | 'right'
```

## 参考资料

- 👉 [一份不可多得的 TS 学习指南 - 掘金](https://juejin.cn/post/6872111128135073806)
- 👉 [30 张图带你快速了解 TypeScript - 掘金](https://juejin.cn/post/7036266588227502093)
- 👉 [TypeScript 高级类型及用法 - Github](https://github.com/beichensky/Blog/issues/12)
- 👉 [TypeScript 内置类型一览 - 掘金](https://juejin.cn/post/7040300769072906277)
- 👉 [看懂复杂的 TypeScript 泛型运算 - 微信](https://mp.weixin.qq.com/s/axfKKGHfxy3gZbKYEFjnkQ)
