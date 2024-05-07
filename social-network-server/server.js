const mongoose = require('mongoose');
const readlineSync = require('readline-sync');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/social_network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Main menu
const mainMenu = () => {
  console.log("1) Login 2) Register 3) Quit");
  const choice = readlineSync.questionInt("Choose an option: ");
  switch (choice) {
    case 1:
      login();
      break;
    case 2:
      register();
      break;
    case 3:
      console.log("Goodbye!");
      process.exit(0);
    default:
      console.log("Invalid choice.");
      mainMenu();
  }
};

// Login function
const login = () => {
  const username = readlineSync.question("Enter your username: ");
  const password = readlineSync.question("Enter your password: ", { hideEchoBack: true });

  User.findOne({ username, password })
    .then((user) => {
      if (user) {
        user.online = true;
        return user.save();
      } else {
        console.log("Invalid username or password");
        mainMenu();
      }
    })
    .then(() => {
      console.log("Login successful");
      mainMenu();
    })
    .catch((err) => {
      console.error(err);
      mainMenu();
    });
};

// Register function
const register = () => {
  const username = readlineSync.question("Enter a new username: ");
  const password = readlineSync.question("Enter a new password: ", { hideEchoBack: true });
  const email = readlineSync.question("Enter your email: ");

  User.findOne({ $or: [{ username }, { email }] })
    .then((existingUser) => {
      if (existingUser) {
        console.log("Username or email already exists");
        mainMenu();
      } else {
        const newUser = new User({ username, password, email });
        return newUser.save();
      }
    })
    .then(() => {
      console.log("Registration successful");
      mainMenu();
    })
    .catch((err) => {
      console.error(err);
      mainMenu();
    });
};

// Start the application
mainMenu();
