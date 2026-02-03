import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.p
          className="label-mono mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          04 — Get in Touch
        </motion.p>

        {/* Main CTA */}
        <div className="grid lg:grid-cols-2 gap-16 items-end">
          <div>
            <motion.h2
              className="heading-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Let's ignite
              <br />
              <span className="gradient-text-cobalt">something together.</span>
            </motion.h2>

            <motion.p
              className="body-lg max-w-md mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Have a project in mind? I'm always open to discussing new
              opportunities, creative ideas, or challenges to solve.
            </motion.p>

            <motion.a
              href="mailto:abdullahiabdi1233@gmail.com"
              className="btn-primary inline-flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Mail className="w-4 h-4" />
              Let's Talk
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Info Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Email Card */}
            <a
              href="mailto:abdullahiabdi1233@gmail.com"
              className="glass-card-hover block p-6 group"
            >
              <p className="label-mono mb-2">Email</p>
              <p className="heading-md group-hover:text-primary transition-colors">
                abdullahiabdi1233@gmail.com
              </p>
            </a>

            {/* Location Card */}
            <div className="glass-card p-6">
              <p className="label-mono mb-2">Based In</p>
              <p className="heading-md">Nairobi, Kenya</p>
              <p className="body-sm mt-2">Open to remote worldwide</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="glass-card-hover w-14 h-14 flex items-center justify-center rounded-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
