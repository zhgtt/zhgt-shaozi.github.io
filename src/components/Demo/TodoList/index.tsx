import React, { useEffect, useState } from 'react';
import { Input, Button, Table, Space, Link as ArcoLink } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import useDeepCompareEffect from 'use-deep-compare-effect'; // useEffect 的深比较，用于依赖项为引用类型
import { EditableRow, EditableCell } from './Editable'; // 编辑表格中数据所需的组件
import styles from './styles.module.scss';

interface DataTypes {
  value: string;
  key: number;
  isTop?: boolean; // 是否置顶
  order: number; // 元素顺序
  editable?: boolean; // 是否可编辑
}

// 随机数
const generateRandomKey = () => Math.ceil(Math.random() * 10000);

// 默认数据
const InitialData = [
  { value: '今天你学习了吗？🤔', key: generateRandomKey(), order: 1 },
  { value: '今天你 emo 了吗？😑', key: generateRandomKey(), order: 2 },
  { value: '每天都要 普却信！😶', key: generateRandomKey(), order: 3 },
];

const TodoList: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [dataSource, setDataSource] = useState<DataTypes[]>(InitialData);
  const [filterTopData, setFilterTopData] = useState<DataTypes[]>([]); // 非置顶数据

  useDeepCompareEffect(() => {
    // 🍋 order 是每一条数据的顺序，它会随着数据的改变而改变，以 index 为基准进行排序；
    // 🍋 若不存在置顶的数据，数据的 order 以 index 为基准
    // 🍋 若存在置顶的数据，数据的 order 不可变，保持原状
    if (dataSource.length > 0) {
      console.log('dataSource: ', dataSource);
      setFilterTopData(dataSource.filter((item) => !item.isTop)); // 因为操作之后，newData 的数据顺序已被打乱，需要重新赋值
    }
  }, [dataSource]);

  // 添加
  const handleAdd = () => {
    if (!inputValue) return;
    // 🍋 若列表数据中只剩下了置顶数据，将置顶数据的 order 重置为从 1 开始排序；
    let newData = [...dataSource];
    const len = newData.length;
    const IsAllTopData = len > 0 && newData.every((item) => item.isTop); // 是否全部都为置顶数据
    if (IsAllTopData) {
      newData = newData.map((item, index) => ({ ...item, order: index + 1 }));
    }
    setDataSource([...newData, { value: inputValue, key: generateRandomKey(), order: len + 1 }]);
    setInputValue('');
  };

  // 删除
  const handleRemove = (record: DataTypes, index: number) => {
    const { key } = record;
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  // 编辑
  function handleEdit(row) {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key); // 返回查找到的数据的 索引
    newData.splice(index, 1, { ...newData[index], ...row });
    setDataSource(newData);
  }

  // 移动
  const handleMove = (_record, index: number, type: 'up' | 'down') => {
    const newData = [...dataSource];
    const current = { ...newData[index] }; // 更改引用地址
    const prev = { ...newData[index - 1] };
    const next = { ...newData[index + 1] };
    const IsHasTopData = newData.some((item) => item.isTop); // 判断是否存在置顶的数据

    switch (type) {
      case 'up':
        if (index === 0) return;
        // 如果存在置顶数据，将上一条数据的 order 和当前数据的 order 进行互换，以避免在取消置顶时，将已经换了位置的数据的顺序又打乱
        if (IsHasTopData) {
          newData[index - 1].order = current.order;
          newData[index].order = prev.order;
        }
        [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]]; // 利用 es6 解构进行位置互换
        break;

      case 'down':
        if (index + 1 === dataSource.length) return;
        // 如果存在置顶数据，将下一条数据的 order 和当前数据的 order 进行互换
        if (IsHasTopData) {
          newData[index + 1].order = current.order;
          newData[index].order = next.order;
        }
        [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]];
        break;
    }

    setDataSource(() => {
      // 若不存在置顶数据，不管怎么移动数据的位置，它们的顺序都是自身的 index + 1
      if (IsHasTopData) return newData;
      return newData.map((item, index) => ({ ...item, order: index + 1 }));
    });
  };

  // 置顶
  const handleTop = (index: number) => {
    const newData = [...dataSource];
    newData[index] = { ...newData[index], isTop: true };
    // 删除当前元素，并将该元素添加到数组的开头
    newData.unshift(newData.splice(index, 1)[0]);
    setDataSource(newData);
  };

  // 取消置顶
  const handleCancelTop = (index: number) => {
    const newData = [...dataSource];
    newData[index].isTop = false;

    const topData = newData.filter((item) => item.isTop);
    const unTopData = newData.filter((item) => !item.isTop);
    // 🍋 取消置顶时，将置顶的数据还原，也就是将非置顶的数据按照原来的顺序（order）进行排序
    // 🍋 Array.sort() 的参数为函数时，next 表示下一个数据, prev 表示 上一个数据，结果为 正，表示从小到大排序；结果为 负，表示从大到小排序
    if (unTopData.length > 1) {
      unTopData.sort((next, prev) => next?.order - prev?.order);
    }
    setDataSource([...topData, ...unTopData]);
  };

  const columns = [
    { title: '序号', width: 70, render: (_col, _record, index) => <span>{index + 1}</span> },
    { title: '待办事项', dataIndex: 'value', editable: true },
    {
      title: '操作',
      width: '34%',
      render: (_col, record: DataTypes, index: number) => (
        <Space>
          {/* 置顶的数据不存在 ”上移”，“下移”，“置顶” 操作 */}
          {/* 第一条数据(非置顶)不存在 “上移” 操作；最后一条数据不存在 “下移” 操作 */}
          {!record?.isTop && (
            <Space>
              <ArcoLink
                onClick={() => handleMove(record, index, 'up')}
                disabled={index === 0 || filterTopData[0]?.key === record.key}
              >
                上移
              </ArcoLink>
              <ArcoLink
                onClick={() => handleMove(record, index, 'down')}
                disabled={index + 1 === dataSource.length}
              >
                下移
              </ArcoLink>
              <ArcoLink onClick={() => handleTop(index)}>置顶</ArcoLink>
            </Space>
          )}
          {record?.isTop && <ArcoLink onClick={() => handleCancelTop(index)}>取消置顶</ArcoLink>}
          <ArcoLink onClick={() => handleRemove(record, index)}>删除</ArcoLink>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className='mb-3'>
        <Input
          allowClear
          placeholder='输入待办事项，回车(Enter)进行添加'
          style={{ width: '60%' }}
          value={inputValue}
          onChange={(val) => setInputValue(val)}
          onPressEnter={handleAdd}
        />
        <Button type='primary' shape='circle' className='ml-3' onClick={handleAdd}>
          <IconPlus />
        </Button>
      </div>
      <Table
        data={dataSource}
        border={{ wrapper: true, cell: true }}
        pagination={false} // 分页
        stripe={false} // 斑马纹
        rowClassName={(record, _index) => record?.isTop && styles.topRow}
        components={{ body: { row: EditableRow, cell: EditableCell } }} // 覆盖原生表格，将组件集成在表格中
        columns={columns.map((item) => ({
          ...item,
          ...(item?.editable && { onCell: () => ({ onHandleSave: handleEdit }) }), // 设置单元格自身的各项事件回调
        }))}
      />
    </>
  );
};

export default TodoList;
