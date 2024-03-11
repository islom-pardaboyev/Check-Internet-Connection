'use strict'

const popup = document.querySelector('.popup');

let isOnline = true;

const checkConnection = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
  } catch (error) {
    isOnline = false;
  }
  handlePopup(isOnline);
};

const handlePopup = (status) => {
    if(status){
        return popup.classList.remove('show')
    }
    popup.classList.add('show');
}

setInterval(checkConnection, 3000);
