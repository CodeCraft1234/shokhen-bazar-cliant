import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    comment: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with your form submission logic
    console.log("Form data submitted:", formData);
    setSuccess(true);
  };

  return (
    <div className="mt-28 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl mb-4">Call us or visit place</h2>
          <p className="mb-2">
            <span className="font-bold">Phone: </span>
            <a href="tel:01401-026552">01401-026552</a>
          </p>
          <p className="mb-2">
            <span className="font-bold">Address: </span>
            <span>Dhaka, Bangladesh</span>
          </p>
          <p className="mb-2">
            <span className="font-bold">Email: </span>
            <a href="mailto:pokharelgit07@gmail.com">pokharelgit07@gmail.com</a>
          </p>
          <div className="mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.743484197828!2d90.36277641498104!3d23.790560993388167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c64a631b115b%3A0xa4e3f35e4d0a76e4!2sDhaka!5e0!3m2!1sen!2sbd!4v1629270014483!5m2!1sen!2sbd"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
        <div>
          <h2 className="text-2xl mb-4">Send us a message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700"
              >
                Comment
              </label>
              <textarea
                name="comment"
                id="comment"
                rows="4"
                value={formData.comment}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              SUBMIT
            </button>
          </form>
          {success && (
            <p className="mt-4 text-green-500">Message sent successfully!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
