/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/weather";
const appKey = "57e79cd4e8f51f008d6de0ea1c901139";
//Input elements
const feelingsInput = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");
const zipInput = document.getElementById("zip");
//Output elements
const dateDiv = document.getElementById("date");
const tempDiv = document.getElementById("temp");
const contentDiv = document.getElementById("content");
// Create a new date instance dynamically with JS
let d = new Date();
//Take care that getMonth() counts month from 0 to 11 so you need to add 1 to its result.
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

const getData = async () => {
  const request = await fetch(
    baseUrl + `?zip=${zipInput.value}&appid=${appKey}&units=metric`
  );
  try {
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const postData = async (url = "", data = {}) => {
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    return request;
  } catch (err) {
    console.log(err);
  }
};

const showData = async () => {
  const request = await fetch("/all");

  try {
    const response = await request.json();
    console.log(response);
    dateDiv.innerHTML = `📅Date: ${response.date}`;
    tempDiv.innerHTML = `🌡️Temperature: ${response.temperature}°C`;
    contentDiv.innerHTML = `❤️Your Feelings: ${response.userResponse}`;
  } catch (err) {
    console.log(err);
  }
};

//Button click event
generateBtn.addEventListener("click", () => {
  if (!zipInput.value) {
    alert('Please enter zip code!')
  } else {
    getData().then((data) => {
      postData("/", {
        temp: data.main.temp,
        date: newDate,
        feelings: feelingsInput.value,
      });
      showData();
    });
  }
});
