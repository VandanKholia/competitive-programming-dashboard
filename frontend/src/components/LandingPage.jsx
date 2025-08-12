import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LandingPage.css'; // Optional custom styles

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-dark text-light">
      {/* Hero Section */}
      <section className="d-flex flex-column justify-content-center align-items-center text-center vh-100 px-3 hero-bg">
        <h1 className="display-4 fw-bold animate__animated animate__fadeInDown">Welcome to <span className="text-info">RankUp</span></h1>
        <p className="lead mt-3 animate__animated animate__fadeInUp">Start your coding journey now!</p>
        <a href="/signup" className="btn btn-outline-info mt-4">Explore Features</a>
      </section>

      {/* Features */}
      <section id="features" className="container py-5">
        <h2 className="text-center mb-5" data-aos="fade-up">Why Choose RankUp?</h2>
        <div className="row g-4">
          {[
            { title: 'Live Contests', desc: 'Join weekly timed challenges with thousands of coders.' },
            { title: 'Leaderboard', desc: 'Global rankings to showcase your skill.' },
            { title: 'Secure Judging', desc: 'Fast & accurate evaluation with instant feedback.' }
          ].map((feature, index) => (
            <div className="col-md-4" key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
              <div className="card bg-secondary h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 mt-5 border-top border-light">
        <small>&copy; 2025 RankUP. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default LandingPage;
