/**
 * @description JavaScript 工具函数
 */

import { cloneDeep, isEqual, shuffle, sum, sumBy, uniqBy, groupBy, isEmpty } from 'lodash';
import qs from 'query-string';

// 🍋 获取数组中随机一项
export const _randomArr = (arr: (string | number | boolean)[]) => {
  const len = arr.length;
  return arr[Math.floor(Math.random() * len)];
};

// 🍋 统计元素在数组中出现的次数
export const _totalObj = (arr: (string | number)[]) => {
  return arr.reduce((pre, next) => {
    if (pre[next]) {
      pre[next]++;
    } else {
      pre[next] = 1;
    }
    return pre;
  }, {});
};

// 🍋 数组转为树结构
interface TreeDataTypes {
  pid?: number;
  area_code: number;
  children?: TreeDataTypes[];
  [key: string]: any;
}
export const _dataToTree = (arr: TreeDataTypes[]) => {
  const node = arr.reduce((prev, cur) => {
    prev[cur['area_code']] = cur;
    return prev;
  }, {});

  return arr.reduce((prev, cur) => {
    const parentId = cur?.pid;
    const parentObj = node?.[parentId];
    if (parentObj) {
      parentObj && parentObj.children ? parentObj.children.push(cur) : (parentObj.children = [cur]);
    }
    !parentId && prev.push(cur);
    return prev;
  }, []);
};

// 🍋 树结构转数组
export const _treeToData = (tree: any[], result = [], level = 0) => {
  tree.forEach((item) => {
    result.push(item);
    item.level = level + 1;
    item.children && _treeToData(item.children, result, level + 1);
  });
  return result;
};

// 🍋 修改树结构属性名
interface UpdateTreeDataTypes {
  code: number;
  name: string;
  childList?: UpdateTreeDataTypes[];
  [key: string]: any;
}
export const _updateTreeKey = (tree: UpdateTreeDataTypes[]) => {
  const str = JSON.stringify(tree)
    .replace(/"code"/g, '"key"')
    .replace(/"name"/g, '"label"')
    .replace(/"childList"/g, '"children"');

  return JSON.parse(str);
};

// 🍋 获取树结构节点
interface TreeListTypes {
  code: string;
  name: string;
  children?: TreeListTypes[];
  [key: string]: any;
}
export const _findTreeNode = (tree: TreeListTypes[], func: (item: TreeListTypes) => boolean) => {
  for (const item of tree) {
    if (func(item)) return item;
    if (item.children) {
      const res = _findTreeNode(item.children, func);
      if (res) return res;
    }
  }
  return null;
};

// 🍋 获取树结构第一个节点的最后一级
export const _getTreeFirstNode = (tree: TreeListTypes[]) => {
  const group: TreeListTypes[] = [];
  const loop = (org) => {
    if (!org?.children || !org?.children?.length) {
      group.push(org);
    } else {
      loop(org.children?.[0]);
    }
  };
  loop(tree?.[0]);
  return group;
};

// 🍋 过滤树结构节点
export const _filterTreeNode = (tree: TreeListTypes[], func: (item: TreeListTypes) => boolean) => {
  return tree
    .map((item) => ({ ...item }))
    .filter((node) => {
      node.children = node.children ? _filterTreeNode(node.children, func) : [];
      return func(node) || (node.children && node.children.length);
    });
};

// 🍋 查找树结构节点路径
export const _findTreeNodePath = (
  tree: TreeListTypes[],
  func: (item: TreeListTypes) => boolean,
  path: string[] = []
) => {
  if (!tree) return [];
  for (const item of tree) {
    path.push(item.key);
    if (func(item)) return path;
    if (item.children) {
      const res = _findTreeNodePath(item.children, func, path);
      if (res.length) return res;
    }
    path.pop();
  }
  return [];
};

// 🍋 查找树结构多个节点路径
export const _findTreeManyNodePath = (
  tree: TreeListTypes[],
  func: (item: TreeListTypes) => boolean,
  path: string[] = [],
  result: string[] = []
) => {
  for (const item of tree) {
    path.push(item.key);
    func(item) && result.push([...path].join(','));
    item.children && _findTreeManyNodePath(item.children, func, path, result);
    path.pop();
  }
  return result;
};

// 🍋 计算树结构层级数
export const _getMaxLevel = (tree: any[]) => {
  let maxLevel = 0;
  const loop = (data, level) => {
    data.forEach((item) => {
      item.level = level;
      if (level > maxLevel) maxLevel = level;
      if (item?.children && item?.children?.length) {
        loop(item.children, level + 1);
      }
    });
  };
  loop(tree, 1);
  return maxLevel;
};

// 🍋 根据指定值进行过滤
export const _dataFilter = (arr: any[], codeList: string[]) => {
  return arr.filter((item) => !codeList.includes(item?.code));
};

// 🍋 普通数组的去重
export const _unique = (arr: any[]) => {
  return arr.reduce((prev, cur) => {
    return prev.includes(cur) ? prev : [...prev, cur];
  }, []);
};

// 🍋 对象数组的去重
export const _uniqueObj = (arr: any[], prop: string) => {
  const obj = {};
  return arr.reduce((prev, cur) => {
    obj[cur[prop]] ? '' : (obj[cur[prop]] = true && prev.push(cur));
    return prev;
  }, []);
};

