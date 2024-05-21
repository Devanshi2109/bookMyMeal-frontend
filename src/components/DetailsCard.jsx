import React, { useEffect, useState } from 'react';

const DetailsCard = ({ title, description, menuItems }) => {
  const [details, setDetails] = useState({
    title: title,
    description: description,
    menuItems: menuItems,
  });

  // Fetch details from API (commented out for now)
  // useEffect(() => {
  //   fetch('https://api.example.com/details')
  //     .then(response => response.json())
  //     .then(data => setDetails(data))
  //     .catch(error => console.error('Error fetching details:', error));
  // }, []);

  return (
    <div className="bg-blue-500 text-white rounded-lg shadow-md p-6 ml-4 flex-grow">
      <h2 className="text-xl font-bold mb-4">{details.title}</h2>
      <p className="text-gray-200 mb-6">{details.description}</p>
      {details.menuItems && details.menuItems.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Menu</h3>
          <ul className="list-disc list-inside">
            {details.menuItems.map((item, index) => (
              <li key={index} className="text-gray-100">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailsCard;
