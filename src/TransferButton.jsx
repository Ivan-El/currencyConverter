import React from 'react';
import {ReactComponent as TransferSvg} from './transfer.svg';

function TransferButton({onClickSwap}) {
  return (
    <button onClick={onClickSwap}>
      <TransferSvg />
    </button>
  );
}

export default TransferButton;