// 🍋 对象数组的分组（一对多）
export const _groupByObj = (arr: any[], prop: string) => {
  return arr.reduce((prev, cur) => {
    (prev[cur[prop]] = prev[cur[prop]] || []).push(cur);
    return prev;
  }, {});
};
export const _groupByArray = (arr: any[]) => {
  const dest = [];
  const groups = {};
  arr.forEach((item) => {
    const { groupName, groupCode } = item;
    if (!groups[groupCode]) {
      groups[groupCode] = { groupName, groupCode, children: [] };
      dest.push(groups[groupCode]);
    }
    groups[groupCode].children.push(item);
  });
  return dest;
};

// 🍋 对象数组的分组（多对多）
export const _groupByManyObj = (arr: any[], prop: string) => {
  return arr.reduce((prev, item) => {
    item['groupList'].forEach((each) => {
      (prev[each[prop]] = prev[each[prop]] || []).push(item);
    });
    return prev;
  }, {});
};
export const _groupByManyArray = (arr: any[]) => {
  const dest = [];
  const groups = {};
  arr.forEach((item) => {
    item['groupList'].forEach(({ groupName, groupCode }) => {
      if (!groups[groupCode]) {
        groups[groupCode] = { groupName, groupCode, children: [] };
        dest.push(groups[groupCode]);
      }
      groups[groupCode].children.push(item);
    });
  });
  return dest;
};

// 🍋 对象的浅拷贝
export const _cloneByObj = (obj: { [key: string]: any }) => {
  return { ...obj };
};

// 🍋 数组的浅拷贝
export const _cloneByArray = (arr: any[]) => {
  return [...arr];
};

// 🍋 深拷贝
const isObject = (target) => {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
};
const getType = (target): string => {
  return Object.prototype.toString.call(target);
};
const getInit = (target) => {
  return new target.constructor();
};
const forEach = (array: any[], iteratee: (v: any, i: number) => void) => {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
};
export const _deepClone = (target: any, map = new WeakMap()) => {
  if (target === null) return null;
  if (!isObject(target)) return target;
  if (getType(target) === '[object Date]') return new Date(target);
  if (getType(target) === '[object Regexp]') return new RegExp(target);

  // 初始化被克隆的对象
  const cloneTarget = getInit(target);

  // 处理循环引用
  if (map.get(target)) return map.get(target);
  map.set(target, cloneTarget);

  const keys = getType(target) === '[object Object]' ? Object.keys(target) : undefined;
  forEach(keys || target, (value, key) => {
    if (keys) key = value;
    cloneTarget[key] = _deepClone(target[key], map);
  });
  // for (const key in target) {
  //   if (Object.prototype.hasOwnProperty.call(target, key)) {
  //     cloneTarget[key] = _deepClone(target[key], map);
  //   }
  // }

  return cloneTarget;
};

// 🍋 深度比较
export const _isEqual = (origin, target, originStack = [], targetStack = []): boolean => {
  if (origin === target) return true;
  if (origin !== origin) return target !== target;

  if (getType(origin) !== getType(target)) return false;
  switch (getType(origin)) {
    case '[object Date]':
      return +origin === +target;
    case '[object RegExp]':
      return '' + origin === '' + target;
  }

  if (!origin || !target || (typeof origin !== 'object' && typeof target !== 'object')) {
    return origin === target;
  }

  const keys = Object.keys(origin);
  if (keys.length !== Object.keys(target).length) return false;
  return keys.every((k) => _isEqual(origin[k], target[k]));
};

// 多条件筛选数据
export const _productFilter = (data: any[], params = {}) => {
  const Keys = Object.keys(params);

  return data.filter((item) => Keys.every((key) => item[key] && item[key].includes(params[key])));
};

// 求和
export const _getSumBy = (arr: any[], prop: string) => {
  return arr.reduce((prev, cur) => prev + cur[prop], 0);
};

// 乱序
export const _shuffle = (arr: Array<string | number>) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const m = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[m]] = [arr[m], arr[i]];
  }
  return arr;
};

// 金钱格式化
export const _formatCash = (value: string) => {
  if (!value) return null;
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 获取随机颜色色值
export const _randomColor = () => {
  const color = Math.floor(Math.random() * 0xffffff);
  return `#${color.toString(16).padEnd(6, '0')}`.toUpperCase();
};

// 生成随机字符串
export const _randomString = (len: number) => {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890';
  const strLen = chars.length;

  let randomStr = '';
  for (let i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * strLen)); // String.charAt(index) 返回指定下标位置的字符
  }

  return randomStr;
};

// 转成中文大写金额
export const _digitUppercase = (num: number) => {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  let money = Math.abs(num);
  let s = '';

  // 通过遍历 fraction，来获取 & 处理 num 后的小数位是几，并转成相应的金额
  for (let i = 0; i < fraction.length; i++) {
    // Math.pow(x, y) 表示 x 的 y 次幂(方)
    s += (digit[Math.floor(money * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, ''); // 使用 replace 将以零为开头的金额替换成空
  }

  s = s || '整';
  money = Math.floor(money); // 取整，截取掉小数位

  // 双重遍历 unit 中的两个数组，来获取 & 处理整数位，并转成响应的金额
  for (let i = 0; i < unit[0].length && money > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && money > 0; j++) {
      p = digit[money % 10] + unit[1][j] + p; // 获取 & 处理整数的最后一位，并和上一个 p 值相加
      money = Math.floor(money / 10); // 每次都从后开始缩减一个整数位，如 102 处理成 10
    }
    console.log('p: ', p);
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s; // 将空值替换成 '零'，将以 零*零 为结尾的字符替换成空，如 '零拾零'
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
};
