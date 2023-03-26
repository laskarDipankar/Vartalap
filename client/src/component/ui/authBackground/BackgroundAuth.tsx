import React from "react";

const BackgroundAuth = () => {
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
  });
  return <></>;
};

export default BackgroundAuth;
