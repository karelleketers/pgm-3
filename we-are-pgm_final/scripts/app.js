const API_URL = "http://wearepgm.incloudspace.be";

const meMyselfAndI = {
  hobbies: ["wandelen", "feesten als de beesten", "schaatsen", "rollerbladen", "programming, off course"],
  firstname: "Frederick",
  lastname: "Roegiers",
  nickname: "F-Rogers",
  classname: "1PGM-a",
  email: "frederick.roegiers@arteveldehs.be",
  age: 30,
  avatar: "https://i.postimg.cc/7Lfp5m2C/102330147-10221048356452121-7711759486733516800-o.jpg",
  motto: "Never argue with the code",
  about: "Lecturer at Artevelde University College - PGM - GDM",
};

const app = {
  init() {
    // lege array declareren
    this.students = [];
    // elementen uit de DOM cachen
    this.cacheElements();
    // alle studenten ophalen uit de api
    this.fetchAllStudents();
    // luisteren naar (click) events
    this.registerListeners();
  },
  cacheElements() {
    this.$studentsWrapper = document.querySelector("main.students");
    this.$btnAdd = document.querySelector("button#addme");
  },

  registerListeners() {
    // voeg je toe met een muisklik
    this.$btnAdd.addEventListener("click", (e) => {
      e.preventDefault();
      this.sendStudentToAPI();
    });
    // verwijder een student door erop te klikken
    this.$studentsWrapper.addEventListener("click", (e) => {
      // target should be the article, get the id from attribute data-id
      const id = e.target.dataset.id;

      // 1. remove from api
      this.deleteStudentFromAPI(id);
      // 2. remove from DOM
      e.target.remove();
    });
  },
  async deleteStudentFromAPI(_id) {
    await fetch(`${API_URL}/student`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: _id }),
    });
  },
  async sendStudentToAPI() {
    try {
      const response = await fetch(`${API_URL}/student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meMyselfAndI),
      });

      const data = await response.json();
      const id = data._id;
      console.log(id);

      // studenten opnieuw ophalen (nu zou je er zelf ook moeten bijzitten)
      this.fetchAllStudents();
    } catch (error) {
      console.error(`An error has occured`);
      console.error(error);
    }
  },
  async fetchAllStudents() {
    try {
      const response = await fetch(`${API_URL}/student`, {
        method: "GET", // optioneem
      });
      this.students = await response.json();
      this.generateHTML();
    } catch (error) {
      console.error(`An error has occured`);
      console.error(error);
    }
  },
  generateHTML() {
    // empty up the wrapper
    this.$studentsWrapper.innerHTML = "";

    // itereren door studenten via een for... of loop
    // kan ook met .map , foreach(...), ...
    for (const student of this.students) {
      // create new card
      const studentCard = document.createElement("article");
      studentCard.style.backgroundImage = `url('${student.avatar}')`;
      studentCard.className = "student";
      studentCard.setAttribute("data-id", student._id);
      // set content of card
      studentCard.innerHTML = `
        <h2 class="student__name">
            ${student.firstname} ${student.lastname}
            <br>${student.classname}</h2>
            <div class="student__info">
              <h3>${student.nickname}</h3>
              <p>Houdt van ${student.hobbies.join(", ")}</p>
              <p>${student.about}</p>
              <p><em>${student.motto}</em></p>
              <p>Contacteer me via 
                  <a href="mailto:${student.email}">${student.email}</a> 
              </p>
          </div>
        `;

      //add card to wrapper
      this.$studentsWrapper.appendChild(studentCard);
    }
  },
};

// beam me up, scotty
app.init();
