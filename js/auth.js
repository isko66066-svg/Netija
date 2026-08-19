window.onload = function () {
    google.accounts.id.initialize({
        client_id: "984110914315-9sok5k93urleertcgtfgtui5tshqfni4.apps.googleusercontent.com",
        callback: handleGoogleLogin
    });
    google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large", type: "icon" }
    );
};

function handleGoogleLogin(response) {
    const data = JSON.parse(atob(response.credential.split('.')[1]));
    
    document.getElementById('googleSignInButton').style.display = 'none';
    
    const userProfile = document.getElementById('userProfile');
    document.getElementById('userAvatar').src = data.picture;
    document.getElementById('userName').textContent = data.name;
    userProfile.style.display = 'flex';
}