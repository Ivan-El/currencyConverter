import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import TransferButton from './TransferButton';
import './index.css';

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const ratesRef = useRef({});
  const [date, setDate] = useState('');

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.rates;
        setDate(json.time_last_update_utc);
        onChangeFromPrice(800);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(2));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setToPrice(value);
    setFromPrice(result.toFixed(2));
  };

  const onClickSwap = () => {
    let swap = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(swap);
  };

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  return (
    <div className="App">
      <Block
        annotation={'У меня есть'}
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <TransferButton onClickSwap={onClickSwap} />
      <Block
        annotation={'Хочу приобрести'}
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
      <div>{`Данные за ${date}`}</div>
    </div>
  );
}

export default App;
