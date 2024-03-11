"use strict";

const popup = document.querySelector(".popup");
const wifiIcon = document.querySelector(".icon i");
const popupTitle = document.querySelector(".popup .title");
const popupDesc = document.querySelector(".desc");
const reconnectBtn = document.querySelector('.reconnect');

let isOnline = true,
  intervalId,
  timer = 10;

const checkConnection = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
  } catch (error) {
    isOnline = false;
  }
  clearInterval(intervalId);
  handlePopup(isOnline);
};

const handlePopup = (status) => {
  if (status) {
    wifiIcon.className = "uil uil-wifi";
    popupTitle.innerText = "Restored Connection";
    popupDesc.innerText = "You are connected to the internet";
    popup.classList.add("online");
    return setTimeout(() => popup.classList.remove("show"), 2000);
  }
  wifiIcon.className = "uil uil-wifi-slash";
  popupTitle.innerText = "Lost Connection";
  popupDesc.innerHTML =
    "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds";
  popup.className = "popup show";

  intervalId = setInterval(() => {
    timer--;
    if (timer === 0) checkConnection();
    popup.querySelector(".desc b").textContent = timer;
  }, 1000);
};

setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener('click', checkConnection);