import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  Calendar,
  Users,
  Heart,
  Clock,
  TrendingUp,
  Stethoscope,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { AnimatedSection } from "../../components/layout/AnimatedSection";

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description:
        "Complete registration with medical history and organized documentation",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description:
        "Automated appointment system with reminders and confirmations",
    },
    {
      icon: Activity,
      title: "Real-Time Monitoring",
      description: "Track health alerts and vital signs of your patients",
    },
  ];

  const stats = [
    { value: "10k+", label: "Patients Served", icon: Users },
    { value: "98%", label: "Satisfaction", icon: Heart },
    { value: "24/7", label: "Availability", icon: Clock },
    { value: "50%", label: "More Efficiency", icon: TrendingUp },
  ];

  const benefits = [
    "60% reduction in administrative time",
    "45% increase in team productivity",
    "80% decrease in missed appointments",
    "100% mobile and cloud access",
    "Real-time reports and analytics",
    "24/7 specialized technical support",
  ];

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">Clinic+</span>
            </div>
            <Button variant="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
        </nav>

        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <Parallax speed={-20}>
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          </Parallax>
          <Parallax speed={10}>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          </Parallax>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                The complete platform for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  your medical clinic
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                Transform your clinic management with cutting-edge technology.
                More time to care, less time with bureaucracy.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/login")}
                  className="group"
                >
                  Get Started
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="border-slate-600 text-white hover:bg-slate-800"
                >
                  See Demo
                </Button>
              </div>
              <div className="mt-12 text-sm text-slate-400">
                Trusted by over 500 clinics across Brazil
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-slate-500 rounded-full mt-2" />
            </div>
          </div>
        </section>

        <section className="py-20 border-y border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedSection
                  key={index}
                  animationType="scale"
                  delay={index * 100}
                >
                  <div className="text-center">
                    <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-slate-400">{stat.label}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 relative overflow-hidden">
          <Parallax speed={5}>
            <div className="absolute top-40 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          </Parallax>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection
              animationType="slide-up"
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Features that make a difference
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Everything you need to manage your clinic efficiently and
                professionally
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <AnimatedSection
                  key={index}
                  animationType="slide-up"
                  delay={index * 150}
                >
                  <Card
                    variant="default"
                    className="bg-slate-800/50 border-slate-700 p-8 hover:bg-slate-800 transition-colors group"
                  >
                    <feature.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-900/50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <AnimatedSection animationType="slide-right">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Why choose Clinic+?
                </h2>
                <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                  Over 500 clinics have already transformed their management
                  with our platform. Join them and see the results.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-slate-300 text-lg">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection animationType="slide-left">
                <Card
                  variant="default"
                  className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-800/50 p-12"
                >
                  <Activity className="w-16 h-16 text-blue-400 mb-6" />
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Intuitive Dashboard
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    View all important information in one place. Real-time
                    charts, smart alerts, and detailed reports.
                  </p>
                  <div className="bg-slate-950/50 rounded-lg p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Active Patients</span>
                      <span className="text-white font-semibold">1,234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Appointments Today</span>
                      <span className="text-white font-semibold">48</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Occupancy Rate</span>
                      <span className="text-green-400 font-semibold">87%</span>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="py-24 relative overflow-hidden">
          <Parallax speed={15}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-indigo-900/20" />
          </Parallax>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection
              animationType="scale"
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to transform your clinic?
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Start today and discover how Clinic+ can revolutionize your
                medical clinic management.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/login")}
                className="group"
              >
                Start for Free
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-slate-500 mt-4">
                No credit card • 30-day free trial • Cancel anytime
              </p>
            </AnimatedSection>
          </div>
        </section>

        <footer className="border-t border-slate-800 py-12 bg-slate-950">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-white">Clinic+</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2025 Clinic+. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ParallaxProvider>
  );
}
