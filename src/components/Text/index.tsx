import React from 'react';
import styles from './styles.module.scss';

const Text: React.FC = ({ children }) => {
  return <span className={styles.text}>{children}</span>;
};

export default Text;
