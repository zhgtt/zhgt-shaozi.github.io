/**
 * @description 自定义 Hooks 钩子函数
 */

import React, { useRef, DependencyList } from 'react'; // DependencyList 表示依赖数据，它只是一个类型：只读的数组 ReadonlyArray<any>
import { isEqual } from 'lodash';
import { _isEqual } from '@site/src/utils/tools-fun';

// 解决 useEffect 钩子浅比较的问题，主要用于 引用类型（当依赖项为引用类型时，又改变该引用类型时，必然会引起死循环）
// 1. 使用 useRef()
// 2. 将依赖项转换成字符串 JSON.stringify()
// 3. 安装第三方插件：react-use / use-deep-compare-effect
// 当 useEffect 的依赖为引用类型时，使用该 hook，相当于重新创建了一个数据，用来存放 value，再和 value 进行深比较，以免进行死循环
export const usePrevious = (value: DependencyList | undefined) => {
  const ref = useRef<DependencyList | undefined>();

  // 进行深比较，如果两个值不同，则返回最新的 value；如果相同，返回 ref.current，则依赖项中的 ref.current 没有发生变化，这样 useEffect 不会触发更新，以免陷入死循环
  if (!isEqual(ref.current, value)) {
    ref.current = value;
  }

  return ref.current;
};
