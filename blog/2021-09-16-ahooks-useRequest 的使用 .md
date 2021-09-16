---
slug: ahooks-useRequest
title: ahooks 中 useRequest 的使用
author: 勺子
author_title: 前端(●—●) @ 无业游民
author_url: https://github.com/zhgt-shaozi/zhgt-shaozi.github.io
author_image_url: /static/img/logo.svg
tags: [ahooks]
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
```
