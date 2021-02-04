const check =document.getElementById("check")

if (localStorage.getItem('darkMode')===null){
    localStorage.setItem('darkMode', "false");
}

const link = document.createElement('link');
link.rel = 'stylesheet';
document.getElementsByTagName('HEAD')[0].appendChild(link);

checkStatus()

function checkStatus(){
    if (localStorage.getItem('darkMode')==="true"){
        check.checked = true;
        link.href = './css/dark.css';
    }else{
        check.checked = false;
        link.href = '';
    }
}

function changeStatus(){
    if (localStorage.getItem('darkMode')==="true"){
        localStorage.setItem('darkMode', "false");
        link.href = '';
        //document.getElementsByTagName("p")[0].style.color="black";
        //document.body.style.backgroundColor = "#FFF";
    } else{
        localStorage.setItem('darkMode', "true");
        link.href = './css/dark.css';
        //document.getElementsByTagName("p")[0].style.color="#FFF";
        //document.body.style.backgroundColor = "#181A1B";
    }
}