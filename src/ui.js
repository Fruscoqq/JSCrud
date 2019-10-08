class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
    this.alertBox = document.querySelector('.alert');
    this.editBtn = document.querySelector('.cancel-edit');
  }

  showPosts(posts) {

    let output = '';

    posts.forEach(post => {
      output += `
      <div class="card mb-3">
      <div class="card-body">
      <h4 class="card-title">${post.title}</h4>
      <p class="card-text">${post.body}</p>
      <a href="#" class="edit card-link" data-id="${post.id}">
      <i class="fa fa-pencil"></i>
      </a>
      <a href="#" class="delete card-link" data-id="${post.id}">
      <i class="fa fa-remove"></i>
      </a>
      </div>
      </div>
      `

      this.post.innerHTML = output;
    })
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
    console.log('inputs cleared');
  }

  clearIdInput() {
    this.idInput.value = '';
  }


  showAlert(message, classList, classList2) {

    this.alertBox.textContent = message;
    this.alertBox.classList.add(classList, classList2);

    setTimeout(() => {
      this.alertBox.classList.remove(classList, classList2);
    }, 2000)
  }

  fillForm(data) {
    this.idInput.value = data.id;
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;

    this.changeFormState('edit');
  }

  // Change the form state
  changeFormState(type) {
    if (type === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      this.editBtn.classList.remove('d-none');
    } else {
      this.postSubmit.textContent = 'Post it';
      this.editBtn.classList.add('d-none');
      // Clear ID from hidden field
      this.clearIdInput();
      // Clear text
      this.clearFields();
    }
  }
}

export { UI as default };