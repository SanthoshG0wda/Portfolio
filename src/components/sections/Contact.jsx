
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useInView } from "@/hooks/useInView";
import { SectionGlow } from "@/components/ui/SectionGlow";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "santhoshgowda9542@gmail.com",
    href: "mailto:santhoshmgowda@zohomail.in",
    color: "#3D6B8C",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7349097923",
    href: "tel:+917349097923",
    color: "#7A8A94",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@SanthoshG0wda",
    href: "https://github.com/SanthoshG0wda",
    color: "#B1D2C8",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "@santhosh-gowda",
    href: "https://linkedin.com/in/santhosh-gowda-m",
    color: "#F59E0B",
  },
];

export function Contact() {
  const { ref, visible } = useInView({ rootMargin: "0px 0px 400px 0px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    window.location.href = `mailto:santhoshgowda9542@gmail.com?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}`;
    setSubmitted(true);
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="contact" ref={ref} className="section-padding relative">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />
      <SectionGlow color="#3D6B8C" position="left" size="lg" />
      <SectionGlow color="#7A8A94" position="right" size="md" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
          className="section-heading"
        >
          <span className="section-label">/* contact */</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Let&apos;s connect and build a secure future together
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="md:col-span-2 space-y-4"
          >
            {contactInfo.map((info) => (
              <motion.a
                key={info.label}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="glass rounded-xl p-4 flex items-center gap-4 hover-lift transition-all duration-300 group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${info.color}12` }}
                >
                  <info.icon size={16} style={{ color: info.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    {info.label}
                  </p>
                  <p className="text-base text-white group-hover:text-[#3D6B8C] transition-colors truncate">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}

            <div className="glass rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[#B1D2C8]/10">
                <MapPin size={16} className="text-[#B1D2C8]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                <p className="text-base text-white">Bangalore</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="md:col-span-3"
          >
            <div className="glass rounded-2xl p-8 glow-cyan">
              {submitted ? (
                <div className="text-center py-12">
                  <Mail size={48} className="text-[#3D6B8C] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-base">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      id="name"
                      label="Your Name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      error={errors.name}
                    />
                    <Input
                      id="email"
                      label="Your Email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      error={errors.email}
                    />
                  </div>
                  <Textarea
                    id="message"
                    label="Your Message"
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    error={errors.message}
                  />
                  <div className="flex gap-4">
                    <Button type="submit" size="lg">
                      <Send size={16} />
                      Send Message
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

