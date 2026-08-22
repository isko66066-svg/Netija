const NETIJA_BACKEND_URL = 'https://netija.onrender.com';

function getSavedUser() {
    try {
        const raw = localStorage.getItem('netija_user');
        return raw ? JSON.parse(raw) : null;
    } catch (_) {
        return null;
    }
}

function saveUser(data) {
    localStorage.setItem('netija_user', JSON.stringify(data));
}

async function syncUserWithBackend(email) {
    if (!email) return false;
    try {
        const response = await fetch(`${NETIJA_BACKEND_URL}/api/auth/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.success || !data.user) return false;

        const localUser = getSavedUser() || {};
        saveUser({
            ...localUser,
            ...data.user,
            name: localUser.name || data.user.name || '',
            picture: localUser.picture || data.user.picture || ''
        });
        return true;
    } catch (error) {
        console.error('Netija backend sync request failed:', error);
        return false;
    }
}

async function handleGoogleLogin(response) {
    try {
        const data = JSON.parse(atob(response.credential.split('.')[1]));
        await syncUserWithBackend(data.email);

        saveUser({
            ...getSavedUser(),
            name: data.name,
            picture: data.picture,
            email: data.email
        });

        showUserProfile(getSavedUser());
        window.dispatchEvent(new CustomEvent('netija:login'));
        updateMobilePremiumCard();
    } catch (error) {
        console.error('Google login error:', error);
        window.alert('Не удалось выполнить вход. Попробуйте ещё раз.');
    }
}

function showUserProfile(data) {
    const signInBtn = document.getElementById('googleSignInButton');
    if (signInBtn) signInBtn.style.display = 'none';

    const userProfile = document.getElementById('userProfile');
    const avatar = document.getElementById('userAvatar');
    const name = document.getElementById('userName');

    if (avatar) avatar.src = data?.picture || '';
    if (name) name.textContent = data?.name || '';
    if (userProfile) userProfile.style.display = 'flex';

    refreshAccountMenu();
}

function closeMobileMenu() {
    const headerList = document.querySelector('.header__list');
    const burgerBtn = document.getElementById('burgerBtn');
    if (headerList) headerList.classList.remove('open');
    if (burgerBtn) burgerBtn.classList.remove('active');
    document.body.classList.remove('menu-lock');
}

function closeAccountDropdown() {
    const dropdown = document.getElementById('accountDropdown');
    if (dropdown) dropdown.classList.remove('open');
}

function refreshAccountMenu() {
    const loggedIn = !!getSavedUser();
    const isMobile = window.matchMedia('(max-width:700px)').matches;

    // Account controls belong to the mobile burger menu only.
    // Never inject/display them into the desktop header.
    document.querySelectorAll('.account-item').forEach((el) => {
        if (el.id === 'loginItemMobile') return;
        el.style.setProperty('display', isMobile && loggedIn ? 'block' : 'none', 'important');
    });

    const loginItem = document.getElementById('loginItemMobile');
    if (!loginItem) return;

    if (!isMobile) {
        loginItem.style.setProperty('display', 'none', 'important');
        return;
    }

    if (loggedIn) {
        loginItem.style.setProperty('display', 'block', 'important');
        const label = loginItem.querySelector('.login-item-label');
        const googleButton = loginItem.querySelector('.login-item-button');
        if (label) label.style.setProperty('display', 'none', 'important');
        if (googleButton) googleButton.style.setProperty('display', 'none', 'important');

        let status = loginItem.querySelector('.account-status-card');
        if (!status) {
            status = document.createElement('div');
            status.className = 'account-status-card';
            loginItem.appendChild(status);
        }

        const user = getSavedUser();
        status.innerHTML = `
            <span class="account-status-avatar"><img src="${escapeHtmlAttr(user?.picture || '')}" alt=""></span>
            <span class="account-status-copy">
                <strong>Вы вошли</strong>
                <small>${escapeHtml(user?.name || 'Аккаунт')}</small>
            </span>
            <span class="account-status-check" aria-hidden="true">✓</span>
        `;
    } else {
        loginItem.style.setProperty('display', 'block', 'important');
        const label = loginItem.querySelector('.login-item-label');
        const googleButton = loginItem.querySelector('.login-item-button');
        if (label) label.style.setProperty('display', 'block', 'important');
        if (googleButton) googleButton.style.setProperty('display', 'flex', 'important');
        loginItem.querySelector('.account-status-card')?.remove();
    }
}

function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[char]));
}

function escapeHtmlAttr(value) {
    return escapeHtml(value);
}

function changeName() {
    const data = getSavedUser();
    if (!data) return;
    const newName = window.prompt('Введите новое имя:', data.name || '');
    if (newName === null) return;
    const trimmed = newName.trim();
    if (!trimmed) return;
    data.name = trimmed;
    saveUser(data);
    const nameEl = document.getElementById('userName');
    if (nameEl) nameEl.textContent = trimmed;
    refreshAccountMenu();
    closeAccountDropdown();
    closeMobileMenu();
}

function resizeImageToDataUrl(file, size, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            const minSide = Math.min(img.width, img.height);
            const sx = (img.width - minSide) / 2;
            const sy = (img.height - minSide) / 2;
            ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
            callback(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = () => callback(null);
        img.src = event.target.result;
    };
    reader.onerror = () => callback(null);
    reader.readAsDataURL(file);
}

function changeAvatar() {
    const data = getSavedUser();
    if (!data) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', () => {
        const file = input.files?.[0];
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
            refreshAccountMenu();
            window.dispatchEvent(new CustomEvent('netija:auth-changed'));
            closeAccountDropdown();
            closeMobileMenu();
        });
    });
    input.click();
}

function logout() {
    if (!window.confirm('Выйти из аккаунта?')) return;
    localStorage.removeItem('netija_user');
    localStorage.removeItem('netija_premium_header_status');
    location.reload();
}

function buildAccountMenu() {
    const userProfile = document.getElementById('userProfile');
    const headerList = document.querySelector('.header__list');
    if (!userProfile || !headerList) return;

    userProfile.style.position = 'relative';
    userProfile.style.cursor = 'pointer';
    userProfile.title = '';

    if (!document.getElementById('accountDropdown')) {
        const dropdown = document.createElement('div');
        dropdown.id = 'accountDropdown';
        dropdown.className = 'account-dropdown';

        const avatarBtn = document.createElement('button');
        avatarBtn.type = 'button';
        avatarBtn.textContent = 'Изменить аватар';
        avatarBtn.addEventListener('click', event => {
            event.stopPropagation();
            changeAvatar();
        });

        const renameBtn = document.createElement('button');
        renameBtn.type = 'button';
        renameBtn.textContent = 'Изменить имя';
        renameBtn.addEventListener('click', event => {
            event.stopPropagation();
            changeName();
        });

        const logoutBtn = document.createElement('button');
        logoutBtn.type = 'button';
        logoutBtn.className = 'danger';
        logoutBtn.textContent = 'Выйти из аккаунта';
        logoutBtn.addEventListener('click', event => {
            event.stopPropagation();
            logout();
        });

        dropdown.append(avatarBtn, renameBtn, logoutBtn);
        userProfile.appendChild(dropdown);
    }

    if (!userProfile.dataset.accountBound) {
        userProfile.dataset.accountBound = '1';
        userProfile.addEventListener('click', event => {
            event.stopPropagation();
            document.getElementById('accountDropdown')?.classList.toggle('open');
        });
    }

    if (!document.getElementById('accountItemsMobile')) {
        const marker = document.createElement('li');
        marker.id = 'accountItemsMobile';
        marker.style.display = 'none';
        headerList.appendChild(marker);

        const loginItem = document.createElement('li');
        loginItem.id = 'loginItemMobile';
        loginItem.className = 'header__list-item account-item login-item';
        loginItem.innerHTML = `
            <div class="login-item-label">Войти в аккаунт</div>
            <div id="googleSignInButtonMobile" class="login-item-button"></div>
        `;
        headerList.appendChild(loginItem);

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

async function updateMobilePremiumCard() {
    const card = document.querySelector('.mobile-premium-card');
    if (!card) return;

    const title = card.querySelector('.mobile-premium-copy strong');
    const subtitle = card.querySelector('.mobile-premium-copy small');
    if (!title || !subtitle) return;

    const user = getSavedUser();
    if (!user?.email) {
        title.textContent = 'Купить Premium';
        subtitle.textContent = 'Открой все возможности';
        return;
    }

    try {
        const response = await fetch(`${NETIJA_BACKEND_URL}/api/premium/status?email=${encodeURIComponent(user.email)}`, { cache: 'no-store' });
        const status = response.ok ? await response.json() : { premium: false };
        const active = !!status?.premium && (!status.premiumUntil || new Date(status.premiumUntil).getTime() > Date.now());

        title.textContent = active ? 'Premium активен' : 'Купить Premium';
        subtitle.textContent = active ? 'Спасибо, что вы с нами!' : 'Доступ ко всем возможностям';
        card.classList.toggle('premium-card-active', active);
        card.classList.toggle('premium-card-inactive', !active);

        try {
            localStorage.setItem('netija_premium_header_status', JSON.stringify({
                premium: active,
                premiumUntil: status.premiumUntil || null
            }));
        } catch (_) {}
    } catch (_) {
        title.textContent = 'Купить Premium';
        subtitle.textContent = 'Доступ ко всем возможностям';
        card.classList.remove('premium-card-active');
        card.classList.add('premium-card-inactive');
    }
}

function injectMobileAccountStyles() {
    if (document.getElementById('netija-account-status-css')) return;
    const style = document.createElement('style');
    style.id = 'netija-account-status-css';
    style.textContent = `
        @media (max-width:700px){
            .site-header .login-item{padding-left:0!important;padding-right:0!important;}
            .site-header .login-item .account-status-card{
                width:100%!important;
                min-height:58px!important;
                box-sizing:border-box!important;
                display:flex!important;
                align-items:center!important;
                gap:12px!important;
                padding:8px 14px!important;
                margin:0!important;
                border-radius:14px!important;
                background:rgba(255,255,255,.08)!important;
                border:1px solid rgba(130,168,224,.16)!important;
                color:#fff!important;
            }
            .site-header .account-status-avatar{width:38px!important;height:38px!important;min-width:38px!important;border-radius:50%!important;overflow:hidden!important;background:rgba(80,103,180,.5)!important;display:flex!important;align-items:center!important;justify-content:center!important}
            .site-header .account-status-avatar img{width:100%!important;height:100%!important;object-fit:cover!important}
            .site-header .account-status-copy{min-width:0!important;flex:1!important;display:flex!important;flex-direction:column!important;gap:2px!important;text-align:left!important}
            .site-header .account-status-copy strong{font:700 13px/1.2 Poppins,sans-serif!important;color:#fff!important}
            .site-header .account-status-copy small{font:400 10px/1.2 Poppins,sans-serif!important;color:rgba(255,255,255,.65)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
            .site-header .account-status-check{width:26px!important;height:26px!important;border-radius:50%!important;background:#25c77b!important;color:#fff!important;display:flex!important;align-items:center!important;justify-content:center!important;font-size:15px!important;font-weight:800!important;flex:0 0 26px!important}
            .site-header .login-item:has(.account-status-card)::before,.site-header .login-item:has(.account-status-card)::after{display:none!important}
        }
    `;
    document.head.appendChild(style);
}

window.onload = function () {
    buildAccountMenu();
    injectMobileAccountStyles();

    if (window.google?.accounts?.id) {
        google.accounts.id.initialize({
            client_id: '984110914315-9sok5k93urleertcgtfgtui5tshqfni4.apps.googleusercontent.com',
            callback: handleGoogleLogin
        });

        const desktopSignIn = document.getElementById('googleSignInButton');
        if (desktopSignIn) {
            google.accounts.id.renderButton(desktopSignIn, {
                theme: 'outline',
                size: 'large',
                type: 'icon'
            });
        }

        const mobileSignIn = document.getElementById('googleSignInButtonMobile');
        if (mobileSignIn) {
            google.accounts.id.renderButton(mobileSignIn, {
                theme: 'filled_blue',
                size: 'large',
                text: 'signin_with',
                shape: 'rectangular',
                width: 300
            });
        }
    }

    const savedUser = getSavedUser();
    if (savedUser) {
        showUserProfile(savedUser);
    }

    refreshAccountMenu();
    updateMobilePremiumCard();

    window.addEventListener('resize', refreshAccountMenu);
};