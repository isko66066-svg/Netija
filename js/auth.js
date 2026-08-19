const BACKEND_URL = "https://netija.onrender.com";

window.onload = function () {
    const savedUser = localStorage.getItem('netija_user');

    if (savedUser) {
        try {
            const data = JSON.parse(savedUser);
            showUserProfile(data);
            syncBackendUser(data);
        } catch (e) {
            localStorage.removeItem('netija_user');
        }
    }

    google.accounts.id.initialize({
        client_id: "984110914315-9sok5k93urleertcgtfgtui5tshqfni4.apps.googleusercontent.com",
        callback: handleGoogleLogin
    });

    if (!savedUser) {
        google.accounts.id.renderButton(
            document.getElementById("googleSignInButton"),
            { theme: "outline", size: "large", type: "icon" }
        );
    }

    const userProfile = document.getElementById('userProfile');
    if (userProfile) {
        userProfile.style.cursor = 'pointer';
        userProfile.title = 'Нажмите, чтобы выйти из аккаунта';
        userProfile.addEventListener('click', logout);
    }
};

async function syncBackendUser(data) {
    if (!data?.email) return;

    try {
        await fetch(`${BACKEND_URL}/api/auth/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: data.email,
                name: data.name || '',
                picture: data.picture || ''
            })
        });
    } catch (error) {
        console.warn('Netija backend недоступен:', error);
    }
}

function handleGoogleLogin(response) {
    const data = JSON.parse(atob(response.credential.split('.')[1]));

    const user = {
        name: data.name,
        email: data.email,
        picture: data.picture
    };

    localStorage.setItem('netija_user', JSON.stringify(user));
    showUserProfile(user);
    syncBackendUser(user);
};

function showUserProfile(data) {
    const signInBtn = document.getElementById('googleSignInButton');
    if (signInBtn) signInBtn.style.display = 'none';

    const userProfile = document.getElementById('userProfile');
    const avatar = document.getElementById('userAvatar');
    const name = document.getElementById('userName');

    if (avatar) avatar.src = data.picture || '';
    if (name) name.textContent = data.name || data.email || 'Пользователь';
    if (userProfile) userProfile.style.display = 'flex';

    window.dispatchEvent(new CustomEvent('netija:auth-changed', {
        detail: data
    }));
}

function logout() {
    const confirmed = window.confirm('Выйти из аккаунта?');
    if (!confirmed) return;

    localStorage.removeItem('netija_user');
    window.dispatchEvent(new CustomEvent('netija:auth-changed', {
        detail: null
    }));
    location.reload();
}
