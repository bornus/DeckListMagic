import React, { useState } from 'react';
import classnames from 'classnames';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { CopyIcon } from 'components/SVGs';
import styles from './copy-text-field.module.scss';

interface Props {
  label: string;
  text: string;
  [attributes: string]: any;
}

export default function CopyTextField({ label, text, ...rest }: Props) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CopyToClipboard text={text} onCopy={onCopy}>
      <div className={classnames(styles.container, rest.className)}>
        <span className={styles.keyValueContainer}>
          <div>{label}</div>
          <div className={styles.value}>{text}</div>
        </span>
        {copied ? <span className={styles.copiedTag}>Copied !</span> : <CopyIcon width="20px" height="20px" />}
      </div>
    </CopyToClipboard>
  );
}
