const inputbtnEl = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const dltEl = document.getElementById("dlt-btn")
const tabEl = document.getElementById("tab-btn")

let myLeads = []

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))//fetching the stored inputs from localstorage

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabEl.addEventListener("click",function(){
    chrome.tabs.query({active: true,currentWindow: true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))//storing the inputs in localstorage
        render(myLeads)

    })
   
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
    <li> 
     <a target='_blank' href = "${leads[i]}">
     ${leads[i]}
     </a>
    </li> 
    `
    }

    ulEl.innerHTML = listItems
}

dltEl.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

//listening the save button
inputbtnEl.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""

    localStorage.setItem("myLeads", JSON.stringify(myLeads))//storing the inputs in localstorage

    render(myLeads)
})
