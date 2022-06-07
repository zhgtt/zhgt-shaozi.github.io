/**
 * @description 🍋 Editable.tsx
 */

import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { Input, Form } from '@arco-design/web-react';
import type { FormInstance } from '@arco-design/web-react/es/Form';
import clsx from 'clsx';
import styles from './styles.module.scss';

const FormItem = Form.Item;

// 🍋 创建一个上下文，实现跨层级的组件数据传递（生产者消费者模式）
const EditableContext = React.createContext<{ form?: FormInstance }>({});

interface EditableRowProps {
  className?: string;
  record: any; // 表格中每一行的数据
  [key: string]: any;
}

export const EditableRow: React.FC<EditableRowProps> = (props, ref) => {
  const { children, record, className, ...rest } = props;

  const [form] = Form.useForm(); // 获取 Form 的实例方法

  // 🍋 <Context.Provider /> 是生产者，通常是一个父节点，包裹着的子组件就是消费者; value 属性表示要传递的数据
  return (
    <EditableContext.Provider value={{ form }}>
      <Form
        style={{ display: 'table-row' }}
        children={children}
        form={form}
        wrapper='tr' // 配置最外层标签
        wrapperProps={rest} // 传给 wrapper 的参数
        className={clsx(className, styles.editableRow)}
      />
    </EditableContext.Provider>
  );
};

interface EditableCellProps {
  className?: string;
  rowData: any; // 表格中每一行的数据
  column: any; // 表格中每一列的属性
  onHandleSave: (v: any) => void;
  [key: string]: any;
}

export const EditableCell: React.FC<EditableCellProps> = (props) => {
  const { children, className, rowData, column, onHandleSave } = props;

  const { form } = useContext(EditableContext); // 获取上下文

  const ref = useRef(null);
  const refInput = useRef(null);

  const [editing, setEditing] = useState(false); // 编辑状态

  // 监听编辑状态，editing 为 true 时，使 input 自动聚焦
  useEffect(() => {
    editing && refInput.current && refInput.current.focus();
  }, [editing]);

  // 创建一个全局的 点击事件，点击除自身外的任意地方，使 input 失焦
  const handleClick = useCallback(
    (event) => {
      // 🍋 node.contains(otherNode) 来验证 node 节点中是否包含 otherNode 节点，返回 boolean; 可以用来判断当前元素是否为本身
      // 🍋 classList.contains(class) 来验证 classList 类列表中是否包含 class 类，返回 boolean
      if (editing && column.editable && ref.current && !ref.current.contains(event.target)) {
        cellValueChangeHandler();
      }
    },
    [editing, rowData, column]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    // 卸载事件
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [handleClick]);

  const cellValueChangeHandler = () => {
    form.validate([column.dataIndex], (errors, values) => {
      if (!errors || !errors[column.dataIndex]) {
        setEditing(!editing);
        onHandleSave && onHandleSave({ ...rowData, ...values });
      }
    });
  };

  // 编辑态
  if (editing) {
    return (
      <div ref={ref}>
        <FormItem
          style={{ marginBottom: 0 }}
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          initialValue={rowData[column.dataIndex]}
          field={column.dataIndex}
          rules={[{ required: true }]}
        >
          <Input ref={refInput} onPressEnter={cellValueChangeHandler} />
        </FormItem>
      </div>
    );
  }

  // 预览态
  return (
    <div
      className={clsx(className, { [styles.editableCell]: column.editable })}
      onClick={() => column.editable && setEditing(!editing)}
    >
      {children}
    </div>
  );
};
