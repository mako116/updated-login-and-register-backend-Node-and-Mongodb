// app.js
const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const API_URL = 'http://localhost:3000'; // URL of your server

function mainMenu() {
    console.log('Welcome to the Social Network Console App');
    console.log('1) Login');
    console.log('2) Register');
    console.log('3) Quit');
    rl.question('Choose an option: ', (option) => {
        switch (option) {
            case '1':
                login();
                break;
            case '2':
                register();
                break;
            case '3':
                console.log('Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid option');
                mainMenu();
        }
    });
}

function login() {
    function login() {
        rl.question('Enter username: ', (username) => {
            rl.question('Enter password: ', (password) => {
                axios.post(`${API_URL}/login`, { username, password })
                    .then(response => {
                        console.log(response.data.message);
                        // Implement further functionality after successful login
                        mainMenu();
                    })
                    .catch(error => {
                        console.error(error.response.data.message);
                        mainMenu();
                    });
            });
        });
    }}

function register() {

    function register() {
        rl.question('Enter username: ', (username) => {
            rl.question('Enter password: ', (password) => {
                rl.question('Enter email: ', (email) => {
                    axios.post(`${API_URL}/register`, { username, password, email })
                        .then(response => {
                            console.log(response.data.message);
                            mainMenu();
                        })
                        .catch(error => {
                            console.error(error.response.data.message);
                            mainMenu();
                        });
                });
            });
        });
    }
    }

mainMenu();


