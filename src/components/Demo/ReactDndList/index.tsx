import React, { useState, useRef } from 'react';
import {
  ProForm,
  ProFormList,
  ProFormText,
  ProFormTextArea,
  ProCard,
} from '@ant-design/pro-components';
import { Space, Spin, Popover, Row, Col, Alert, Button, Steps, message, Tooltip } from 'antd';
import { RightOutlined, DeleteOutlined } from '@ant-design/icons';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import styles from './index.module.less';

interface IProps {
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  extra: any;
  className?: string;
}

// 拖拽组件
const DragDropBox: React.FC<IProps> = (props) => {
  const ref = useRef(null);
  const { index, moveRow, extra, children } = props;

  //   const [collapsed, setCollapsed] = useState(false); // collapsed 为 true 是折叠

  // 放置目标
  //   const [{ isOver, dropClassName }, drop] = useDrop({
  //     accept: 'DragDropBox',
  //     collect: (monitor) => {
  //       const { index: dragIndex } = monitor.getItem() || {};
  //       if (dragIndex === index) {
  //         return {};
  //       }
  //       return {
  //         isOver: monitor.isOver(),
  //         dropClassName: dragIndex < index ? styles.dropOverDownward : styles.dropOverUpward,
  //       };
  //     },
  //     drop: (item: { index: number }) => {
  //       collapsed && moveRow(item.index, index);
  //     },
  //   });

  // 拖动目标
  //   const [, drag] = useDrag({
  //     type: 'DragDropBox',
  //     item: { index },
  //     collect: (monitor) => ({
  //       isDragging: monitor.isDragging(), // css样式需要
  //     }),
  //   });

  //   if (collapsed) {
  //     drop(drag(ref));
  //   } else {
  //     drop(drag(null));
  //   }

  return (
    <ProCard
      ref={ref}
      bordered
      //   collapsible
      //   headerBordered
      //   collapsed={collapsed}
      //   className={`${styles.flowCard} ${isOver ? dropClassName : ''}`}
      className={styles.flowCard}
      //   style={{ cursor: collapsed ? 'move' : 'default' }}
      //   title={
      //     <Space size={16}>
      //       <RightOutlined rotate={!collapsed ? 90 : undefined} onClick={() => setCollapsed(!collapsed)} />
      //       <span>流程{index + 1}</span>
      //     </Space>
      //   }
      //   extra={extra}
      bodyStyle={{ paddingBottom: 0 }}
    >
      <Row gutter={24}>
        <Col span={20}>{children}</Col>
        <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {extra}
        </Col>
      </Row>
    </ProCard>
  );
};

const AddNodeStep = ({ formRef }) => {
  const actionRef = useRef();

  // 添加
  //   const handleAddFlow = () => {
  //     actionRef.current?.add();
  //   };

  // 移动
  //   const moveRow = (dragIndex: number, hoverIndex: number) => {
  //     console.log('hoverIndex: ', hoverIndex);
  //     console.log('dragIndex: ', dragIndex);
  //     const row = formRef.current?.getFieldValue('flowList');
  //     const dragRow = row[dragIndex];

  //     formRef.current?.setFieldsValue({
  //       flowList: update(row, {
  //         $splice: [
  //           [dragIndex, 1],
  //           [hoverIndex, 0, dragRow],
  //         ],
  //       }),
  //     });
  //   };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      {/* <Button type="link" onClick={handleAddFlow}>
        添加流程
      </Button> */}

      <DndProvider backend={HTML5Backend}>
        <ProForm
          className={styles.stepsForm}
          formRef={formRef}
          submitter={false}
          layout='horizontal'
        >
          <ProFormList
            name='flowList'
            creatorButtonProps={{ creatorButtonText: '添加流程节点', position: 'top' }}
            copyIconProps={false}
            itemRender={({ listDom, action }, { index }) => (
              // moveRow={moveRow}
              <DragDropBox key={index} index={index} extra={action}>
                {console.log('action: ', action)}
                {listDom}
              </DragDropBox>
            )}
            // creatorRecord={{ nodeAlias: '', description: '' }} // 新建一行的默认值
            initialValue={[{ nodeAlias: '', description: '' }]}
            actionRef={actionRef}
            actionRender={(field, action) => [
              <Tooltip title='删除此条数据' key={0}>
                <Button
                  type='dashed'
                  danger
                  shape='circle'
                  icon={<DeleteOutlined />}
                  onClick={() => action.remove(field.key)}
                />
              </Tooltip>,
            ]}
          >
            <ProFormText
              label='节点名称'
              name='nodeAlias'
              rules={[{ required: true }]}
              labelCol={{ span: 3 }}
            />
            <ProFormTextArea label='节点描述' name='description' labelCol={{ span: 3 }} />
          </ProFormList>
        </ProForm>
      </DndProvider>
    </div>
  );
};

export default AddNodeStep;

const SceneDebug = ({ children }) => {
  const trigger = React.Children.only(children as React.ReactElement);

  return (
    <>
      {React.cloneElement(trigger, {
        onClick: () => setVisible(true),
      })}
      <Modal
        title='场景调试'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={760}
        bodyStyle={{ maxHeight: 580, overflow: 'auto' }}
      ></Modal>
    </>
  );
};

export default SceneDebug;

'com.taobao.trade.face.unit.service.'.replace(/([^\.])[^\.]+\./g, (match, first) => `${first}.`);

// 单行省略
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
word-break: keep-all;

// 正常换行
word-break: keep-all;
word-break: break-word;



// 将 com.abc.ef 缩写成 c.a.e
export const formatEntrance = (value) => {
  if (!value) return value;

  if (value.indexOf('@') !== -1) {
    const noVersionValue = value.split(':')[0];
    let showValue = noVersionValue.replace(/([^.])[^.]+\./g, (match, first) => `${first}.`);
    if (value.split(':')[1]) {
      showValue = `${showValue}:${value.split(':')[1]}`;
    }
    showValue = `${showValue}`;
    return showValue;
  }
  if (value.indexOf('http') !== -1) {
    return value.split(/https?:\/\/[a-zA-Z0-9\-_.]+/)[1];
  }
  return value;
};

// git 关闭文件大小写敏感
git config core.ignorecase false