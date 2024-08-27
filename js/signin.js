function login(event){
    event.preventDefault()
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const username = document.querySelector('input[placeholder="Nombre de usuario"]').value; //uso query selector para tomar los datos del input que dice Nombre de usuario
    const password = document.querySelector('input[placeholder="Contraseña"]').value;

    const user = users.find(user => 
        user.username === username && user.password === password
    );
    if (user){
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = "home.html"
    } else {
        alert("El usuario/contraseña ingresados no existe o es incorrecto")
        return;
    }
}