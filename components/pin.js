import styles from '../styles/Pin.module.css'
import React, {useEffect, useRef, useState} from "react";

export default function Pin({ fields, onInput }) {
  const [error, setError] = useState("")
  const [pinValues] = useState([])
  const inputRefs = useRef([]);

  useEffect(() => {
    if (pinValues.length === fields) {
      inputRefs.current[fields-1].current.focus();
    } else {
      inputRefs.current[0].current.focus();
    }
  }, [pinValues]);

  const onChangeHandler = (e, index) => {
    const { maxLength, value } = e.target;
    // if more than 1 digit, move to next input field
    if (value.length >= maxLength) {
      if (index+1 < fields) {
        // go to next input
        inputRefs.current[index+1].current.select();
      }
    }

    getPinValue(inputRefs.current.map(i => i.current.value));
  }

  const onkeydownHandler = (e) => {
    if (e.keyCode === 9) { e.preventDefault(); return }
  }

  const onKeyUpHandler = (e, index) => {
    if (e.keyCode !== 8 && isNaN(e.target.value)) {
      setError("Invalid input, please use number only")

      return
    }
    if (error !== "") { setError("") }
    if (e.keyCode === 8) {
      if (inputRefs.current[index-1] !== undefined) {
        inputRefs.current[index].current.select();
        inputRefs.current[index].current.value = "";
        if (inputRefs.current[index].current.value === "") {
          inputRefs.current[index-1].current.select();
          inputRefs.current[index-1].current.value = "";
        }
        getPinValue(inputRefs.current.map(i => i.current.value));
      }
    } else {
      onChangeHandler(e, index);
    }
  }

  const getPinValue = (pins) => {
    onInput(pins.join(""));
  }

  const onPasteHandler = (e) => {
    let fromClipboard = e.clipboardData.getData("Text");

    const regex = RegExp('[0-9]');
    if (!regex.test(fromClipboard)) {
      setError("Invalid input, please use number only");

      return
    }

    if (fromClipboard.length > fields) {
      fromClipboard = fromClipboard.substring(0, fromClipboard.length - (fromClipboard.length - fields));
    }
    let newPinValues = [...pinValues];
    fromClipboard.split("").map((c, idx) => {
      newPinValues[idx] = c;
      inputRefs.current[idx].current.select();
      inputRefs.current[idx].current.value = c;
    });

    inputRefs.current[fields - 1].current.focus();
    getPinValue(newPinValues);
  }

  const inputs = []
  
  for (let index = 0; index < fields; index++) {
    inputRefs.current[index] = React.createRef();
    inputs.push(<input
      key={index}
      type="text"
      defaultValue={pinValues[index]}
      className={styles.input}
      ref={inputRefs.current[index]}
      autoFocus={index === 0}
      maxLength="1"
      onKeyUp={(e) => onKeyUpHandler(e, index)}
      onKeyDown={(e) => onkeydownHandler(e)}
    />);
  }

  return <div onPaste={onPasteHandler}>
    {inputs}
    <p className={styles.error}>{error}</p>
    <h1>{pinValues.join("")}</h1>
  </div>;
}
