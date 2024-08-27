function register(event) {
    event.preventDefault();

    const username = document.querySelector('input[placeholder="Nombre de usuario"]').value; //uso query selector para tomar los datos del input que dice Nombre de usuario
    const email = document.querySelector('input[placeholder="Correo electrónico"]').value;
    const password = document.querySelector('input[placeholder="Contraseña"]').value;
    const confirmPassword = document.querySelector('input[placeholder="Repite tu contraseña"]').value;

    // Validación de nombre de usuario
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{7,14}$/;
    if (!usernameRegex.test(username)) {
        alert("El nombre de usuario debe tener entre 8 y 15 caracteres, no contener espacios, y no iniciar con números o caracteres especiales.");
        return;
    }

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    // Validación de contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,20}$/;
    if (!passwordRegex.test(password)) {
        alert("La contraseña debe tener entre 12 y 20 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un caracter especial.");
        return;
    }

    // Validación de confirmación de contraseña
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Recuperar la lista de usuarios del localStorage, o inicializarla si no existe
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Comprobar si el nombre de usuario o el correo ya existen
    const userExists = users.some(user => user.username === username || user.email === email);
    if (userExists) {
        alert("El nombre de usuario o el correo electrónico ya están registrados.");
        return;
    }

    // Crear el objeto usuario
    const user = {
        user_Id : users.length + 1,
        username: username,
        email: email,
        password: password
    };

    // Añadir el nuevo usuario al array de usuarios
    users.push(user);

    // Guardar el array de usuarios actualizado en localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert("Registro exitoso");
    window.location.href = "sign-in.html"

}
