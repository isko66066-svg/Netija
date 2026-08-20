window.onload = function () {

    buildAccountMenu();

    google.accounts.id.initialize({
        client_id: "984110914315-9sok5k93urleertcgtfgtui5tshqfni4.apps.googleusercontent.com",
        callback: handleGoogleLogin
    });

    // Иконка в шапке (desktop)
    google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large", type: "icon" }
    );

    // Полноценная кнопка с текстом внутри бургер-меню (mobile)
    const mobileSignInEl = document.getElementById('googleSignInButtonMobile');
    if (mobileSignInEl) {
        google.accounts.id.renderButton(
            mobileSignInEl,
            { theme: "outline", size: "large", type: "standard", text: "signin_with", locale: "ru", width: 220 }
        );
    }

    // Пытаемся восстановить сохранённого пользователя
    // из прошлого визита, чтобы не спрашивать вход заново
    const savedUser = getSavedUser();

    if (savedUser) {
        showUserProfile(savedUser);
    } else {
        refreshAccountMenu();
    }
};

function handleGoogleLogin(response) {
    const data = JSON.parse(atob(response.credential.split('.')[1]));

    // Сохраняем только то, что нужно для отображения профиля —
    // сам токен (credential) не храним из соображений безопасности
    saveUser({
        name: data.name,
        picture: data.picture
    });

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

    refreshAccountMenu();
}

// =========================================================
// МЕНЮ АККАУНТА
// Desktop: выпадающий список под аватаром (по клику на профиль)
// Mobile:  те же пункты встраиваются в бургер-список,
//          а если пользователь не вошёл — там же кнопка входа
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

function getSavedUser() {
    const savedUser = localStorage.getItem('netija_user');
    if (!savedUser) return null;

    try {
        return JSON.parse(savedUser);
    } catch (e) {
        return null;
    }
}

function saveUser(data) {
    localStorage.setItem('netija_user', JSON.stringify(data));
}

// Показываем пункты профиля (аватар/имя/выход), только если
// пользователь вошёл, и кнопку входа — только если не вошёл
function refreshAccountMenu() {
    const loggedIn = !!getSavedUser();

    document.querySelectorAll('.account-item').forEach((el) => {
        el.style.display = loggedIn ? '' : 'none';
    });

    const loginItem = document.getElementById('loginItemMobile');
    if (loginItem) {
        loginItem.style.display = loggedIn ? 'none' : '';
    }
}

function changeName() {
    const data = getSavedUser();
    if (!data) return;

    const newName = window.prompt('Введите новое имя:', data.name || '');

    if (newName === null) {
        return; // отменили
    }

    const trimmed = newName.trim();
    if (!trimmed) {
        return;
    }

    data.name = trimmed;
    saveUser(data);

    const nameEl = document.getElementById('userName');
    if (nameEl) nameEl.textContent = trimmed;

    closeAccountDropdown();
    closeMobileMenu();
}

// =========================================================
// СМЕНА АВАТАРА
// Картинка сжимается до маленького квадрата (128x128) и
// сохраняется как data URL прямо в localStorage — своего
// файлового хранилища/бэкенда для этого нет.
// =========================================================

function resizeImageToDataUrl(file, size, callback) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();

        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;

            const ctx = canvas.getContext('2d');

            // Обрезаем по центру в квадрат, чтобы аватар не был искажён
            const minSide = Math.min(img.width, img.height);
            const sx = (img.width - minSide) / 2;
            const sy = (img.height - minSide) / 2;

            ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);

            callback(canvas.toDataURL('image/jpeg', 0.85));
        };

        img.onerror = function () {
            callback(null);
        };

        img.src = e.target.result;
    };

    reader.onerror = function () {
        callback(null);
    };

    reader.readAsDataURL(file);
}

function changeAvatar() {
    const data = getSavedUser();
    if (!data) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.addEventListener('change', () => {
        const file = input.files && input.files[0];
        if (!file) return;

        resizeImageToDataUrl(file, 128, (dataUrl) => {
            if (!dataUrl) {
                window.alert('Не удалось загрузить изображение. Попробуйте другой файл.');
                return;
            }

            data.picture = dataUrl;
            saveUser(data);

            const avatarEl = document.getElementById('userAvatar');
            if (avatarEl) avatarEl.src = dataUrl;

            closeAccountDropdown();
            closeMobileMenu();
        });
    });

    input.click();
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
    // DESKTOP: выпадающий список (виден только когда вошёл —
    // сам #userProfile скрыт до входа через showUserProfile)
    // -----------------------------------------------------

    if (!document.getElementById('accountDropdown')) {
        const dropdown = document.createElement('div');
        dropdown.id = 'accountDropdown';
        dropdown.className = 'account-dropdown';

        const avatarBtn = document.createElement('button');
        avatarBtn.type = 'button';
        avatarBtn.textContent = 'Изменить аватар';
        avatarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            changeAvatar();
        });

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

        dropdown.appendChild(avatarBtn);
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
    // MOBILE: те же пункты — в бургер-списке,
    // плюс кнопка входа, если пользователь ещё не вошёл
    // -----------------------------------------------------

    if (!document.getElementById('accountItemsMobile')) {
        const marker = document.createElement('li');
        marker.id = 'accountItemsMobile';
        marker.style.display = 'none';
        headerList.appendChild(marker);

        // --- Кнопка входа (показывается, если НЕ вошёл) ---

        const loginItem = document.createElement('li');
        loginItem.id = 'loginItemMobile';
        loginItem.className = 'header__list-item account-item login-item';

        const loginLabel = document.createElement('div');
        loginLabel.className = 'login-item-label';
        loginLabel.textContent = 'Войти в аккаунт';

        const loginBtnContainer = document.createElement('div');
        loginBtnContainer.id = 'googleSignInButtonMobile';
        loginBtnContainer.className = 'login-item-button';

        loginItem.appendChild(loginLabel);
        loginItem.appendChild(loginBtnContainer);
        headerList.appendChild(loginItem);

        // --- Пункты профиля (показываются, если вошёл) ---

        const avatarItem = document.createElement('li');
        avatarItem.className = 'header__list-item account-item';

        const avatarBtnMobile = document.createElement('button');
        avatarBtnMobile.type = 'button';
        avatarBtnMobile.className = 'header__list-link account-item-link';
        avatarBtnMobile.textContent = 'Изменить аватар';
        avatarBtnMobile.addEventListener('click', changeAvatar);

        avatarItem.appendChild(avatarBtnMobile);
        headerList.appendChild(avatarItem);

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

    refreshAccountMenu();
}
