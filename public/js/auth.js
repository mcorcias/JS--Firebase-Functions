const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
const signOut = document.querySelector('.sign-out');

// toggle auth modals
authSwitchLinks.forEach(link => {
  link.addEventListener('click', () => {
    authModals.forEach(modal => modal.classList.toggle('active'));
  });
});

// register form
registerForm.addEventListener('submit', async e => {
  e.preventDefault();
  registerForm.querySelector('.error').textContent = '';
  const email = registerForm.email.value;
  const password = registerForm.password.value;

  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    console.log(user);
    registerForm.reset();
  } catch (err) {
    console.log(err.message);
    registerForm.querySelector('.error').textContent = err.message;
  }
});

// login form
loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  loginForm.querySelector('.error').textContent = '';
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    console.log('logges in', user);
    loginForm.reset();
  } catch (err) {
    console.log(err.message);
    loginForm.querySelector('.error').textContent = err.message;
  }
});

// sign out
signOut.addEventListener('click', async () => {
  await firebase.auth().signOut();
  console.log('signet out');
});

// auth listener
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    authWrapper.classList.remove('open');
    authModals.forEach(modal => modal.classList.remove('active'));
  } else {
    authWrapper.classList.add('open');
    authModals[0].classList.add('active');
  }
});
