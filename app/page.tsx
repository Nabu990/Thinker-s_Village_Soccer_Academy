'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Trophy, 
  Users, 
  Target, 
  MapPin, 
  Calendar,
  Award,
  Heart,
  Shield,
  Star,
  Play,
  ChevronRight,
  Zap,
  Globe,
  Medal,
  Flag,
  Activity,
  Mail,
  Phone,
  MessageSquare,
  Send
} from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

// Loading placeholder for 3D component
const FootballField = () => (
  <div className="w-full h-96 bg-gradient-to-br from-green-800 to-green-600 rounded-lg flex items-center justify-center">
    <div className="text-white text-center">
      <div className="w-24 h-24 border-4 border-white rounded-full mx-auto mb-4 flex items-center justify-center">
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </div>
      <p className="text-lg font-semibold">Interactive Football Field</p>
      <p className="text-sm opacity-75">3D Visualization Coming Soon</p>
    </div>
  </div>
)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-teal-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-40 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="absolute top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="TVSA Academy Logo" className="w-8 h-8 rounded-full" />
                <span className="text-white font-bold text-xl">TVSA Academy</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="#programs" className="text-white/90 hover:text-white transition-colors">Programs</Link>
                <Link href="#about" className="text-white/90 hover:text-white transition-colors">About</Link>
                <Link href="#contact" className="text-white/90 hover:text-white transition-colors">Contact</Link>
                <Link href="/auth/login" className="text-white/90 hover:text-white transition-colors">Login</Link>
                <Link href="/auth/register">
                  <Button className="bg-white text-emerald-800 hover:bg-gray-100 font-semibold">
                    Join Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-yellow-500 text-white hover:bg-yellow-600">
                <Star className="w-4 h-4 mr-2" />
                Premier Soccer Academy in Liberia
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Shape the Future
                <span className="block text-emerald-300">of Liberian Football</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Thinker's Village Soccer Academy transforms young talent into professional athletes 
                through elite training, character development, and international exposure.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold px-8 py-4 text-lg shadow-lg transform transition-all duration-300 border border-yellow-400/20 hover:border-yellow-300/40">
                    <Zap className="w-5 h-5 mr-2" />
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-800 font-bold px-8 py-4 text-lg shadow-lg transform transition-all duration-300">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Our Story
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {[
                  { icon: Users, label: "50+ Players", value: "50+" },
                  { icon: Trophy, label: "Tournaments", value: "15+" },
                  { icon: Award, label: "Years", value: "5+" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    className="text-center group"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 rounded-full group-hover:from-yellow-300/20 group-hover:to-yellow-400/20 transition-all duration-500"></div>
                        <stat.icon className="w-6 h-6 text-yellow-400 relative z-10 group-hover:text-yellow-300 transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">{stat.value}</div>
                    <div className="text-sm text-white/70 group-hover:text-yellow-200 transition-colors duration-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Suspense fallback={<FootballField />}>
                <FootballField />
              </Suspense>
              
              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-6 -right-6 bg-white rounded-lg shadow-xl p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Medal className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Champions 2023</div>
                    <div className="text-sm text-gray-600">U-15 Regional Tournament</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Global Recognition</div>
                    <div className="text-sm text-gray-600">International Partners</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="programs" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-emerald-100 text-emerald-800">Our Excellence</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              World-Class Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive development programs designed to nurture talent from grassroots to elite levels
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Technical Excellence",
                description: "Master fundamental skills through advanced training methodologies",
                features: ["Ball Control", "Passing Accuracy", "Shooting Precision", "Dribbling Techniques"],
                colorClass: "blue"
              },
              {
                icon: Shield,
                title: "Physical Conditioning",
                description: "Build strength, speed, and endurance with professional fitness programs",
                features: ["Strength Training", "Speed Development", "Endurance Building", "Injury Prevention"],
                colorClass: "purple"
              },
              {
                icon: Heart,
                title: "Character Development",
                description: "Foster leadership, discipline, and sportsmanship in every player",
                features: ["Leadership Skills", "Teamwork", "Discipline", "Sportsmanship"],
                colorClass: "green"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardHeader className="pb-6">
                    <div className={`w-16 h-16 ${feature.colorClass === 'blue' ? 'bg-blue-100' : feature.colorClass === 'purple' ? 'bg-purple-100' : 'bg-green-100'} rounded-2xl flex items-center justify-center mb-6`}>
                      <feature.icon className={`w-8 h-8 ${feature.colorClass === 'blue' ? 'text-blue-600' : feature.colorClass === 'purple' ? 'text-purple-600' : 'text-green-600'}`} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-lg">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center">
                          <ChevronRight className={`w-5 h-5 ${feature.colorClass === 'blue' ? 'text-blue-600' : feature.colorClass === 'purple' ? 'text-purple-600' : 'text-green-600'} mr-3 flex-shrink-0`} />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-yellow-100 text-yellow-800">Age-Specific Programs</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Training for Every Age
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Age-appropriate curricula designed to maximize development at every stage
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                age: "U-15",
                title: "Foundation Program",
                ageRange: "10-15 years",
                description: "Build strong fundamentals and love for the game",
                highlights: ["Basic Techniques", "Physical Development", "Match Experience", "Character Building"],
                schedule: "Mon, Wed, Fri: 4-6 PM",
                colorClass: "yellow"
              },
              {
                age: "U-17",
                title: "Development Program",
                ageRange: "15-17 years",
                description: "Advanced skills and tactical understanding",
                highlights: ["Advanced Skills", "Tactical Awareness", "Competition Prep", "Leadership Training"],
                schedule: "Tue, Thu, Sat: 4-6 PM",
                colorClass: "blue"
              },
              {
                age: "Senior",
                title: "Elite Program",
                ageRange: "17+ years",
                description: "Professional-level training and career development",
                highlights: ["Professional Coaching", "Tournament Play", "Career Guidance", "Mentorship"],
                schedule: "Daily: 5-7 PM",
                colorClass: "purple"
              }
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="relative pb-6">
                    <div className={`absolute top-4 right-4 ${program.colorClass === 'yellow' ? 'bg-yellow-500' : program.colorClass === 'blue' ? 'bg-blue-500' : 'bg-purple-500'} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                      {program.age}
                    </div>
                    <div className={`w-20 h-20 ${program.colorClass === 'yellow' ? 'bg-yellow-100' : program.colorClass === 'blue' ? 'bg-blue-100' : 'bg-purple-100'} rounded-2xl flex items-center justify-center mb-6`}>
                      <Activity className={`w-10 h-10 ${program.colorClass === 'yellow' ? 'text-yellow-600' : program.colorClass === 'blue' ? 'text-blue-600' : 'text-purple-600'}`} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {program.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      <div className="font-semibold text-gray-800 mb-1">{program.ageRange}</div>
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Program Highlights:</h4>
                        <ul className="space-y-2">
                          {program.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                              <div className={`w-2 h-2 ${program.colorClass === 'yellow' ? 'bg-yellow-500' : program.colorClass === 'blue' ? 'bg-blue-500' : 'bg-purple-500'} rounded-full mr-3`}></div>
                              <span className="text-gray-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-600">Training Schedule</div>
                            <div className="font-semibold text-gray-900">{program.schedule}</div>
                          </div>
                          <Link href="/auth/register">
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              Join Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-yellow-100 text-yellow-800">Our Success</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Achievements & Recognition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proud moments that showcase our commitment to excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Trophy, title: "Champions", value: "15+", description: "Tournament Wins" },
              { icon: Users, title: "Players", value: "50+", description: "Active Players" },
              { icon: Award, title: "Awards", value: "25+", description: "Individual Honors" },
              { icon: Globe, title: "Partners", value: "10+", description: "Global Partners" }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <achievement.icon className="w-8 h-8 text-yellow-600" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{achievement.value}</div>
                    <div className="text-xl font-semibold text-gray-800 mb-2">{achievement.title}</div>
                    <div className="text-gray-600">{achievement.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-yellow-500 text-white hover:bg-yellow-600">Join Our Academy</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Start Your Journey to
              <span className="block text-yellow-300">Football Excellence</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join Thinker's Village Soccer Academy and become part of Liberia's premier youth development program. 
              Transform your passion into profession with world-class coaching and facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-4 text-lg">
                  <Zap className="w-5 h-5 mr-2" />
                  Register Today
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-800 font-bold px-8 py-4 text-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Visit Academy
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">About Thinker's Village Soccer Academy</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We are a premier football academy dedicated to developing young talent into professional athletes. 
                Since 2019, we've been providing elite training, character development, and international exposure 
                to aspiring footballers in Liberia and beyond.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Discipline", description: "Maintaining high standards in training and behavior" },
              { icon: Users, title: "Teamwork", description: "Working together toward common goals" },
              { icon: Star, title: "Excellence", description: "Striving for greatness in all endeavors" },
              { icon: Heart, title: "Integrity", description: "Building character through honest competition" }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="card hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions about Thinker's Village Soccer Academy? We'd love to hear from you.
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="card hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600 text-sm">info@thinkersvillage.com</p>
                      <p className="text-gray-600 text-sm">admissions@thinkersvillage.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                      <p className="text-gray-600 text-sm">+231 (0) 77 038 1510</p>
                      <p className="text-gray-600 text-sm">Mon-Fri, 8am-6pm</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
                      <p className="text-gray-600 text-sm">Thinker's Village</p>
                      <p className="text-gray-600 text-sm">Monrovia, Liberia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-6 h-6 mr-2 text-emerald-600" />
                    Send Us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                      <select
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      >
                        <option value="">Select a subject</option>
                        <option value="admissions">Admissions Inquiry</option>
                        <option value="training">Training Programs</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <textarea
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full btn-primary text-lg py-4 flex items-center justify-center shadow-lg hover:shadow-xl transform transition-all duration-300"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
