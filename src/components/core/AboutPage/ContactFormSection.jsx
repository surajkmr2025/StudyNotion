import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <section className="py-14 px-4">
      <div className="mx-auto max-w-3xl text-center">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-semibold text-richblack-5">
          Get in Touch
        </h1>

        {/* Subtext */}
        <p className="mt-3 text-sm md:text-base text-richblack-300">
          We'd love to hear from you. Please fill out the form below.
        </p>

        {/* Form Container */}
        <div className="mt-10 rounded-2xl bg-richblack-800 p-6 md:p-8 shadow-lg border border-white/10">
          <ContactUsForm />
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
