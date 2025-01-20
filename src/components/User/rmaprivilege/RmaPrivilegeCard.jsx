import React from 'react';

const RmaPrivilegeCard = () => {
  const benefits = [
    {
      title: "Apollo Hospital",
      items: [
        "50% off consultation fees",
        "25% off room tariffs",
        "25% off laboratory services",
        "20% off surgeries"
      ],
    },
    {
      title: "Wellness Medical Center",
      items: [
        "50% off consultations",
        "20% off laboratory tests",
        "15% off selected services"
      ],
    },
    {
      title: "Biggest Gym, Ruvi Gym, Matra Gym",
      items: [
        "1 month: 15 OMR",
        "3 months: 25 OMR",
        "6 months: 39 OMR",
        "1 year: 65 OMR"
      ],
    },
    {
      title: "Perfect Fitness, Rex Road",
      items: [
        "1 month: 15 OMR",
        "3 months: 25 OMR",
        "6 months: 35 OMR",
        "1 year: 60 OMR"
      ],
    },
    {
      title: "Money Exchange Partners",
      items: [
        "Purushottam Kanchi Exchange",
        "Al Jadeed Exchange",
        "Global Money Exchange"
      ],
    },
    {
      title: "Document Services",
      items: [
        "Arabian Attestation Services: 10% off on all attestation services"
      ],
    },
    {
      title: "Other Partners",
      items: [
        "Fried Bowl: 15% off",
        "MAF Services: 5% off",
        "Hair and Beauty Salon: 5% off",
        "Rizan Gold and Diamond: 50-55% off"
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white-100 via-white to-blue-50 p-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        RMA Privilege Card Benefits
      </h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {benefits.map((benefit, index) => (
          <div
            className="bg-white border-2 border-green-500 rounded-lg shadow-lg w-80 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
            key={index}
          >
            <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
              {benefit.title}
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {benefit.items.map((item, idx) => (
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

export default RmaPrivilegeCard;
