let email = document.getElementById("exampleInputEmail1")
let password = document.getElementById("exampleInputPassword1")
let confirm_pass = document.getElementById("exampleConfirmPassword1")
let log_email = document.getElementById("exampleInputEmail11")
let log_pass = document.getElementById("exampleInputPassword12")
let error_log_email = document.getElementById("error-log-email")
let error_log_pass = document.getElementById("error-log-pass")
let error_pass = document.getElementById("error-pass")
let error_pass_up = document.getElementById("error-pass-up")
let error_pass_dw = document.getElementById("error-pass-dw")
let error_pass_sym = document.getElementById("error-pass-sym")
let error_pass_dig = document.getElementById("error-pass-dig")
let error_conf_pass = document.getElementById("error-conf-pass")
form = document.querySelector('.form')
login = document.querySelector('.login')
logout = document.getElementById('logout')
let ok = false
let check = false
let arr_email = [document.getElementsByClassName("email").value]
let arr_pass = [document.getElementsByClassName("password").value]
let reset_pass = document.getElementById("reset")
let hello = document.getElementById("hidden")
let time = document.querySelector('.timeout')
let Timeout = false

form.addEventListener('submit',function (event){
    event.preventDefault()
    Pass()
    ConfirmPass()
    if(ok){
        arr_email.push(email.value)
    }
    if(ok){
        arr_pass.push(password.value)
    }

    setTimeout(function (){
        Timeout = true
    }, 60000)

    console.log(arr_email)
    console.log(arr_pass)
    email.value = ''
    password.value = ''
    confirm_pass.value = ''
})

login.addEventListener('submit',function (event){
    event.preventDefault()
    Login()

    if (check){
        hello.style.display = 'block'
        hello.innerText = 'Hello ' + `${log_email.value}`
        if(Timeout){
            time.style.display = 'block'
            setTimeout(function (){
                time.style.display = 'none'
            },20000)
        }

        logout.style.display = 'block'
    }
    log_email.value=''
    log_pass.value = ''

})


function Logout() {
    hello.style.display = 'none'
    hello.value = ''
    time.style.display = 'none'
    Timeout = true
    logout.style.display = 'none'

}


function Pass() {

    let lowerCaseLetters = /[a-z]/g;
    if(password.value.match(lowerCaseLetters)) {
        ok = true
        error_pass_dw.style.display = 'none'
        error_pass_up.innerText = ''
    } else {
        ok = false
        error_pass_dw.style.display = 'block'
        error_pass_up.innerText = 'Отсутствуют буквы нижнего регистра'
    }

    let upperCaseLetters = /[A-Z]/g;
    if(password.value.match(upperCaseLetters)) {
        ok = true
        error_pass_up.style.display = 'none'
        error_pass_up.innerHTML = ''

    } else {
        ok = false
        error_pass_up.style.display = 'block'
        error_pass_up.innerHTML = 'Отсутствуют буквы верхнего регистра'
    }


    let numbers = /[0-9]/g;
    if(password.value.match(numbers)) {
        ok = true
        error_pass_dig.style.display = 'none'
        error_pass_dig.innerHTML = ''
    } else {
        ok = false
        error_pass_dig.style.display = 'block'
        error_pass_dig.innerHTML = 'Отсутствуют цифры регистра'
    }

    let symbols = /[!@#$%^&*()_={}|;"<,>.+?/-]/g
    if(password.value.match(symbols)){
        ok = true
        error_pass_sym.style.display = 'none'
        error_pass_sym.innerHTML = ''
    } else{
        ok = false
        error_pass_sym.style.display = 'block'
        error_pass_sym.innerHTML = 'Отсутствуют специальные символы регистра'
    }
    if(password.value.length < 8) {
        ok = false
        error_pass.style.display = 'block'
        error_pass.innerHTML = 'Пароль не может быть короче 8 символов'
    }
    else{
        ok = true
        error_pass.style.display = 'none'
        error_pass.innerHTML = ''
    }

}

function ConfirmPass(){
    if (confirm_pass.value != password.value){
        ok = false
        error_conf_pass.style.display = 'block'
        error_conf_pass.innerHTML = 'Пароли не совпадают'
    }
    else{
        ok = true
        error_conf_pass.style.display = 'none'
        error_conf_pass.innerHTML = ''
    }
}

let tries=0
function Login(){

    for(let i=1; i<arr_email.length; i++){
        if (arr_email[i] == log_email.value){
            check = true
            error_log_email.style.display = 'none'
            error_log_email.innerText = ''

        }
        else {
            check = false
            error_log_email.style.display = 'block'
            error_log_email.innerText = 'Данный email не зарегистрирован'
        }
    }

    for (let j=1; j<arr_pass.length; j++){
        if(arr_pass[j] == log_pass.value){
            check = true
            error_log_pass.style.display = 'none'
            error_log_pass.innerText = ''
            tries =0

        }
        else if (arr_pass[j] != log_pass.value){
            check = false
            tries ++
            error_log_pass.style.display = 'block'
            error_log_pass.innerText = 'Неправильный пароль'

            if(tries==3){
                log_pass.disabled = true
                error_log_pass.style.display = 'none'
                error_log_pass.innerText = ''
                reset_pass.style.display = 'block'
                tries=0

            }
            else{
                reset_pass.style.display = 'none'
                log_pass.disabled = false
            }
        }
    }
}





