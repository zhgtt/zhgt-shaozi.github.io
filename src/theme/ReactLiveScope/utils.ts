// 获取数组中随机一项
const _randomArr = (arr: (string | number | boolean)[]) => {
  const len = arr.length;
  return arr[Math.floor(Math.random() * len)];
};

// 统计元素在数组中出现的次数
const _totalObj = (arr: (string | number)[]) => {
  return arr.reduce((pre, next) => {
    if (pre[next]) {
      pre[next]++;
    } else {
      pre[next] = 1;
    }
    return pre;
  }, {});
};

// 数组转为树结构
interface TreeDataTypes {
  pid?: number;
  area_code: number;
  children?: TreeDataTypes[];
  [key: string]: any;
}
const _dataToTree = (arr: TreeDataTypes[]) => {
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

// 修改树结构属性名
interface UpdateTreeDataTypes {
  code: number;
  name: string;
  childList?: UpdateTreeDataTypes[];
  [key: string]: any;
}
const _updateTreeKey = (arr: UpdateTreeDataTypes[]) => {
  const str = JSON.stringify(arr)
    .replace(/"code"/g, '"key"')
    .replace(/"name"/g, '"label"')
    .replace(/"childList"/g, '"children"');

  return JSON.parse(str);
};

// 获取树结构第一个节点下的最后一级节点
const _findTreeNode = (arr: any[], code: string | number) => {
  const container: any[] = [];
  
};

const utils = { _randomArr, _totalObj, _dataToTree, _updateTreeKey };

export default utils;
