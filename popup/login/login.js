const navigate_button_register = document.querySelector('.navigate-button-register')
const navigate_button_login = document.querySelector('.navigate-button-login')

const login_form = document.querySelector('.log')
const registration_form = document.querySelector('.reg')

const login_button = document.querySelector('.login-button')
const register_button = document.querySelector('.register-button')

const preloader = document.querySelector('.preloader')
const login = document.querySelector('.login')

const API_BASE = 'https://crodo.shahriyar.dev'

chrome.storage.local.get(['AUTH_TOKEN', 'USER_ID', 'USERNAME'], async function(data) {
    AUTH_TOKEN = data.AUTH_TOKEN ? data.AUTH_TOKEN : ''

    if (AUTH_TOKEN != '') {
        window.location.href = '/popup/crodo/crodo.html'
    }


    preloader.style.display = "none"
    login.style.display = "flex"
})


navigate_button_register.addEventListener('click', e => {
    e.preventDefault();
    
    login_form.style.display = "none"
    registration_form.style.display = "block"
})

navigate_button_login.addEventListener('click', e => {
    e.preventDefault();
    
    login_form.style.display = "block"
    registration_form.style.display = "none"
})

login_button.addEventListener('click', e => {
    e.preventDefault()

    username = login_form.username.value.trim()
    password = login_form.password.value

    const alert_box = login_form.querySelector('.alert')
    const url = API_BASE + '/authorize/'

    if (username == '' || password == '') {
        
        alert_box.classList.add('danger')
        alert_box.textContent = "Username and password is required"
        alert_box.style.display = "block"
        return
    }

    
    fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
            "username": username, 
            "password": password
        }),
    })
    .then(data => {
        return data.json()
    })
    .then(data => {
        if (data['error']) {
            alert_box.classList.add('danger')
            alert_box.textContent = data['error']
            alert_box.style.display = "block"

            return
        }

        alert_box.classList.remove('danger')
        alert_box.classList.add('success')
        alert_box.textContent = "Login success"
        alert_box.style.display = "block"

        chrome.storage.local.set({
            AUTH_TOKEN: data['token'],
            USER_ID: data['user_id'],
            USERNAME: username
        })

        window.location.href = '/popup/crodo/crodo.html'
    })

    
})

register_button.addEventListener('click', e => {
    e.preventDefault()

    username = registration_form.username.value.trim()
    password = registration_form.password.value
    email = registration_form.email.value.trim()

    const alert_box = registration_form.querySelector('.alert')
    const url = API_BASE + "/register/"

    if (username == '' || password == '' | email == '') {
        alert_box.classList.add('danger')
        alert_box.textContent = "All field are required"
        alert_box.style.display = "block"
        return
    } else {
        alert_box.style.display = "none"
    }

    fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
            email: email,
            password: password,
            username: username
        })
    })
    .then(data => {
        return data.json()
    })
    .then(data => {
        if (data['error']) {
            alert_box.classList.add('danger')
            alert_box.textContent = data['error']
            alert_box.style.display = "block"

            return
        } if (data['success']) {
            alert_box.classList.remove('danger')
            alert_box.classList.add('success')
            alert_box.textContent = data['success']
            alert_box.style.display = "block"

            return
        }
    })
})