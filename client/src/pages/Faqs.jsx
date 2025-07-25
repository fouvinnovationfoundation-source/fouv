import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Faqs() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const faqs = [
    {
      question: "What is the FOUV Innovation Foundation?",
      answer: "FOUV Innovation is a platform dedicated to fostering entrepreneurship and innovation. We provide resources, mentorship, and networking opportunities to help startups and individuals achieve their goals.",
    },
    {
      question: "Who is eligible to join FOUV Innovation?",
      answer: "Anyone with an entrepreneurial spirit and a desire to innovate is welcome to join FOUV Innovation. We are open to individuals at all stages of their entrepreneurial journey.",
    },
    {
      question: "How does FOUV Innovation support startups?",
      answer: "We offer a variety of services, including mentorship, funding opportunities, workshops, and networking events. Our goal is to provide startups with the tools and resources they need to succeed.",
    },
    {
      question: "Is there a cost associated with joining FOUV Innovation?",
      answer: "We have facilities in Haryana and Delhi. Visit the Contact page for detailed addresses and directions.",
    },
    {
      question: "What kind of mentorship is available through FOUV Innovation?",
      answer: "We connect startups with experienced mentors who can provide guidance, advice, and support. Our mentors come from various industries and have a wealth of knowledge to share.",
    },
    {
      question: "How can I connect with other entrepreneurs through FOUV Innovation?",
      answer: "We offer networking events and online communities where startups can connect with each other and share experiences. This can be a great way to learn from others and build valuable relationships.",
    },
    {
      question: "Does FOUV Innovation offer funding opportunities?",
      answer: "Yes, we offer a variety of funding opportunities, including grants, investments, and incubation programs. We are committed to helping startups access the capital they need to grow.",
    },
    {
      question: "What other resources are available through FOUV Innovation?",
      answer: "We offer a variety of resources, including workshops, training programs, and access to industry experts. These resources can help startups develop the skills and knowledge they need to succeed.",
    },
    {
      question: "What are some of the specific programs offered by FOUV Innovation?",
      answer: "We offer a variety of programs, including accelerator programs, mentorship programs, and networking events. These programs are designed to cater to the specific needs of startups at different stages of growth.",
    },
    {
      question: "How do I apply for a FOUV Innovation program?",
      answer: "The application process varies depending on the specific program. However, all applications typically require a detailed description of your startup, your team, and your goals.",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="bg-light py-5" data-aos="fade-in">
        <div className="container">
          <h1 className="text-center fw-bold mb-5 text-primary display-5 ">
            Frequently Asked Questions
          </h1>
          <div className="accordion" id="faqAccordion">
            {faqs.map((faq, index) => (
              <div
                className="accordion-item border-0 mb-3 shadow-sm"
                key={index}
                data-aos="fade-up"
              >
                <h2 className="accordion-header" id={`heading-${index}`}>
                  <button
                    className="accordion-button collapsed fw-medium"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse-${index}`}
                    style={{
                      backgroundColor: '#f8f9fa',
                      color: '#03518f',
                      fontSize: '1.1rem',
                    }}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={`collapse-${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading-${index}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div
                    className="accordion-body"
                    style={{ fontSize: '0.95rem', color: '#333' }}
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-white" data-aos="zoom-in">
        <div className="container text-center">
          <h3 className="fw-bold text-dark mb-3">Still have a question?</h3>
          <p className="mb-4">Reach out to us and we’ll be happy to help you.</p>
          <a href="/contact" className="btn btn-outline-primary btn-lg">
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Faqs;
