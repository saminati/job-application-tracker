let applications = JSON.parse(localStorage.getItem("applications")) || [];
let editIndex = null;

function saveApplications() {
  localStorage.setItem("applications", JSON.stringify(applications));
}

function addApplication() {
  const company = document.getElementById("company").value.trim();
  const jobTitle = document.getElementById("jobTitle").value.trim();
  const applicationDate = document.getElementById("applicationDate").value;
  const status = document.getElementById("status").value;
  const interviewDate = document.getElementById("interviewDate").value;
  const notes = document.getElementById("notes").value.trim();

  if (company === "" || jobTitle === "" || applicationDate === "") {
    alert("Please enter company, job title, and application date.");
    return;
  }

  const application = {
    company,
    jobTitle,
    applicationDate,
    status,
    interviewDate,
    notes
  };

  if (editIndex === null) {
    applications.push(application);
  } else {
    applications[editIndex] = application;
    editIndex = null;
    document.querySelector(".form-card button").textContent = "Add Application";
  }

  saveApplications();
  clearForm();
  displayApplications();
}

function displayApplications() {
  const list = document.getElementById("applicationList");
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const filterStatus = document.getElementById("filterStatus").value;

  list.innerHTML = "";

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchText) ||
      app.jobTitle.toLowerCase().includes(searchText);

    const matchesStatus =
      filterStatus === "All" || app.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  if (filteredApplications.length === 0) {
    list.innerHTML = `<div class="empty">No applications found.</div>`;
    return;
  }

  filteredApplications.forEach((app, index) => {
    const realIndex = applications.indexOf(app);

    const card = document.createElement("div");
    card.className = "job-card";

    card.innerHTML = `
      <h3>${app.jobTitle}</h3>
      <p><strong>Company:</strong> ${app.company}</p>
      <p><strong>Application Date:</strong> ${app.applicationDate}</p>
      <p><strong>Status:</strong> <span class="status ${app.status}">${app.status}</span></p>
      <p><strong>Interview Date:</strong> ${app.interviewDate || "Not scheduled"}</p>
      <p><strong>Notes:</strong> ${app.notes || "No notes"}</p>

      <div class="actions">
        <button class="edit-btn" onclick="editApplication(${realIndex})">Edit</button>
        <button class="delete-btn" onclick="deleteApplication(${realIndex})">Delete</button>
      </div>
    `;

    list.appendChild(card);
  });
}

function editApplication(index) {
  const app = applications[index];

  document.getElementById("company").value = app.company;
  document.getElementById("jobTitle").value = app.jobTitle;
  document.getElementById("applicationDate").value = app.applicationDate;
  document.getElementById("status").value = app.status;
  document.getElementById("interviewDate").value = app.interviewDate;
  document.getElementById("notes").value = app.notes;

  editIndex = index;
  document.querySelector(".form-card button").textContent = "Update Application";
}

function deleteApplication(index) {
  if (confirm("Are you sure you want to delete this application?")) {
    applications.splice(index, 1);
    saveApplications();
    displayApplications();
  }
}

function clearForm() {
  document.getElementById("company").value = "";
  document.getElementById("jobTitle").value = "";
  document.getElementById("applicationDate").value = "";
  document.getElementById("status").value = "Applied";
  document.getElementById("interviewDate").value = "";
  document.getElementById("notes").value = "";
}

displayApplications();