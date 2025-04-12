'use client'
import { motion } from 'framer-motion';
import { CheckCircle, Clock, PieChart } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <CheckCircle className="h-6 w-6 text-blue-600" />,
    title: 'Task Management',
    description: 'Create, organize, and track your tasks effortlessly with our intuitive interface.'
  },
  {
    icon: <Clock className="h-6 w-6 text-blue-600" />,
    title: 'Time Tracking',
    description: 'Monitor time spent on tasks and improve your productivity with detailed insights.'
  },
  {
    icon: <PieChart className="h-6 w-6 text-blue-600" />,
    title: 'Analytics',
    description: 'Get valuable insights into your productivity with detailed analytics and reports.'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Better Productivity
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to manage your tasks effectively and boost your productivity
          </p>
        </motion.div>

        <div className="flex flex-col md:justify-center md:flex-row gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg cursor-pointer transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>
              <Link 
              href="/dashboard"
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2 rounded-lg text-white"
            >
              Get Started
            </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
