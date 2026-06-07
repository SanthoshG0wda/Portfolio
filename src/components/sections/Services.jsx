import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { Cpu } from "lucide-react";

export function Services() {
  const { ref, visible } = useInView({ rootMargin: "0px 0px 400px 0px" });

  const services = [
    {
      title: "ML Model Development",
      desc: "Coming soon — placeholder for service description",
      icon: <Cpu size={24} />,
      color: "#3D6B8C",
    },
  ];

  return (
    <section id="services" ref={ref} className="section-padding relative">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />
      <SectionGlow color="#3D6B8C" position="left" size="lg" />
      <SectionGlow color="#7A8A94" position="right" size="md" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
          className="section-heading"
        >
          <span className="section-label">/* services */</span>
          <h2 className="section-title">Services</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Professional ML engineering services — details coming soon
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.08 + i * 0.06 }}
              whileHover={{ scale: 1.02, y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="glass rounded-xl p-6 hover-lift glow-cyan transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `${svc.color}15`, color: svc.color }}
              >
                {svc.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{svc.title}</h3>
              <p className="text-gray-500 text-sm">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
