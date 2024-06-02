const addBox = document.querySelector(".add-box");
const popBox = document.querySelector(".popup-box");
const popTitle= popBox.querySelector("header p");
const closeIcon = document.querySelector("header i");
const titleTag = document.querySelector("input");
const descTag = document.querySelector("textarea");
const addBtn = document.querySelector("form button");

const notes=JSON.parse(localStorage.getItem("notes" || "{}"));

let isUpdate=false,updateId;

function showNotes(){
    notes.forEach((note,index)=>{
        let liTag=`<li class="notes">
                <div class="details">
                    <p>${note.title}</p>
                    <span>${note.description}</span>
                </div>
                <div class="bottom-content">
                    <span>${note.date}</span>
                    <div class="settings">
                        <i onClick="showMenu(this)" class="bi bi-three-dots""></i>
                        <ul class="menu">
                            <li onClick="updateNote(${index},'${note.title}','${note.description}')"><i class="bi bi-pencil-fill"></i></i>Edit</li>
                            <li onClick="deleteNote(${index})"><i class="bi bi-trash"></i>Delete</li>
                        </ul>
                    </div>
                </div>
            </li>`;
        addBox.insertAdjacentHTML('afterend',liTag);
    });
}

showNotes();

function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener('click',e=>{
        if(e.target.tagName != 'I' || e.target != elem ){
            elem.parentElement.classList.remove("show");
        }
    })
}

function deleteNote(noteId){
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId,1);
    localStorage.setItem("notes",JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId,title,filterDesc){
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId=noteId;
    isUpdate=true;
    addBox.click();
    titleTag.value=title;
    descTag.value=description;
    addBtn.innerHTML="Update Note";
    popTitle.innerHTML="Update your Note";   
    
}

addBox.addEventListener("click", () => {
    popTitle.innerText = "Add a new Note";
    addBtn.innerText = "Add Note";
    titleTag.focus();
    popBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    popBox.classList.remove("show");
    titleTag.value="";
    descTag.value="";
    document.querySelector("body").style.overflow = "auto";
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value.trim();
  let noteDesc = descTag.value.trim();
  

  if(noteTitle || noteDesc){
    let dateObj = new Date(),
    noteDate = dateObj.toLocaleDateString();
    let noteInfo = {
        title: noteTitle,
        description: noteDesc,
        date: noteDate,
      };
      if(!isUpdate){
        notes.push(noteInfo);
      }
      else{
        isUpdate=false;
        notes[updateId]=noteInfo;
      }
      localStorage.setItem("notes",JSON.stringify(notes));
      closeIcon.click();
      showNotes();
  }
});