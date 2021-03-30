import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [mainTitle, setMainTitle] = useState();

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMainTitle(data.mainTitle));
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPostList(data.Items));
  }, []);

  const [postList, setPostList] = useState([]);

  const [postContent, setPostContent] = useState({
    title: '',
    content: '',
  });

  // 객체 비구조화 할당
  const { title, content } = postContent;

  // 작성되는 글의 각 요소의 밸류값을 받아오는 함수
  const getValue = (e) => {
    const { name, value } = e.target;
    setPostContent({
      ...postContent,
      [name]: value,
    });
  };

  const add = (e) => {
    e.preventDefault();
    fetch('/api/add', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.content.user));

    setPostContent({
      ...postContent,
      title: '',
      content: '',
    });
  };

  return (
    <div className='App'>
      {mainTitle ? (
        <>
          <h1>{mainTitle}</h1>
          <form>
            <div className='form-group'>
              <label>title</label>
              <input value={title} type='text' name='title' placeholder='제목을 입력하라' onChange={getValue} />
            </div>
            <div className='form-group'>
              <label>content</label>
              <input value={content} type='text' name='content' placeholder='내용을 입력하라' onChange={getValue} />
            </div>
            <button type='submit' onClick={add}>
              Submit
            </button>
          </form>
          <div>
            {postList.map((post, i) => {
              return (
                <article key={i}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </article>
              );
            })}
          </div>
        </>
      ) : (
        <h1>LOADING</h1>
      )}
    </div>
  );
}

export default App;
