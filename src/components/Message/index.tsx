import React, { useEffect } from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { debounce } from 'lodash';

const Message = (props) => {
  const { type = 'info', content, onClose } = props;

  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => {
      t && clearTimeout(t);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 50,
        left: '50%',
        background: '#4CD263',
        padding: 20,
        minWidth: 150,
      }}
    >
      {content}
    </div>
  );
};

const getContainer = () => {
  const container = document.querySelector('#customMessageWrapper');
  if (!container) {
    const _container = document.createElement('div');
    _container.id = 'customMessageWrapper';
    // _container.className = `fixed flex flex-col gap-4 top-0 items-center py-5 left-1/2 -translate-x-1/2`;
    document.body.appendChild(_container);
    return _container;
  }
  return container;
};

const _message = (type) => {
  return (props) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    // const container = getContainer();
    // const _dom = document.createElement('div');

    // container.appendChild(_dom);

    const handleClose = () => {
      // unmountComponentAtNode(_dom);
      // container.removeChild(_dom);
      // unmountComponentAtNode(container);
      container.remove();
    };

    // render(<Message {...props} type={type} onClose={debounce(hanldeClose, 500)} />, _dom);
    render(<Message {...props} type={type} onClose={handleClose} />, container);
  };
};

const error = _message('error');
const warning = _message('warning');
const success = _message('success');
const info = _message('info');

export default {
  error,
  warning,
  success,
  info,
};

// export default Message;
