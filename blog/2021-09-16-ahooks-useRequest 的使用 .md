---
slug: ahooks-useRequest
title: ahooks 中 useRequest 的使用
author: 勺子
author_title: 前端(●—●) @ 无业游民
author_url: https://github.com/zhgt-shaozi/zhgt-shaozi.github.io
author_image_url: /static/img/logo.svg
tags: [react, ahooks]
---

```jsx
const {
  data, // 返回数据
  request, // 发起请求
  run, // 发起请求，会执行 request
  pagination, // 分页数据，paginated 为 true 时，该方法才会有数据
  loading, // 接口 pedding 状态
  error, // 接口抛错
  cancel, // 取消请求
  refresh, // 使用上一次的 params 重新发起请求
  mutate,
  fetches,
} = useRequest(services, {
  manual: true, // 是否开启手动请求接口，默认为 true，设置为 false 时会在初始化时发起请求
  paginated: true, // 是否开启分页模式
  defaultPageSize: 10, // 默认请求分页的 pageSize
  defaultParams: { ...params }, // manual 为 false 时，发起请求的默认参数
  refreshDeps: [state], // 重置请求，只要 refreshDeps 中定义的状态发生改变，就会将其他参数恢复为 默认值，重新发起请求
  onSuccess: (data, params) => {}, // 请求成功回调，参数为 data - 返回值，params - 请求参数
  onError: (error, params) => {}, // 请求失败回调，参数为 error - 返回的错误信息，params - 请求参数
});

react 同时操作多个数组时，如果其中有一个进行了 setState，则同时会改变其他数组的状态，因为 setState 重新触发了组件渲染，导致其他数组的状态不用通过 setState 就能发生改变。

react 改变数组的状态时，可以通过 useState 传递一个回调函数来改变状态，函数中的参数是原数组，可以改变完状态之后直接 return 该数组；
但是在有些时候，比如 定时改变数组状态 或改变 table 中某个数据的状态，需要将该数组进行解构，或者给该数组进行克隆，使用 JSON.parse(JSON.stringify(...))，生成一个新数组，再进行操作后 return 该数组；

react table 翻页+多选，对多选数据进行记录？实现

react 列表页 -> 详情页，在详情页中更改状  态后返回列表页，列表中对应数据状态也跟着改变？实现
```
