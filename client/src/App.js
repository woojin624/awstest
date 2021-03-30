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

  const valueA = 'b';

  const add = (e) => {
    e.preventDefault();
    fetch('/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test',
        body: 'I am testing!',
        userId: 1,
      }),
    }).then((response) => console.log(response));
    console.log(valueA);
  };

  const send = (e) => {
    axios
      .post('/api/add', {
        visible: valueA,
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
              <label>to do</label>
              <input type='text' name='title' />
            </div>
            <div className='form-group'>
              <label>date</label>
              <input type='text' name='date' />
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
