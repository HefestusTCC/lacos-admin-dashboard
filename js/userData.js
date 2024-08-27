const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user);

const adminName = document.querySelector('#adminName');
if (user.name.includes(' ')){
    adminName.textContent = user.name.substring(0, user.name.indexOf(' '));
}

const profilePictureURL = document.querySelector('#profilePicture');
profilePictureURL.src = user.profilePictureURL;