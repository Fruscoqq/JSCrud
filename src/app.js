// const greeting = 'Hello World';
// console.log(greeting);

// const getData = async (url) => {
//   const response = await fetch(url);
//   const result = await response.json();
//   console.log(result);
// };

// getData('https://jsonplaceholder.typicode.com/posts');

import EasyHTTP from './http';
import UI from './ui';

const http = new EasyHTTP();
const ui = new UI();

document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for Delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for Edit
document.querySelector('#posts').addEventListener('click', enableEdit);

// Cancel edit
document.querySelector('.cancel-edit').addEventListener('click', cancelEdit);

// Get posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
}


// Submit/Edit Post
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }

  // Check for ID
  if (id === '') {
    // Create Post
    http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Post added', 'alert-success', 'd-block');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
  } else {
    // Update the Post
    http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post updated', 'alert-success', 'd-block');
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err));
  }
}


function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    console.log(e.target.parentElement.dataset.id)
    if (confirm('Are you sure')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post removed', 'alert-success', 'd-block');
          getPosts();
        })
        .catch(err => console.log(err))
    }

  }
}

// Enable Edit state

function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    }

    // Fill form with current post
    ui.fillForm(data);
  }
  e.preventDefault();
}

// Cancel Edit State
function cancelEdit(e) {
  if (e.target.classList.contains('btn-danger')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}
