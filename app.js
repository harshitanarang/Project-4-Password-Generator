const inputSlider = document.querySelector("[length-slider]");
const passlength = document.querySelector("[Passwordlength]");
const indicator = document.querySelector("[data-indicator]");
const passwordDisplay = document.querySelector(".display");
const upper = document.querySelector("#uppercase");
const lower = document.querySelector("#lowercase");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbol");
const genbtn = document.querySelector(".generate-button");
const copybtn = document.querySelector(".copy");
const copymsg = document.querySelector("[copy-msg]");
const allcheck = document.querySelectorAll("input[type=checkbox]");

let Password = "";
let checkcount = 1;
let passwordlength =10;
const Symbols="!@#%^&*([{}]=)+_-\?/><},.;";
passwordDisplay.style.color = "white";
passwordDisplay.style.fontSize = "20px";
passwordDisplay.style.paddingLeft = "20px";
passwordDisplay.style.paddingTop = "15px";  
setIndicator("#939597");
handleSlider();
upper.checked=true;
function handleSlider() {
    inputSlider.value = passwordlength;
    passlength.innerText = passwordlength; // Reflect password length in passlength
}
 function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function getrndnumber(){
    return getRndInteger(0,9);
}
function getuppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function getlowercase(){
    return String.fromCharCode(getRndInteger(97,122));
}
function getsymbol(){
    const rndnum=getRndInteger(0,Symbols.length);
    return Symbols.charAt(rndnum);
}
function calcStrength(){
    let hasupper=false;
    let haslower=false;
    let hasnumber=false;
    let hassymbol=false;
    if(upper.checked){
        hasupper=true
    }
    if(lower.checked){
        haslower=true
    }
    if(number.checked){
        hasnumber=true
    }
    if(symbol.checked){
        hassymbol=true
    }
    if(hasupper && haslower && (hasnumber|| hassymbol) && (passwordlength>=8)){
        setIndicator("#0f0");
    }
    else if((passwordlength>=6)&&(hasupper && haslower)||(hasnumber && haslower)||(hassymbol && haslower)||(hasupper && hassymbol)||(hasupper && hasnumber)|| (hasnumber&& hassymbol)){
        setIndicator("#ff0");
    }
    else{
            setIndicator("#f00");

        }
}
 async function copyContent(){
     
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copymsg.innerText = "copied";
    }
    catch(e){
        copymsg.innerText = "failed";

    }
    copymsg.classList.add("active");
    setTimeout( ()=>{
        copymsg.classList.remove("active")
    },2000);
}

inputSlider.addEventListener('input', (e)=>{
        passwordlength=e.target.value;
        handleSlider();
    })
copybtn.addEventListener('click',(e)=>{
    if(passwordDisplay.value){
        copyContent();
    }

})
function handleCheckboxChange(){
    checkcount=0;
    allcheck.forEach((checkbox)=>{
        if (checkbox.checked){
            checkcount++;
        }
    });
    //special condition
    if(passwordlength<checkcount){
       passwordlength=checkcount;
        handleSlider();
    }

 }
allcheck.forEach((checkbox)=>{
    checkbox.addEventListener('change',(handleCheckboxChange));

})
genbtn.addEventListener('click',() => {
    if(checkcount<=0){
        return;
    }
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleSlider();
    }
    Password="";
    let funcArr=[];
    if(upper.checked){
       funcArr.push(getuppercase);

    }
    if(lower.checked){
        funcArr.push(getlowercase);

    }
    if(number.checked){
        funcArr.push(getrndnumber);

    }
    if(symbol.checked){
        funcArr.push(getsymbol);

    }
    
    for (let i = 0; i < passwordlength; i++) {
        const randIndex = getRndInteger(0, funcArr.length);
        Password += funcArr[randIndex]();
    }
    passwordDisplay.value=Password;
    calcStrength();

});

