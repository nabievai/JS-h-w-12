document.addEventListener("DOMContentLoaded", function () {
    fetchUser();
  });
  
  function fetchUser() {
    const userContainer = document.getElementById('user-container');
    const userPhoto = document.getElementById('user-photo');
    const userInfo = document.getElementById('user-info');
    const errorMessage = document.getElementById('error-message');
    const loader = document.getElementById('loader');
    const fetchButton = document.getElementById('fetchButton');
  
    fetchButton.disabled = true;
    loader.style.display = 'block';
  
    userPhoto.src = '';
    userInfo.textContent = '';
    errorMessage.textContent = '';
  
    fetch('https://randomuser.me/api/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            fetchButton.disabled = false;
            loader.style.display = 'none';
  
            drawUser(data.results[0]);
        })
        .catch(error => {
            fetchButton.disabled = false;
            loader.style.display = 'none';
  
            errorMessage.textContent = 'Oops, something went wrong!';
        });
  }
  
  function drawUser(data) {
    const userPhoto = document.getElementById('user-photo');
    const userInfo = document.getElementById('user-info');
  
    userPhoto.src = data.picture.large;
    userInfo.innerHTML = `
        <p>Name: ${data.name.first} ${data.name.last}</p>
        <p>Gender: ${data.gender}</p>
        <p>Location: ${data.location.city}, ${data.location.country}</p>
        <p>Email: ${data.email}</p>
        <p>Phone: ${data.phone}</p>
        <p>Birthday: ${new Date(data.dob.date).toLocaleDateString()}</p>
    `;
  }
  