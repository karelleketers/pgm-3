const app = {
  init() {
    // lege array declareren
    this.students = [];
    // elementen uit de DOM cachen
    this.cacheElements();
    // alle studenten ophalen uit de api
    this.fetchAllStudents();

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
      const _id = e.target.dataset.id;
      this.deleteStudentFromAPI(_id);
    });
  },
  async deleteStudentFromAPI(_id) {
    const data = {
      _id: _id,
    };

    await fetch("http://wearepgm.incloudspace.be/student", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  async sendStudentToAPI() {
    // alert("POST zal hier plaatsvinden");

    // code paste https://pastebin.com/iaw9BDzL
    const newStudent = {
      hobbies: [
        "wandelen",
        "feesten als de beesten",
        "schaatsen",
        "rollerbladen",
        "programming, off course",
      ],
      firstname: "Frederick",
      lastname: "Roegiers",
      nickname: "F-Rogers",
      classname: "1PGM-a",
      email: "frederick.roegiers@arteveldehs.be",
      age: 30,
      avatar:
        "https://i.postimg.cc/7Lfp5m2C/102330147-10221048356452121-7711759486733516800-o.jpg",
      motto: "Never argue with the code, nor with me, muahaha",
      about: "Bezige bij met een hart voor studenten",
    };

    const response = await fetch("http://wearepgm.incloudspace.be/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    });
    console.log(response);
    // const id
  },
  async fetchAllStudents() {
    // fetchen
    const response = await fetch("http://wearepgm.incloudspace.be/student", {
      method: "GET",
    });
    if (response.status === 200) {
      this.students = await response.json();
      this.generateHTML();
    }
  },
  generateHTML() {
    // itereren door studenten via een for... of loop
    // kan ook met .map , foreach(...), ...
    for (const student of this.students) {
      console.log(student);

      const studentCard = document.createElement("article");
      studentCard.style.backgroundImage = `url('${student.avatar}')`;
      studentCard.className = "student";
      studentCard.setAttribute("data-id", student._id);
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
      this.$studentsWrapper.appendChild(studentCard);
    }
  },
};

app.init();
