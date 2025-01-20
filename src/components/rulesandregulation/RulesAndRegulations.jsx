import React from 'react';

const RulesAndRegulations = () => {
  const rules = [
    {
      title: "Membership",
      items: [
        "Open to all Malayalis in areas: Matrah, Wadi Kabir, Darsait, Khurram, Ruvi, and Mumtaz",
        "Annual fees:",
        "Families: OMR 10",
        "Individuals: OMR 5",
      ],
    },
    {
      title: "General Guidelines",
      items: [
        "Operates in accordance with Oman laws",
        "Promotes unity and integrity of both India and Oman",
        "15-member executive committee with two-year term",
        "Decisions based on majority opinion",
        "Members must participate in group programs",
        "Financial support required for association programs",
      ],
    },
    {
      title: "Social Media Guidelines",
      items: [
        "No anti-national posts",
        "No cybercrime or misuse of private photos",
        "Maintain mutual respect in discussions",
        "No religious hatred or communal discord",
        "No political posts/discussions",
        "Unauthorized use of association name/logo will face legal action",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Rules and Regulations
      </h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {rules.map((rule, index) => (
          <div
            className="bg-white border-2 border-blue-500 rounded-lg shadow-lg w-80 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
            key={index}
          >
            <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">
              {rule.title}
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {rule.items.map((item, idx) => (
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

export default RulesAndRegulations;
