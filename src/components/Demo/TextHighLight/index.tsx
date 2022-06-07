/**
 * @description 🍋 Index.tsx
 */

import React, { useState } from 'react';
import { Input } from '@arco-design/web-react';
import { debounce } from 'lodash'; // 防抖函数

/**
 * @description 处理高亮文字的 方法
 * @param string - 要高亮的文字
 * @param words - 文本内容
 * @returns
 */
const HighlightFunc = (string: string[] = [], words: string) => {
  if (!string[0]) return <span>{words}</span>; // '|' 没作用，和空值，逗号一样

  const reg = new RegExp(string.join('|'), 'g'); // 得到 /.../g 的正则

  // 将内容中的匹配到的文字替换成 #@文字...# 的格式
  const token = words.replace(reg, '#@$&#'); // $& 表示与正则匹配到的全部文本

  // 遍历内容文本，通过 # 进行分割，再通过 @ 进行判断，再替换
  const elements = token
    .split('#')
    .map((x) =>
      x[0] === '@' ? React.createElement('span', { style: { color: '#F53F3F' } }, x.slice(1)) : x
    );
  return React.createElement('span', null, ...elements);
};

const text = `上善若水。水善利万物而不争，处众人之所恶（wù），故几（jī）于道。\n居善地，心善渊，与善仁，言善信，正善治，事善能，动善时。夫唯不争，故无尤。- 《老子道德经》`;

const TextHighLight: React.FC = () => {
  const [textRender, setTextRender] = useState<JSX.Element>(<span>{text}</span>);

  const handleChange = (val) => {
    debounceValue(val);
  };

  // 使用防抖
  const debounceValue = debounce((val) => {
    const render = HighlightFunc([val], text);
    setTextRender(render);
  }, 500);

  return (
    <>
      <Input placeholder='输入指定文字' style={{ width: '55%' }} onChange={handleChange} />
      <pre style={{ marginTop: 16, marginBottom: 0 }}>
        {textRender}
        <br />
        <a href='https://www.daodejing.org/8.html' target='_blank' className='inline-block mt-6'>
          译文
        </a>
      </pre>
    </>
  );
};

export default TextHighLight;
