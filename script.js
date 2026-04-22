
let subjects = [];

const departmentData = {
    ECE: {
        "Signals and Systems": 4,
        "Analog Electronics": 3,
        "Analog Communication": 2,
        "Linear Integrated Circuits": 3,
        "Digital Electronics": 3,
        "Data Structures": 3,
        "Probability and Random Processes": 3,
        "Analog Electronics Laboratory": 2,
        "Design Studio": 1
    },

    AIDS: {
        "Probability Theory and Distributions": 4,
        "Ethics and Holistic Life": 3,
        "Foundations of Data Science": 3,
        "Programming using Java": 3,
        "Data Structures Design": 3,
        "Fundamentals of Artificial Intelligence": 4,
        "Data Science Laboratory": 2,
        "Java Laboratory": 1,
        "Design Studio": 1
    },

    CSE: {
        "Discrete Mathematics": 4,
        "Computer Organization and Architecture": 3,
        "Database Management Systems": 3,
        "Data Visualization": 4,
        "Data Structures": 3,
        "Java Programming": 3,
        "DBMS Laboratory": 2,
        "Design Studio": 1
    },

    BME: {
        "Linear Algebra and Complex Analysis": 4,
        "Human Anatomy and Physiology": 3,
        "Biomaterials and Artificial Organs": 3,
        "Biomedical Sensors": 3,
        "Digital Electronics": 3,
        "Data Structures": 3,
        "Biomedical Sensors and Instrumentation Laboratory": 2,
        "Human Anatomy and Physiology Laboratory": 2,
        "Design Studio": 1
    },

    IT: {
        "Discrete Mathematics": 4,
        "Computer Organization and Architecture": 3,
        "Ethics and Holistic Life": 3,
        "Computer Graphics And Visualization": 4,
        "Data Structures": 3,
        "Programming using Java": 3,
        "JAVA Laboratory": 1,
        "Design Studio": 1
    },

    AIML: {
        "Probability and Statistics": 4,
        "Computer Organization and Architecture": 3,
        "Database Management Systems": 3,
        "Introduction to R Programming": 4,
        "Data Structures": 3,
        "Java Programming": 3,
        "DBMS Laboratory": 2,
        "Design Studio": 1
    },
    ME: {
        "Fourier Analysis and Boundary Value Problems": 4,
        "Engineering Thermodynamics": 4,
        "Manufacturing Technology-I": 3,
        "Engineering Materials and Metallurgy": 3,
        "Fluid Mechanics": 3,
        "Mechanics of Solids": 3,
        "Manufacturing Technology Laboratory-1": 2,
        "Design Studio - I": 1
    },
    CE: {
        "Fourier Analysis and Boundary Value Problems": 4,
        "Concrete Technology": 3,
        "Strength of Materials I": 4,
        "Engineering Survey": 4,
        "Fluid Mechanics": 3,
        "Concrete Laboratory": 3,
        "Computer Aided Drafting Laboratory": 2,
        "Design Studio - I": 1
    },
    CSBS: {
        "Discrete Mathematics": 4,
        "Computer Organization and Architecture": 3,
        "Database Management Systems": 3,
        "Exploratory Data Analysis in Business": 3,
        "Business Communication and ValueScience - III" : 2,
        "Data Structures": 3,
        "Java Programming": 3,
        "DBMS Laboratory": 2,
        "Design Studio": 1
    },
    CH: {
        "PROBABILITY AND STATISTICS": 4,
        "Process Calculations": 4,
        "Fluid mechanics for chemical engineers": 4,
        "Mechanical Operations": 3,
        "Environmental Science and Engineering": 3,
        "Technical analysis laboratory": 2,
        "Basic electrical and electronics engineering laboratory": 2,
        "Design studio - I": 1

    },
    EEE: {
        "Signals and Systems": 4,
        "Analog Electronics": 3,
        "Analog Communication": 2,
        "Linear Integrated Circuits": 3,
        "Digital Electronics": 3,
        "Data Structures": 3,
        "Probability and Random Processes": 3,
        "Analog Electronics Laboratory": 2,
        "Design Studio": 1
    },

};

const gradePoints = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5
};

function loadSubjects() {
    const dept = document.getElementById("department").value;
    const subjectSelect = document.getElementById("subject");
    const credit = document.getElementById("credit");
    const customInput = document.getElementById("customSubject");

    subjectSelect.innerHTML = `<option value="">-- Select Subject --</option>`;
    credit.value = "";
    credit.readOnly = true;
    customInput.style.display = "none";

    if (dept === "CUSTOM") {
        subjectSelect.innerHTML += `<option value="CUSTOM_SUBJECT">Custom Subject</option>`;
        return;
    }

    if (!departmentData[dept]) return;

    Object.keys(departmentData[dept]).forEach(sub => {
        const opt = document.createElement("option");
        opt.value = sub;
        opt.textContent = sub;
        subjectSelect.appendChild(opt);
    });
}

function handleSubjectChange() {
    const dept = document.getElementById("department").value;
    const subject = document.getElementById("subject").value;
    const credit = document.getElementById("credit");
    const customInput = document.getElementById("customSubject");

    if (dept === "CUSTOM" || subject === "CUSTOM_SUBJECT") {
        customInput.style.display = "block";
        credit.readOnly = false;
        credit.value = "";
    } else {
        customInput.style.display = "none";
        credit.readOnly = true;
        credit.value = departmentData[dept][subject];
    }
}

function addSubject() {
    const dept = document.getElementById("department").value;
    let subject = document.getElementById("subject").value;
    const grade = document.getElementById("grade").value;
    const credit = parseInt(document.getElementById("credit").value);
    const error = document.getElementById("error");

    if (subject === "CUSTOM_SUBJECT") {
        subject = document.getElementById("customSubject").value.trim();
    }

    if (!dept || !subject || isNaN(credit)) {
        error.textContent = "Please fill all fields correctly";
        return;
    }

    error.textContent = "";
    subjects.push({ dept, subject, grade, credit });
    displaySubjects();
}

function displaySubjects() {
    const list = document.getElementById("subjectList");
    list.innerHTML = "";

    subjects.forEach((s, i) => {
        list.innerHTML += `
            <tr>
                <td>${s.dept}</td>
                <td>${s.subject}</td>
                <td>${s.grade}</td>
                <td>${s.credit}</td>
                <td><button class="reset" onclick="deleteSubject(${i})">Delete</button></td>
            </tr>
        `;
    });
}

function deleteSubject(i) {
    subjects.splice(i, 1);
    displaySubjects();
}

function calculateCGPA() {
    let totalCredits = 0, totalPoints = 0;

    subjects.forEach(s => {
        totalCredits += s.credit;
        totalPoints += gradePoints[s.grade] * s.credit;
    });

    const cgpa = totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
    document.getElementById("cgpa").textContent = cgpa;
}

function resetAll() {
    subjects = [];
    document.getElementById("subjectList").innerHTML = "";
    document.getElementById("cgpa").textContent = "0.00";
}
