'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Trophy, 
  Users, 
  Target, 
  MapPin, 
  Calendar,
  Award,
  Heart,
  Shield,
  Star
} from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Skill Development",
      description: "Focus on nurturing young talent through comprehensive training programs and skill enhancement sessions."
    },
    {
      icon: Shield,
      title: "Character Building",
      description: "Instilling discipline, teamwork, and sportsmanship in our young athletes."
    },
    {
      icon: Heart,
      title: "Community Focus",
      description: "Serving the Thinker's Village and Paynesville community with accessible soccer development."
    },
    {
      icon: Trophy,
      title: "Competitive Excellence",
      description: "Preparing players for competitive tournaments and higher levels of play."
    }
  ]

  const achievements = [
    "U-15 Regional Tournament Champions 2023",
    "Best Youth Development Program Award",
    "50+ Young Players Trained",
    "10+ Tournament Victories",
    "Community Service Recognition",
    "Excellence in Coaching Award"
  ]

  const coaches = [
    {
      name: "James Kollie",
      role: "Head Coach",
      experience: "10+ years",
      specialization: "Technical Development"
    },
    {
      name: "Samuel Johnson",
      role: "Assistant Coach",
      experience: "8+ years", 
      specialization: "Tactical Training"
    },
    {
      name: "David Williams",
      role: "Goalkeeping Coach",
      experience: "6+ years",
      specialization: "Goalkeeper Training"
    },
    {
      name: "Michael Brown",
      role: "Fitness Coach",
      experience: "5+ years",
      specialization: "Physical Conditioning"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-6">About TVSA Academy</h1>
            <p className="text-xl leading-relaxed mb-8">
              Thinker's Village Soccer Academy is dedicated to nurturing young soccer talent 
              in Paynesville, Liberia. We provide comprehensive development programs for under-15 
              and other youth teams, focusing on skill building, character development, and competitive play.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Join Our Academy
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <Target className="w-12 h-12 text-primary-600 mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To provide exceptional soccer training and development opportunities for young athletes 
                in Thinker's Village and surrounding areas, fostering both athletic excellence and 
                personal growth through the beautiful game.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <Star className="w-12 h-12 text-primary-600 mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To become the leading youth soccer development center in Liberia, producing skilled, 
                disciplined, and well-rounded athletes who excel both on and off the field, while 
                contributing positively to their communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at TVSA Academy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center card">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Location */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <MapPin className="w-12 h-12 text-primary-600 mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Location</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Located in the heart of Thinker's Village, Paynesville, Liberia, our academy serves 
                the local community with easy access to quality soccer training facilities and 
                experienced coaching staff.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">Thinker's Village, Paynesville, Liberia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">Serving 50+ young players</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">Regular training sessions and tournaments</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary-100 to-blue-100 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Training Schedule</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">U-15 Team</h4>
                  <p className="text-gray-600">Monday, Wednesday, Friday - 4:00 PM to 6:00 PM</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">U-17 Team</h4>
                  <p className="text-gray-600">Tuesday, Thursday, Saturday - 4:00 PM to 6:00 PM</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">Weekend Matches</h4>
                  <p className="text-gray-600">Saturday and Sunday - Variable times</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coaching Staff */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Coaching Staff</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced coaches dedicated to developing young talent
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coaches.map((coach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center card">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-gray-600" />
                    </div>
                    <CardTitle className="text-xl">{coach.name}</CardTitle>
                    <CardDescription className="text-primary-600 font-semibold">
                      {coach.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <strong>Experience:</strong> {coach.experience}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Specialization:</strong> {coach.specialization}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrating our success and milestones
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center mb-3">
                    <Award className="w-6 h-6 text-yellow-600 mr-3" />
                    <h3 className="font-semibold text-gray-900">{achievement}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Join Our Soccer Family
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Become part of Thinker's Village Soccer Academy and help us build the future 
              of Liberian soccer, one young player at a time.
            </p>
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Get Started Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
