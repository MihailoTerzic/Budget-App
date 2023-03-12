


let expenselist = new Array();



//set budget
let budgetbtn = document.querySelector("#budgetbtn")
budgetbtn.addEventListener("click", ()=> {

    let budgetinp = document.querySelector("#budget").value

    if ( budgetinp === '' || parseFloat(budgetinp) <= 0) {

        window.alert("Invalid input! Try Again!")
        document.querySelector("#budget").value = '';
    }
    else {


        let totalbudget = document.querySelector(".totalbudget")
        totalbudget.innerText = parseFloat(budgetinp)

        budgetbtn.disabled = true;
        ClearInputs();
        updateBalance();
    }
})



//set expenses
let expensesbtn = document.querySelector("#expensesbtn")
expensesbtn.addEventListener("click", ()=> {

    let expenseinp = document.querySelector("#expense").value
    let expensenameinp = document.querySelector("#expensename").value

    
    if(expenseinp === 0 || expenseinp === '' || expensenameinp === 0 || expensenameinp === '' ) {

        window.alert("Invalid input! Try again!")
        ClearInputs();
    }
    else {

        let expense = {
            value: parseFloat(expenseinp),
            name: expensenameinp
        }
        expenselist.push(expense);
        updateList();

        
        updateExpense(expenselist);
        updateBalance();
        ClearInputs();
        
    }
})

function updateExpense(val) {
    let totalexpenses = 0;
    val.forEach(element => {
        totalexpenses+= element.value;
    });
    document.querySelector(".totalexpenses").innerText = totalexpenses;
}


function ClearInputs() {
    document.querySelector("#budget").value = '';
    document.querySelector("#expense").value = '';
    document.querySelector("#expensename").value = '';
}


function updateBalance() {
    document.querySelector(".totalbalance").innerText = document.querySelector(".totalbudget").innerText - document.querySelector(".totalexpenses").innerText;
}


function updateList() {

document.querySelector("#list").innerHTML = ''; // clear list to avoid duplicating
expenselist.forEach(element => {
    let item = document.createElement('div');
    item.classList.add("d-flex","justify-content-between")
    let elemvalue =    `<h4>${element.name}</h4>
                        <h4>${element.value}</h4>`;
    item.innerHTML = elemvalue;
    let list = document.querySelector("#list");
    

    // delete button

    let deletebtn = document.createElement("button");
    deletebtn.classList.add("btn","btn-danger","btn-md")
    deletebtn.innerText = "X"
    deletebtn.addEventListener("click",()=>{
        
        expenselist.forEach(el => {
            if (el.name === deletebtn.previousElementSibling.previousElementSibling.innerHTML && el.value === parseFloat(deletebtn.previousElementSibling.innerHTML)) {
                
                let index = expenselist.indexOf(el)
                expenselist.splice(index,1);
               
                updateExpense(expenselist)
                updateBalance()
                updateList()

            }
        });
        
    })

    //modify button
    let modifybtn = document.createElement("button")
    modifybtn.classList.add("btn","btn-md","btn-info")
    modifybtn.innerText = "Edit";
    modifybtn.addEventListener("click",()=> {

        expensesbtn.disabled = true;

        document.querySelector("#expense").value = modifybtn.previousElementSibling.previousElementSibling.innerHTML;
        document.querySelector("#expensename").value = modifybtn.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;

        //apply button

        let apply = document.createElement("button");
        apply.classList.add("btn","btn-md","btn-info");
        apply.innerText = "Apply";
        apply.addEventListener("click",()=> {
            expenselist.forEach(el => {
                if (el.name === deletebtn.previousElementSibling.previousElementSibling.innerHTML && el.value === parseFloat(deletebtn.previousElementSibling.innerHTML)) {
                    
                        let index = expenselist.indexOf(el)
                        expenselist[index].name =  document.querySelector("#expensename").value
                        expenselist[index].value =  parseFloat(document.querySelector("#expense").value) }
                    
            })
            updateExpense(expenselist)
            updateBalance()
            updateList()
            ClearInputs();
            apply.remove();
            expensesbtn.disabled = false;
        })
        document.querySelector("#expenseinputs").appendChild(apply);
    })


    item.appendChild(deletebtn)
    item.appendChild(modifybtn)

    list.appendChild(item);
});
}

