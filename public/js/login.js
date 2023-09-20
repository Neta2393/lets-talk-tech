// Reference the form elements
const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

// Function to handle form submission
async function handleLoginFormSubmission(event) {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Login failed. Please verify your username and password.');
    }
  }
}

// Event listener for form submission
loginForm.addEventListener('submit', handleLoginFormSubmission);
