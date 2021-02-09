/**
 * The main application
 */

const initApp = () => {
  document.querySelector('#loginForm').addEventListener('submit', login);
}

const login = (e) => {
  // prevent default behaviour
  e.preventDefault();

  // create a form data object
  const formData = new FormData(e.target);

  console.log(formData.get("username"));

  // const values = formData.values();
  // for(const value of values) console.log(value);

  // formData.append('secret', 'I Love My Little Pony');
  // formData.append('secret', 'I Love Gremlins');

  formData.set('secret', 'I set something');
  formData.set('secret', 'I said something');

  // console.log(formData.get('secret'));
  console.log(formData.getAll('secret'));

  // console.log(formData.has('usernamedsqf'));

  console.log(formData.delete('username'));
  console.log(formData.has('username'));

  const entries = formData.entries();
  for(const entry of entries) console.log(entry);

  const keys = formData.keys();
  for(const key of keys) console.log(key);

}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
