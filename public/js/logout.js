// Get a reference to the logout button
const logoutButton = document.querySelector('#logout-button');

// Function to handle logout
async function handleLogout() {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    // Redirect to the login page after successful logout
    document.location.replace('/login');
  } else {
    alert('Logout failed. Please try again.');
  }
}

// Event listener for logout button click
logoutButton.addEventListener('click', handleLogout);
