window.addEventListener("load", () => {
  let longitude;
  let latitude;
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const api = `https://api.weatherapi.com/v1/current.json?key=c896fd4e79e7453fa68134302202510&q=${latitude},${longitude}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp_c } = data.current;
          const { text } = data.current.condition;
          const { country, region } = data.location;
          // Set DOM Elements from the API
          temperatureDegree.textContent = temp_c;
          temperatureDescription.textContent = text.toLowerCase();
          locationTimezone.textContent = region + " / " + country;

          //Set Icon
          setIcons(text, document.querySelector(".icon"));
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "darkmagenta" });
    const currentIcon = icon.replace(/ /g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
