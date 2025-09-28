import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Add analytics or page load events here
  }

  render() {
    return (
      <div className="about-page container mx-auto p-2 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <h2 className="text-xl mb-6 text-gray-700">
          We are one of the most trusted food ordering apps, chosen by millions across India for quick, reliable, and delicious meals.
        </h2>

        <section className="mission my-6">
          <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
          <p>
            To bring the best local and national cuisines to your doorstep with seamless ordering, reliable delivery, and a user-friendly experience.
          </p>
        </section>
        
        <section className="team my-6">
          <h3 className="text-2xl font-semibold mb-2">Our Team</h3>
          <p>
            Composed of passionate developers, food enthusiasts, and logistics experts, our team works tirelessly to improve your food journey every day.
          </p>
          <UserClass />
        </section>

        <section className="values my-6">
          <h3 className="text-2xl font-semibold mb-2">Our Values</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Customer-first service</li>
            <li>Quality and freshness guarantee</li>
            <li>Technological innovation</li>
            <li>Transparent pricing</li>
            <li>Commitment to sustainability</li>
          </ul>
        </section>

      </div>
    );
  }
}

export default About;
