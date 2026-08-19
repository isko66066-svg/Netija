window.onload = function () {

    // Пытаемся восстановить сохранённого пользователя
    // из прошлого визита, чтобы не спрашивать вход заново
    const savedUser = localStorage.getItem('netija_user');

    if (savedUser) {
        try {
            const data = JSON.parse(savedUser);
            showUserProfile(data);
        } catch (e) {
            localStorage.removeItem('netija_user');
        }
    }

    google.accounts.id.initialize({
        client_id: "984110914315-9sok5k93urleertcgtfgtui5tshqfni4.apps.googleusercontent.com",
        callback: handleGoogleLogin
    });

    // Кнопку показываем, только если пользователь ещё не сохранён
    if (!savedUser) {
        google.accounts.id.renderButton(
            document.getElementById("googleSignInButton"),
            { theme: "outline", size: "large", type: "icon" }
        );
    }

    // Клик по профилю — выход из аккаунта
    const userProfile = document.getElementById('userProfile');
    if (userProfile) {
        userProfile.style.cursor = 'pointer';
        userProfile.title = 'Нажмите, чтобы выйти из аккаунта';
        userProfile.addEventListener('click', logout);
    }
};

function handleGoogleLogin(response) {
    const data = JSON.parse(atob(response.credential.split('.')[1]));

    // Сохраняем только то, что нужно для отображения профиля —
    // сам токен (credential) не храним из соображений безопасности
    localStorage.setItem('netija_user', JSON.stringify({
        name: data.name,
        picture: data.picture
    }));

    showUserProfile(data);
}

function showUserProfile(data) {
    const signInBtn = document.getElementById('googleSignInButton');
    if (signInBtn) {
        signInBtn.style.display = 'none';
    }

    const userProfile = document.getElementById('userProfile');
    document.getElementById('userAvatar').src = data.picture;
    document.getElementById('userName').textContent = data.name;
    userProfile.style.display = 'flex';
}

function logout() {
    const confirmed = window.confirm('Выйти из аккаунта?');
    if (!confirmed) return;

    localStorage.removeItem('netija_user');
    location.reload();
}