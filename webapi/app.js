import {
  saveArrayInLocalStorage,
  getArrayFromLocalStorage
}  from './localstorage.js';



const app = {
  init() {

    // lege boodschappen array
    this.groceries = getArrayFromLocalStorage('groceries');

    // console.log(this);
    this.cacheElements();
    this.registerListeners();
    this.createHTMLList();
  },
  cacheElements() {
    this.$btnAdd = document.querySelector('#add');
    this.$inpGrocery = document.querySelector('#grocery');
    this.$ulGroceries = document.querySelector('#groceries');
  },
  registerListeners() {
    this.$btnAdd.addEventListener('click', (e) => {
      // toevoeging door Mina
      e.preventDefault();

      // waarde uit de input halen
      const grocery = this.$inpGrocery.value;
      this.$inpGrocery.value = ''; // input leegmaken

      // waarde in de array steken
      (grocery!== '') ? this.groceries.push(grocery) : '';

      // wegschrijven naar web storage
      saveArrayInLocalStorage(this.groceries);

      // toevoegen als list-item
      this.$ulGroceries.innerHTML += `<li>${grocery}</li>`;
    });
  },
  createHTMLList() {
    // itereren door de groceries array
    for(const grocery of this.groceries) {
      this.$ulGroceries.innerHTML += `<li>${grocery}</li>`;
    }

  }
}

app.init();

