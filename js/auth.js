window.addEventListener('load', function () {
    const signInButton = document.getElementById('googleSignInButton');

    if (!signInButton || !window.google || !google.accounts || !google.accounts.id) {
        return;
    }

    google.accounts.id.initialize({
        client_id: "984110914315-9sok5k93urleertcgtfgtui5tshqfni4.apps.googleusercontent.com",
        callback: handleGoogleLogin
    });
    google.accounts.id.renderButton(
        signInButton,
        { theme: "outline", size: "large" }
    );
});

function handleGoogleLogin(response) {
    const data = JSON.parse(atob(response.credential.split('.')[1]));
    const signInButton = document.getElementById('googleSignInButton');
    const userProfile = document.getElementById('userProfile');
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');

    if (!signInButton || !userProfile || !userAvatar || !userName) {
        return;
    }

    signInButton.style.display = 'none';
    
    userAvatar.src = data.picture;
    userName.textContent = data.name;
    userProfile.style.display = 'flex';
}
