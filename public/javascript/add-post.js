const addPostBtn = document.querySelector('#add-post-btn');
const createPostCard = document.querySelector('#create-post-card');

function toHide(event) {
    createPostCard.classList.remove('hide');
    addPostBtn.classList.add('hide');
};


async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_body = document.querySelector('input[name="post-body"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
  addPostBtn.addEventListener('click', toHide); 