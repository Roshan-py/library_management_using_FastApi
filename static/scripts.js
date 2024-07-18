const apiUrl = 'http://127.0.0.1:8000';

async function registerUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const response = await fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            role: role,
        }),
    });

    if (response.ok) {
        alert('User registered successfully');
    } else {
        alert('Error registering user');
    }
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    if (response.ok) {
        alert('Logged in successfully');
        const user = await response.json();
        localStorage.setItem('accessToken', user.accessToken);
        loadBooks();
        document.getElementById('bookTableSection').classList.remove('hidden')
        if (user.role === 'librarian') {
            document.getElementById('addBookSection').classList.remove('hidden');
            document.getElementById('registerForm').classList.add('hidden')
            document.getElementById('loginForm').classList.add('hidden')
    } else {
        document.getElementById('registerForm').classList.add('hidden')
        document.getElementById('loginForm').classList.add('hidden')
    }
}
}

async function loadBooks() {
    const response = await fetch(`${apiUrl}/books/`,{});

    if (response.ok) {
        const books = await response.json();
        const tbody = document.querySelector('#bookTable tbody');
        tbody.innerHTML = '';

        books.forEach(book => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
            `;
            tbody.appendChild(tr);
        });
    } else {
        console.error('Failed to fetch books');
    }
}


async function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    if (!title || !author || !genre) {
        alert('Please fill in all required fields!');
        return; } // Prevent form submission
    const response = await fetch(`${apiUrl}/books/add-book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            author: author,
            genre: genre,
        }),
    });

    if (response.ok) {
        alert('Book added successfully');
        loadBooks();
        document.getElementById('bookTableSection').classList.remove('hidden')
    } else {
        alert('Error adding book');
    }
}

async function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userDetails');
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('addBookSection').style.display = 'none';
    document.getElementById('bookTableSection').style.display = 'none';
    window.location.reload()
}