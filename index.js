
let listContainer = document.getElementById("listContainer");

let inputBox = document.getElementById("inputBox");






function onGetData(){
    let getData = localStorage.getItem("onSaveli");

    if(getData === null){

        return [];
    }
    else{
        let parsData = JSON.parse(getData);

        return parsData;
    }
}

let todoList = onGetData();








function  lineThowEffenct(checkId,lineTh,deleteId){

    let checkIdEl = document.getElementById(checkId);

    let lineIdEl = document.getElementById(lineTh);


    if(checkIdEl.checked === true){

        lineIdEl.classList.add("line-id");

    }
    else{

        lineIdEl.classList.remove("line-id");

    }


    let newTodoId = deleteId.slice(4);

    let index = todoList.findIndex((each)=> each.id == newTodoId);

    for(let i = 0; i < todoList.length; i++){
        
        if( index === i ){

            if(todoList[i].isChecked === false){

                todoList[i].isChecked = true;
            }
            else{
                todoList[i].isChecked = false
            }
        }
    }
}







function onDeleteTodo(deleteId){

    let deleteIdEl = document.getElementById(deleteId);
    
    listContainer.removeChild(deleteIdEl);

    let removeTodo = deleteId.slice(4);

    let index = todoList.findIndex((each)=> each.id == removeTodo);


    todoList.splice(index,1);

    console.log(todoList)
}


function createAndAppendTodo(todo){

   let checkId = "checkBoxId"+todo.id;

   let lineTh = "lineId" + todo.id;

   let deleteId = "todo" + todo.id;


    let listCont = document.createElement("li");

    listContainer.appendChild(listCont);

    listCont.classList.add("list-cont");
    listCont.id = deleteId;



    let checkBox = document.createElement("input");

    checkBox.type = "checkbox";


    checkBox.style.width = "18px";
checkBox.id = checkId;

if(todo.isChecked === true){
    checkBox.checked = true;
}

checkBox.onclick = function lineThow(){

    lineThowEffenct(checkId,lineTh,deleteId)
}

listCont.appendChild(checkBox);





    let labelEl = document.createElement("label");

   

    labelEl.classList.add("lebal-cont");
 labelEl.htmlFor = checkId;
 listCont.appendChild(labelEl);
 
 



let headind = document.createElement("h4");

headind.textContent = todo.title;


headind.id = lineTh;
if(todo.isChecked === true){
    headind.classList.add("line-id")
}
labelEl.appendChild(headind);




let buttonEl = document.createElement("button");


buttonEl.classList.add("btn-btn");

buttonEl.onclick = function deleteTheList(){
 
    onDeleteTodo(deleteId);

}
labelEl.appendChild(buttonEl);



let fontEl = document.createElement("i");


fontEl.classList.add("fa-solid", "fa-trash");
buttonEl.appendChild(fontEl);
        

}


for(each of todoList){

    createAndAppendTodo(each)
}



function createNewTodo(){

    let day = new Date()

    let unique = Math.ceil(Math.random()*day.getTime())

    let newTodo = {
        title :inputBox.value,

        id : unique,

        isChecked : false
    }
    
    if(inputBox.value === ""){
        alert("please write somthing heree!!")
    }
    else{

        createAndAppendTodo(newTodo);

        todoList.push(newTodo)

        inputBox.value = "";
    }
}









function onSaveData(){
    let onSave = JSON.stringify(todoList);

    localStorage.setItem("onSaveli",onSave)
}