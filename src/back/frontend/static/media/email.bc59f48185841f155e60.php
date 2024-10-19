<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login and Retrieve Email</title>
</head>
<body>
    <!-- Login Form -->
    <form id="loginForm">
        <input type="email" id="email" placeholder="Email" required><br>
        <input type="password" id="password" placeholder="Password" required><br>
        <button type="submit">Login</button>
    </form>

    <br>

    <!-- Button to retrieve email -->
    <button onclick="getEmail()">Get Stored Email</button>

    <script>
        // Handle login form submission
        document.getElementById('loginForm').addEventListener('submit', function (event) {
            event.preventDefault();  // Prevent form from submitting traditionally
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Send login request to the server using fetch
            fetch('login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'email': email,
                    'password': password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Save the email in localStorage
                    localStorage.setItem('user_email', data.email);
                    alert('Login successful, email saved');
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });

        // Function to retrieve the email from localStorage
        function getEmail() {
            const email = localStorage.getItem('user_email');
            if (email) {
                console.log('Stored email:', email);
                alert('Stored email: ' + email);
            } else {
                alert('No email found in localStorage');
            }
        }
    </script>
</body>
</html>
