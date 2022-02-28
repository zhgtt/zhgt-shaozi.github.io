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
