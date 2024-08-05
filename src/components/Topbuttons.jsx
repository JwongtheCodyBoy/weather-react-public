import React from "react";

const Topbuttons = ({setQuery}) => {
  const cities = [
    {
      id: 1,
      name: "Tampa",
    },
    {
      id: 2,
      name: "London",
    },
    {
      id: 3,
      name: "Hong Kong",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button key={city.id} className="text-white text-lg font-medium"
        onClick={() => setQuery({q: city.name})}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
}

export default Topbuttons;
