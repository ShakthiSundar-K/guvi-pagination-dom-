let title = document.createElement("h1");
title.setAttribute('id', 'title');
title.innerText = "Pagination Task:";
document.body.appendChild(title);

let description = document.createElement("p");
description.setAttribute('id', 'description');
description.innerHTML = "&nbsp; The task is done so that it dynamically adds page buttons as per the content";
document.body.appendChild(description);

const condiv = document.getElementsByClassName("table-responsive")[0];
const pagdiv = document.getElementById("buttons");
let data = [];
let currentPage = 1;
const itemsPerPage = 10;

document.addEventListener('DOMContentLoaded', () => {
  // fetching the data from the url
  fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
    .then(res => res.json()) // converting the response to json format
    .then(jsonData => {
      data = jsonData; // storing the json in an array
      displayContent(currentPage);
      createPageButton();
    });
});

// function to display contents of a page dynamically
function displayContent(page) {
    condiv.innerHTML = ''; // Clear existing content
  
    let start = (page - 1) * itemsPerPage;
    let stop = start + itemsPerPage;
    let paginatedContent = data.slice(start, stop);
  
    let table = document.createElement("table");
    table.setAttribute('class', 'table table-bordered text-center');
  
    let headerRow = document.createElement("tr");
    let th1 = document.createElement("th");
    th1.innerText = "ID";
    let th2 = document.createElement("th");
    th2.innerText = "NAME";
    let th3 = document.createElement("th");
    th3.innerText = "EMAIL";
  
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    headerRow.appendChild(th3);
    table.appendChild(headerRow);
  
    paginatedContent.forEach(item => {
      let dataRow = document.createElement("tr");
      let td1 = document.createElement("td");
      td1.innerText = item.id;
      let td2 = document.createElement("td");
      td2.innerText = item.name;
      let td3 = document.createElement("td");
      td3.innerText = item.email;
  
      dataRow.appendChild(td1);
      dataRow.appendChild(td2);
      dataRow.appendChild(td3);
  
      table.appendChild(dataRow);
    });
  
    condiv.appendChild(table); // Append table to condiv
  }

// function to create pages button dynamically
function createPageButton() {
  let totalPages = Math.ceil(data.length / itemsPerPage); // total number of pages for iteration to create that many buttons
  pagdiv.innerHTML = '';

  let firstButton = document.createElement("button");
  firstButton.innerText = "First";
  firstButton.addEventListener('click', () => {
    currentPage = 1;
    displayContent(currentPage);
  });
  pagdiv.appendChild(firstButton);

  let prevButton = document.createElement("button");
  prevButton.innerText = "Previous";
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayContent(currentPage);
    }
  });
  pagdiv.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    let button = document.createElement("button");
    button.innerText = i;
    button.addEventListener('click', () => { // onClick the currentPage will be set and it will be passed as an argument to displayContent
      currentPage = i;
      displayContent(currentPage);
    });
    pagdiv.appendChild(button);
  }

  let nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      currentPage++;
      displayContent(currentPage);
    }
  });
  pagdiv.appendChild(nextButton);

  let lastButton = document.createElement("button");
  lastButton.innerText = "Last";
  lastButton.addEventListener('click', () => {
    currentPage = Math.ceil(data.length / itemsPerPage);
    displayContent(currentPage);
  });
  pagdiv.appendChild(lastButton);
}
