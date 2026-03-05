"use client";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            anime
              .timeline({ easing: "easeOutExpo" })
              .add({
                targets: ".contact-title",
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 700,
              })
              .add(
                {
                  targets: ".contact-field",
                  opacity: [0, 1],
                  translateY: [20, 0],
                  delay: anime.stagger(100),
                  duration: 600,
                },
                "-=300",
              )
              .add(
                {
                  targets: ".contact-btn",
                  opacity: [0, 1],
                  scale: [0.9, 1],
                  duration: 400,
                },
                "-=200",
              );
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setFormState("loading");
    // Simulate sending — replace with EmailJS or Formspree later
    setTimeout(() => {
      setFormState("success");
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 bg-white dark:bg-[#0a0a0a] relative"
    >
      {/* Top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-violet-500/50" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />

      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="contact-title opacity-0 text-violet-400 text-sm tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="contact-title opacity-0 text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Contact Me
          </h2>
          <p className="contact-title opacity-0 text-gray-500 dark:text-gray-400">
            Have a project in mind or just want to say hi? I'd love to hear from
            you.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="contact-field opacity-0">
            <Input
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="bg-white dark:bg-[#111] border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-violet-500 focus:ring-violet-500/20 h-12"
            />
          </div>

          <div className="contact-field opacity-0">
            <Input
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className="bg-white dark:bg-[#111] border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-violet-500 focus:ring-violet-500/20 h-12"
            />
          </div>

          <div className="contact-field opacity-0">
            <Textarea
              name="message"
              placeholder="Your message..."
              value={form.message}
              onChange={handleChange}
              rows={6}
              className="bg-white dark:bg-[#111] border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-violet-500 focus:ring-violet-500/20 resize-none"
            />
          </div>

          {/* Submit button */}
          <div className="contact-btn opacity-0">
            <Button
              onClick={handleSubmit}
              disabled={formState === "loading"}
              className="w-full h-12 bg-violet-600 hover:bg-violet-500 text-white rounded-full font-medium transition-colors"
            >
              {formState === "loading" ? "Sending..." : "Send Message"}
            </Button>
          </div>

          {/* Success message */}
          {formState === "success" && (
            <p className="success-msg opacity-0 text-center text-cyan-400 text-sm py-2">
              ✓ Message sent! I'll get back to you soon.
            </p>
          )}

          {/* Error message */}
          {formState === "error" && (
            <p className="text-center text-red-400 text-sm py-2">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
