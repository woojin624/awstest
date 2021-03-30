import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState();

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setTitle(data.title));
  });

  const [content, setContent] = useState({
    email: '',
    password: '',
  });

  // 객체 비구조화 할당
  const { email, password } = content;

  // 작성되는 글의 각 요소의 밸류값을 받아오는 함수
  const getValue = (e) => {
    const { name, value } = e.target;
    setContent({
      ...content,
      [name]: value,
    });
  };

  const add = (e) => {
    e.preventDefault();
    fetch('/api/add', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.content.user));

    setContent({
      ...content,
      email: '',
      password: '',
    });
  };

  const send = (e) => {
    axios
      .post('/api/add', {
        visible: email,
        category: '1234',
      })
      .then((response) => {
        console.log(response.data);
      });
    e.preventDefault();
    alert('등록 완료!');
  };

  return (
    <div className='App'>
      {title ? (
        <>
          <h1>{title}</h1>
          <form>
            <div className='form-group'>
              <label>email</label>
              <input value={email} type='text' name='email' placeholder='이메일을 입력하라' onChange={getValue} />
            </div>
            <div className='form-group'>
              <label>password</label>
              <input value={password} type='text' name='password' placeholder='비밀번호를 입력하라' onChange={getValue} />
            </div>
            <button type='submit' onClick={add}>
              Submit
            </button>
          </form>
        </>
      ) : (
        <h1>LOADING</h1>
      )}
    </div>
  );
}

export default App;
