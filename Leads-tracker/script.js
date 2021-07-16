const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

let myLeads = [];
const regexPattern = /(http|https):\u002F\u002F*\u002E*/;

const saveLead = function(input) {
  const inputData = input.trim();
  if(regexPattern.test(inputData) && !/\s+/.test(inputData)) {
    if(!myLeads.includes(inputData)) {
      myLeads.unshift(inputData);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));      
      renderLeads(myLeads);
    }
    inputEl.value = "";
  }  
}

const deleteAllLeads = function() {
  myLeads = [];
  localStorage.clear("myLeads");
  renderLeads(myLeads);
}

function renderLeads(leads) {
  let listItems = "";
  for(let i = 0; i < leads.length; i++) {
    listItems += `<li>
      <a target='_blank' href=${leads[i]}>${leads[i]}</a>
    </li>`;
  }
  ulEl.innerHTML = listItems;
}

const leadsFromStorange = JSON.parse(localStorage.getItem("myLeads"));
if(leadsFromStorange) {
  myLeads = leadsFromStorange;
  renderLeads(myLeads);  
}

saveBtn.addEventListener("click", function() {saveLead(inputEl.value)});
tabBtn.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    saveLead(tabs[0].url);
  });
})
deleteBtn.addEventListener("dblclick", deleteAllLeads);



