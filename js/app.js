/*
   TODO:
      !1. Get all html element.
      !2. deal with submit button and simple form validation.
      !3. recieve all input element and print them in to ui.
      !4. Sent all input value to local storage and print then into ui.
      !5. calculate all income and expence and print them to ui form localstorage.
      !6. complete final calculation.
*/

//! Getting requeired html element.
const form = document.querySelector('form');
const UIwrapper = document.querySelector('.dit-wrapper');
const resetLS = document.querySelector('.reset');
const incomeUI = document.querySelector('.totalInc p');
const expenceUI = document.querySelector('.totalexp p');
const balance = document.querySelector('.balance-wrapper span');

//! Dealing with submit button and simple form validation.
form.addEventListener('submit', (e)=> {
   e.preventDefault();

   const type = document.querySelector('#type').value;
   const dis = document.querySelector('#dis').value;
   const amount = document.querySelector('#amount').value;
   const formatedTime = timeUi();

   if (type && dis && amount) {
      createDom (type, dis, amount);
      sentData (type, dis, amount, formatedTime);
      reset ();
      totalIncome();
      totalBalance ();


   } else {
      alert('please fill up all input field')
   }   
})

//! creating ui element.
function createDom (type, dis, amount) {
   const formatedTime = timeUi();
   UIwrapper.insertAdjacentHTML('afterbegin', `
   <div class="item ${type === 'income' ? 'bg-white' : 'bg-danger'}">
      <div class="item-left">
         <h4 class = ${type === 'income' ? 'text-dark' : 'text-white'}>${dis}</h4>
         <p class="m-0 ${type === 'income' ? 'text-dark' : 'text-white'}"> ${formatedTime}</p>
      </div>
      <div class="item-right">
         <span class="text-success display-4 ${type === 'income' ? 'text-success' : 'text-white'}"> ${type === 'income' ? '+' : '-'} ${amount} BDT</span>
      </div>
   </div>
   `)
}

//! work with time funciton
function timeUi() {
   const now = new Date().toLocaleString('en-us', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   });

   const time = now.split(','); 
   const dateSpearate = time[0].split(' ');   
   return `${dateSpearate[1]} ${dateSpearate[0]},${time[1]}`
}
timeUi();

//! sent input value to localstorage.
function sentData (type, dis, amount, formatedTime) {
   let getData = localStorage.getItem('data');
   
   if (getData) {
      getData = JSON.parse(getData);
   } else {
      getData = [];
   }
   getData.push({type, dis, amount, formatedTime});
   localStorage.setItem('data', JSON.stringify(getData));
}

//! add localstorage's data to UI.
function LSData () {
   let lsGetData = JSON.parse(localStorage.getItem('data'));
   
   for (let item of lsGetData) {
      UIwrapper.insertAdjacentHTML('afterbegin', `
         <div class="item ${item.type === 'income' ? 'bg-white' : 'bg-danger'}">
            <div class="item-left">
               <h4 class = ${item.type === 'income' ? 'text-dark' : 'text-white'}>${item.dis}</h4>
               <p class="m-0 ${item.type === 'income' ? 'text-dark' : 'text-white'}"> ${item.formatedTime}</p>
            </div>
            <div class="item-right">
               <span class="text-success display-4 ${item.type === 'income' ? 'text-success' : 'text-white'}"> ${item.type === 'income' ? '+' : '-'} ${item.amount} BDT</span>
            </div>
         </div>
      `)
   }
}
LSData ();

//! function for reseting form after submit.
function reset () {
   document.querySelector('#type').value = 'income';
   document.querySelector('#dis').value = '';
   document.querySelector('#amount').value = '';
}

//! function for clearing the localstorage.
resetLS.addEventListener('click', cleanLS)
function cleanLS () {
   localStorage.removeItem('data');
   location.reload();
}

//! function for total income.
function totalIncome() {
   let lsGetData = JSON.parse(localStorage.getItem('data'));
   let income = 0;
   let expence = 0;
   for (let item of lsGetData) {
      if (item.type === 'income') {
         income += parseInt(item.amount);
      } else {
         expence += parseInt(item.amount);
      }
   }
   incomeUI.innerHTML = income;
   expenceUI.innerHTML = expence;
}
totalIncome();

//! function for total balance.
function totalBalance () {
   let lsGetData = JSON.parse(localStorage.getItem('data'));
   let balanceCalc = 0;
   for (let item of lsGetData) {
      if (item.type === 'income') {
         balanceCalc += parseInt(item.amount);
      } else {
         balanceCalc -= parseInt(item.amount);
      }
   }

   balance.innerHTML = `<span class ='${balanceCalc <= 0 ? 'text-danger' : 'text-sucess'}'>${balanceCalc}</span>`;   
}
totalBalance ();




