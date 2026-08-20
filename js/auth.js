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

    buildAccountMenu();
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

// =========================================================
// МЕНЮ АККАУНТА
// Desktop: выпадающий список под аватаром (по клику на профиль)
// Mobile:  те же пункты встраиваются в бургер-список
// =========================================================

function closeMobileMenu() {
    const headerList = document.querySelector('.header__list');
    const burgerBtn = document.getElementById('burgerBtn');
    if (headerList) headerList.classList.remove('open');
    if (burgerBtn) burgerBtn.classList.remove('active');
}

function closeAccountDropdown() {
    const dropdown = document.getElementById('accountDropdown');
    if (dropdown) dropdown.classList.remove('open');
}

function changeName() {
    const savedUser = localStorage.getItem('netija_user');
    if (!savedUser) return;

    let data;
    try {
        data = JSON.parse(savedUser);
    } catch (e) {
        return;
    }

    const newName = window.prompt('Введите новое имя:', data.name || '');

    if (newName === null) {
        return; // отменили
    }

    const trimmed = newName.trim();
    if (!trimmed) {
        return;
    }

    data.name = trimmed;
    localStorage.setItem('netija_user', JSON.stringify(data));

    const nameEl = document.getElementById('userName');
    if (nameEl) nameEl.textContent = trimmed;

    closeAccountDropdown();
    closeMobileMenu();
}

function logout() {
    const confirmed = window.confirm('Выйти из аккаунта?');
    if (!confirmed) return;

    localStorage.removeItem('netija_user');
    location.reload();
}

function buildAccountMenu() {
    const userProfile = document.getElementById('userProfile');
    const headerList = document.querySelector('.header__list');

    if (!userProfile || !headerList) return;

    // Профиль должен быть якорем для выпадающего меню
    userProfile.style.position = 'relative';
    userProfile.style.cursor = 'pointer';
    userProfile.title = '';

    // -----------------------------------------------------
    // DESKTOP: выпадающий список
    // -----------------------------------------------------

    if (!document.getElementById('accountDropdown')) {
        const dropdown = document.createElement('div');
        dropdown.id = 'accountDropdown';
        dropdown.className = 'account-dropdown';

        const renameBtn = document.createElement('button');
        renameBtn.type = 'button';
        renameBtn.textContent = 'Изменить имя';
        renameBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            changeName();
        });

        const logoutBtn = document.createElement('button');
        logoutBtn.type = 'button';
        logoutBtn.className = 'danger';
        logoutBtn.textContent = 'Выйти из аккаунта';
        logoutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            logout();
        });

        dropdown.appendChild(renameBtn);
        dropdown.appendChild(logoutBtn);
        userProfile.appendChild(dropdown);
    }

    userProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = document.getElementById('accountDropdown');
        if (dropdown) dropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => {
        closeAccountDropdown();
    });

    // -----------------------------------------------------
    // MOBILE: те же пункты — в бургер-списке
    // -----------------------------------------------------

    if (!document.getElementById('accountItemsMobile')) {
        const marker = document.createElement('li');
        marker.id = 'accountItemsMobile';
        marker.style.display = 'none';
        headerList.appendChild(marker);

        const renameItem = document.createElement('li');
        renameItem.className = 'header__list-item account-item';

        const renameBtnMobile = document.createElement('button');
        renameBtnMobile.type = 'button';
        renameBtnMobile.className = 'header__list-link account-item-link';
        renameBtnMobile.textContent = 'Изменить имя';
        renameBtnMobile.addEventListener('click', changeName);

        renameItem.appendChild(renameBtnMobile);
        headerList.appendChild(renameItem);

        const logoutItem = document.createElement('li');
        logoutItem.className = 'header__list-item account-item';

        const logoutBtnMobile = document.createElement('button');
        logoutBtnMobile.type = 'button';
        logoutBtnMobile.className = 'header__list-link account-item-link account-item-link--danger';
        logoutBtnMobile.textContent = 'Выйти из аккаунта';
        logoutBtnMobile.addEventListener('click', logout);

        logoutItem.appendChild(logoutBtnMobile);
        headerList.appendChild(logoutItem);
    }
}
