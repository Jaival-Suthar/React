import { useState } from "react";
//import "./Contact.css"; // ✅ Import external CSS

const NAME_REGEX = /^[A-Za-z\s]{2,30}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = "Name is required";
    } else if (!NAME_REGEX.test(form.name.trim())) {
      errs.name = "Name should contain only letters and spaces (2-30 characters)";
    }

    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!form.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!MOBILE_REGEX.test(form.mobile.trim())) {
      errs.mobile = "Enter a valid 10-digit Indian mobile number";
    }

    if (!form.address.trim()) {
      errs.address = "Address is required";
    } else if (form.address.trim().length < 10) {
      errs.address = "Address should be at least 10 characters long";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("✅ Form submitted successfully! We'll get back to you soon.");
      setForm({ name: "", email: "", mobile: "", address: "", message: "" });
      setErrors({});
    } catch (error) {
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="contact-form-box">
          <div className="form-header">
            <h2>Get In Touch</h2>
            <p>Fill out the form below and we'll get back to you</p>
          </div>

          <div className="form-body">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name <span className="required">*</span></label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "input-error" : ""}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label>Email Address <span className="required">*</span></label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mobile Number <span className="required">*</span></label>
                <input
                  name="mobile"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={form.mobile}
                  onChange={handleChange}
                  className={errors.mobile ? "input-error" : ""}
                  maxLength={10}
                />
                {errors.mobile && <p className="error-text">{errors.mobile}</p>}
              </div>

              <div className="form-group">
                <label>Full Address <span className="required">*</span></label>
                <input
                  name="address"
                  type="text"
                  placeholder="Enter your complete address"
                  value={form.address}
                  onChange={handleChange}
                  className={errors.address ? "input-error" : ""}
                />
                {errors.address && <p className="error-text">{errors.address}</p>}
              </div>
            </div>

            <div className="form-group">
              <label>Message <span className="optional">(Optional)</span></label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us more about your inquiry..."
                value={form.message}
                onChange={handleChange}
                maxLength={500}
              />
              <div className="char-count">{form.message.length}/500 characters</div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`submit-btn ${isSubmitting ? "disabled" : ""}`}
            >
              {isSubmitting ? "Submitting..." : "Send Message"}
            </button>

            <p className="note">
              <span className="required">*</span> Required fields. We respect your privacy and won't share your information.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
