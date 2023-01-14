import React from 'react';
import CurrencyInput from './CurrencyInput';

const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];

export const Block = ({annotation, value, onChangeValue, currency, onChangeCurrency }) => (
  <div className="block">
    <div>{annotation}</div>
    <ul className="currencies">
      {defaultCurrencies.map((cur) => (
        <li
          onClick={() => onChangeCurrency(cur)}
          className={currency === cur ? 'active' : ''}
          key={cur}
        >
          {cur}
        </li>
      ))}
    </ul>
    <CurrencyInput value={value} onChangeValue={onChangeValue} />
  </div>
);
