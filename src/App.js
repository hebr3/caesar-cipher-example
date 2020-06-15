import React, { useState, useEffect } from "react";
import * as R from "ramda";
import "./App.css";

import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github.css";

hljs.registerLanguage("javascript", javascript);

function rotate(char, offset) {
  return String.fromCharCode(((char.charCodeAt(0) - 65 + offset) % 26) + 65);
}

function encrypt(msg, offset) {
  msg = msg.toUpperCase().replace(/[\s|\r|\n]/g, "");
  let cipher = "";
  for (let i = 0; i < msg.length; i++) {
    cipher += rotate(msg[i], offset);
  }
  return cipher;
}

const CODE = `
function rotate(char, offset) {
  return String.fromCharCode(((char.charCodeAt(0) - 65 + offset) % 26) + 65);
}
  
function encrypt(msg, offset) {
  msg = msg.toUpperCase().replace(/[\\s|\\r|\\n]/g, "");
  let cipher = "";
  for (let i = 0; i < msg.length; i++) {
    cipher += rotate(msg[i], offset);
  }
  return cipher;
}
`;

export default function App() {
  const [plaintext, setPlaintext] = useState("Try entering some text");
  const [ciphertext, setCiphertext] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setCiphertext(encrypt(plaintext, offset));
  }, [plaintext, offset]);

  return (
    <div className="App">
      <h3>Caesar Cipher</h3>
      <label htmlFor="offset">Offset: </label>
      <select id="offset" onChange={(evt) => setOffset(evt.target.value)}>
        {R.range(0, 26).map((i) => (
          <option key={i}>{i}</option>
        ))}
      </select>
      <br />
      <textarea
        id="plaintext"
        value={plaintext}
        onChange={(evt) => setPlaintext(evt.target.value)}
        rows="5"
        cols="60"
      />
      <br />
      <textarea
        id="ciphertext"
        value={ciphertext}
        rows="5"
        cols="60"
        disabled
      />
      <pre>
        <code className="javascript">{CODE}</code>
      </pre>
    </div>
  );
}
