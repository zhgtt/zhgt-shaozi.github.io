/**
 * @description 🍋 Index.tsx
 */

import React, { useState } from 'react';
import { Pagination, List, Tag, Space } from '@arco-design/web-react';
import dayjs from 'dayjs';

const year = dayjs().year(); // 获取系统年份
const month = dayjs().month() + 1; // 获取系统月份
const days = dayjs().daysInMonth(); // 获取系统月有多少天

// 获取随机天气
const RandomWeather = () => {
  const weathers = ['🌪', '🌈', '🌤', '⛅️', '🌥', '🌦', '🌧', '⛈', '🌩', '🌨', '❄️'];
  const len = weathers.length;
  return weathers[Math.floor(Math.random() * len)];
};

// 元数据
const metadata = [];
for (let i = 1; i <= days; i++) {
  const date = dayjs(`${year}-${month}-${i}`).format('YYYY 年 MM 月 DD 日');
  metadata.push({ id: i + 1, title: `${date}，天气 ${RandomWeather()}` });
}

const ListPagination: React.FC = () => {
  const total = metadata.length;
  const defaultPageSize = 5;

  const [dataSource, setDataSource] = useState(metadata.slice(0, defaultPageSize)); // 每页的数据项，默认展示前 5 条数据
  const [current, setCurrent] = useState(1); // 当前第几页
  const [pageSize, setPageSize] = useState(defaultPageSize); // 每页显示几条数据

  const handleChange = (num, size) => {
    setCurrent(num);
    setPageSize(size);

    setDataSource(metadata.slice((num - 1) * size, num * size)); // slice(start, end)；模拟分页，获取分页后的数据项
  };

  return (
    <Space direction='vertical' size={16} style={{ width: '100%' }}>
      <List
        size='small'
        header='天气列表 🌝'
        dataSource={dataSource}
        style={{ width: '60%', maxHeight: 248, overflow: 'auto' }}
        render={(item, index) => (
          <List.Item key={index}>
            <Space align='center'>
              {/* 计算分页后的每条数据的 序号（多用于异步接口返回的数据） */}
              <Tag size='small' bordered color='blue'>
                {(current - 1) * pageSize + index + 1}{' '}
              </Tag>
              {item.title}
            </Space>
          </List.Item>
        )}
      />

      <Pagination
        showTotal
        total={total}
        current={current}
        onChange={handleChange}
        pageSize={pageSize}
        showJumper
        sizeCanChange
        sizeOptions={[5, 10, 20]}
      />
    </Space>
  );
};

export default ListPagination;
