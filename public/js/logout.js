// Get reference to the logout button
const logoutBtn = document.querySelector('#logout-btn');

// Function to handle logout
async function logoutHandler() {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Logout failed. Please try again.');
  }
}

// Event listener for logout button click
if (logoutBtn) {
  logoutBtn.addEventListener('click', logoutHandler);
}
