import React from 'react';

const ActivitiesContent = () => {
  const activities = [
    {
      title: "Social Responsibility",
      items: [
        "Blood Donation Camp Addressing Shortage in Oman Blood Bank",
        "Protest against shifting of NET exam center from Gulf countries",
        "Advocacy against Air India Express service reduction and increased charges",
        "Relief fund collection for Wayanad natural calamity",
        "Support for Kerala Government's Pravasi Kshemanidhi campaign",
      ],
    },
    {
      title: "Community Programs",
      items: [
        "Onam celebrations",
        "Family reunion festival",
        "Iftar feast",
        "National Day celebration",
      ],
    },
    {
      title: "Educational Initiatives",
      items: [
        "Children's drawing competition with Ruwi Lulu",
        "Health education classes",
        "Recognition of academic achievers",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Activities and Initiatives
      </h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {activities.map((activity, index) => (
          <div
            className="bg-white border-2 border-blue-600 rounded-lg shadow-lg w-80 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
            key={index}
          >
            <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">
              {activity.title}
            </h2>
            <ul className="list-disc list-inside space-y-3">
              {activity.items.map((item, idx) => (
                <li className="text-gray-700 text-sm leading-6" key={idx}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesContent;
