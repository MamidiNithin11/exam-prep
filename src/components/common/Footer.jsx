import { Facebook, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-indigo-300 border-t border-gray-700">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your one-stop platform for B.Tech exam preparation across all engineering branches. 
              Access quality study materials and practice questions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900 text-sm">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Branches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/branch/AI-ML" className="text-gray-600 hover:text-gray-900 text-sm">
                  AI & ML
                </Link>
              </li>
              <li>
                <Link href="/branch/CSE" className="text-gray-600 hover:text-gray-900 text-sm">
                  CSE
                </Link>
              </li>
              <li>
                <Link href="/branch/ECE" className="text-gray-600 hover:text-gray-900 text-sm">
                  ECE
                </Link>
              </li>
              <li>
                <Link href="/branch/EEE" className="text-gray-600 hover:text-gray-900 text-sm">
                  EEE
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@btechexam.com
              </p>
              <div className="flex space-x-4 pt-4">
                <Link href="#" className="text-gray-400 hover:text-gray-900">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-900">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-900">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-900">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} B.Tech Exam Portal. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-900 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-900 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
