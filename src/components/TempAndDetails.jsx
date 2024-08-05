import React from "react";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FaThermometerEmpty } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { SiSunrise } from "react-icons/si";
import { TbSunrise, TbSunset } from "react-icons/tb";

const TempAndDetails = ({
  weather: {
    condition,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) => {
  const weatherDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Feels like",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind speed",
      value: `${speed} ${units === "metric" ? "km/h" : "mph"}`,
    },
  ];

  const todayDetails = [
    {
      id: 1,
      Icon: TbSunrise,
      title: "Sunrise",
      value: `${sunrise}`,
    },
    {
      id: 2,
      Icon: TbSunset,
      title: "Sunset",
      value: `${sunset}`,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  const SunShadow = (icon, temp, units) => {
    const threshold = units === "metric" ? 30 : 85;

    if (icon === "https://openweathermap.org/img/wn/01d@2x.png") {
      if (temp >= threshold) return "drop-shadow-blazing";
      return "drop-shadow-sunny";
    } else return "box-shadow: none";
  };

  return (
    <div className="text-white text-xl">
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p> {condition} </p>
      </div>

      <div className="flex flex-row items-center justify-between py-3">
        <img
          src={icon} //Icon, need to make variable here
          alt="weather icon"
          className={`w-20 ${SunShadow(icon, temp, units)}`}
        />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>

        <div className="flex flex-col space-y-3 items-start">
          {
            // prettier ignore
            weatherDetails.map(({ id, Icon, title, value }) => (
              <div
                key={id}
                className="flex font-light text-sm items-center justify-center"
              >
                <Icon size={18} className="mr-1" />
                {`${title}:`} <span className="font-medium ml-1">{value}</span>
              </div>
            ))
          }
        </div>
      </div>

      <div className="flex flex-row flex-wrap items-center justify-center text-base py-3">
        {
          // prettier ignore
          todayDetails.map(({ id, Icon, title, value }) => (
            <div key={id} className="flex flex-row items-center text-sm mx-7">
              <Icon size={30} />
              <p className="font-light ml-1">{`${title}:`}</p>
              <span className="font-medium ml-1 text-nowrap">{value}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default TempAndDetails;
