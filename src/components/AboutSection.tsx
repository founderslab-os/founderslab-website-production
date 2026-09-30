import React from 'react';
import { motion } from 'motion/react';
import { Target, Award, Lightbulb, Building, Globe, Zap, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Building,
      title: 'Institutional Transformation',
      description: 'Upgrading conventional colleges into vibrant, self-sustaining venture creation hubs with clear governance policies.'
    },
    {
      icon: Lightbulb,
      title: 'Research Commercialization',
      description: 'Bridging academic patents, doctoral dissertations, and laboratory prototypes with commercial markets.'
    },
    {
      icon: Zap,
      title: 'Faculty–Student Joint Ventures',
      description: 'Enabling professors and student scholars to co-found research-led spin-off companies compliant with NISP.'
    },
    {
      icon: Globe,
      title: 'Nation-Building Impact',
      description: 'Building deeptech and high-value enterprises that generate high-skilled jobs and strengthen India\'s global competitiveness.'
    }
  ];

  return (
    <section id="about" className="py-12 lg:py-18 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F7FA] border border-slate-200 text-[#0B2E6B] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#1565C0]" />
            About FoundersLab
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-[#0B2E6B] font-poppins tracking-tight">
            Building Enterprises. <span className="gradient-text">Building the Nation.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            FoundersLab is India's dedicated Innovation & Entrepreneurship Ecosystem Builder. We don't conduct superficial one-off workshops—we architect long-term, sustainable innovation infrastructure inside educational campuses.
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0B2E6B] to-[#1565C0] text-white shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Target className="w-40 h-40 text-white" />
            </div>
            <div className="relative z-10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#F57C00]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-poppins">Our Vision</h3>
              <p className="text-slate-200 leading-relaxed text-sm">
                To transform 100+ Indian higher education campuses into world-renowned innovation engines that produce global entrepreneurs, commercialize breakthrough research, and position India as the undisputed startup capital of the world.
              </p>
            </div>
          </motion.div>

          {/* Strategic Approach Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#F5F7FA] border border-slate-200 text-slate-800 shadow-sm space-y-3 relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0B2E6B]/10 flex items-center justify-center text-[#0B2E6B]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B2E6B] font-poppins">Strategic Architecture</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              We work directly alongside leadership boards, Senate bodies, and Trust Chairmen to establish institutional innovation policies, set up makerspaces, structure Faculty–Student joint venture guidelines, and provide direct investor access.
            </p>
          </motion.div>

        </div>

        {/* 4 Core Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#1565C0]/50 hover:shadow-lg transition-all duration-300 space-y-2.5 group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#0B2E6B]/5 text-[#0B2E6B] group-hover:bg-[#0B2E6B] group-hover:text-white transition-colors flex items-center justify-center">
                  <IconComp className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-base font-bold text-[#0B2E6B] font-poppins">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

