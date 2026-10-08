import React from 'react';
import './FoundersLabAbout.css';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="fl-about">
      <div className="fl-about__container">
        
        <div className="fl-about__eyebrow">
          About FoundersLab
        </div>

        <div className="fl-about__top">
          <h2 className="fl-about__heading">
            Building Enterprises.<br />
            Building the Nation.
          </h2>
          <p className="fl-about__intro">
            FoundersLab is India's dedicated Innovation & Entrepreneurship Ecosystem Builder. We don't conduct superficial one-off workshops—we architect long-term, sustainable innovation infrastructure inside educational campuses.
          </p>
        </div>

        <div className="fl-about__divider"></div>

        <div className="fl-about__framework">
          
          <div className="fl-about__framework-top">
            <div className="fl-about__vision">
              <div className="fl-about__section-header">
                <span className="fl-about__section-number">01</span>
                <span className="fl-about__section-label">Our Vision</span>
              </div>
              <p className="fl-about__section-text">
                To transform 100+ Indian higher education campuses into world-renowned innovation engines that produce global entrepreneurs, commercialize breakthrough research, and position India as the undisputed startup capital of the world.
              </p>
            </div>

            <div className="fl-about__architecture">
              <div className="fl-about__section-header">
                <span className="fl-about__section-number">02</span>
                <span className="fl-about__section-label">Strategic Architecture</span>
              </div>
              <p className="fl-about__section-text">
                We work directly alongside leadership boards, Senate bodies, and Trust Chairmen to establish institutional innovation policies, set up makerspaces, structure Faculty–Student joint venture guidelines, and provide direct investor access.
              </p>
            </div>
          </div>

          <div className="fl-about__areas">
            <div className="fl-about__area">
              <div className="fl-about__area-header">
                <span className="fl-about__area-number">
                  01
                  <div className="fl-about__area-line"></div>
                </span>
                <h3 className="fl-about__area-title">Institutional Transformation</h3>
              </div>
              <p className="fl-about__area-description">
                Upgrading conventional colleges into vibrant, self-sustaining venture creation hubs with clear governance policies.
              </p>
            </div>

            <div className="fl-about__area">
              <div className="fl-about__area-header">
                <span className="fl-about__area-number">
                  02
                  <div className="fl-about__area-line"></div>
                </span>
                <h3 className="fl-about__area-title">Research Commercialization</h3>
              </div>
              <p className="fl-about__area-description">
                Bridging academic patents, doctoral dissertations, and laboratory prototypes with commercial markets.
              </p>
            </div>

            <div className="fl-about__area">
              <div className="fl-about__area-header">
                <span className="fl-about__area-number">
                  03
                  <div className="fl-about__area-line"></div>
                </span>
                <h3 className="fl-about__area-title">Faculty–Student Joint Ventures</h3>
              </div>
              <p className="fl-about__area-description">
                Enabling professors and student scholars to co-found research-led spin-off companies compliant with NISP.
              </p>
            </div>

            <div className="fl-about__area">
              <div className="fl-about__area-header">
                <span className="fl-about__area-number">
                  04
                  <div className="fl-about__area-line"></div>
                </span>
                <h3 className="fl-about__area-title">Nation-Building Impact</h3>
              </div>
              <p className="fl-about__area-description">
                Building deeptech and high-value enterprises that generate high-skilled jobs and strengthen India's global competitiveness.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

