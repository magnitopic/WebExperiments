const check =document.getElementById("check")

if (localStorage.getItem('darkMode')===null){
    localStorage.setItem('darkMode', "false");
}

checkStatus()

function checkStatus(){
    if (localStorage.getItem('darkMode')==="true"){
        check.checked = true;
        document.getElementsByTagName("p")[0].style.color="#FFF";
        document.body.style.backgroundColor = "#181A1B";
    }else{
        check.checked = false;
        document.getElementsByTagName("p")[0].style.color="black";
        document.body.style.backgroundColor = "#FFF";
    }
}

function changeStatus(){
    if (localStorage.getItem('darkMode')==="true"){
        localStorage.setItem('darkMode', "false");
        document.getElementsByTagName("p")[0].style.color="black";
        document.body.style.backgroundColor = "#FFF";
    } else{
        localStorage.setItem('darkMode', "true");
        document.getElementsByTagName("p")[0].style.color="#FFF";
        document.body.style.backgroundColor = "#181A1B";
    }
}