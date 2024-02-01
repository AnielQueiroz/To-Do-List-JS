import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";

let userIsLoggedIn = false;

const firebaseConfig = {
  apiKey: "AIzaSyDAqH21-kIftysMEdlmiU8lXgUBmlkqE1Y",
  authDomain: "todolist-26813.firebaseapp.com",
  projectId: "todolist-26813",
  storageBucket: "todolist-26813.appspot.com",
  messagingSenderId: "993154163843",
  appId: "1:993154163843:web:8a27ca3b0dfd7ca783e7b6",
  measurementId: "G-9T6QJJ7G8V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "pt-BR";
const provider = new GoogleAuthProvider();

const analytics = getAnalytics(app);

const authButton = document.getElementById('auth-button');
const authIcon = document.getElementById('auth-icon');
const authText = document.getElementById('auth-text');
const userNameDisplay = document.getElementById('username');
// const userEmailDisplay = document.getElementById('email');
const userProfileDisplay = document.getElementById('profile');

authButton.addEventListener('click', () => {
  if (auth.currentUser) {
      signOut(auth).then(() => {
          updateUIForLoggedOut();
      }).catch((error) => {
          console.error('Erro ao sair:', error);
      });
  } else {
      signInWithPopup(auth, provider)
          .then((result) => {
              const user = result.user;
              updateUIForLoggedIn(user);
          }).catch((error) => {
              console.error('Erro no login:', error);
          });
  }
});

auth.onAuthStateChanged(user => {
  if (user) {
      updateUIForLoggedIn(user);
  } else {
      updateUIForLoggedOut();
  }
});

function updateUIForLoggedIn(user) {
  userNameDisplay.textContent = user.displayName;
  // userEmailDisplay.textContent = user.email;
  userProfileDisplay.src = user.photoURL;

  authIcon.className = "fas fa-sign-out-alt";
  authText.textContent = "Sair";
}

function updateUIForLoggedOut() {
  userNameDisplay.textContent = '';
  // userEmailDisplay.textContent = '';
  userProfileDisplay.src = '';

  authIcon.className = "fab fa-google";
  // authIcon.className = "fa-solid fa-right-from-bracket";
  authText.textContent = "Login com o Google";
}