import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactUs() {
    return (
        <div className="bg-lightTechBackground min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Contact Us</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        We'd love to hear from you
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                        Whether you have a question about LRNit, need assistance, or just want to say hi, our team is ready to answer all your questions.
                    </p>
                </div>

                <div className="mt-16 flex flex-col lg:flex-row gap-10">
                    {/* Contact Information */}
                    <div className="lg:w-1/3 bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition duration-300">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h3>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                                        <MapPin className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-lg font-medium text-gray-900">Visit Us</p>
                                    <p className="mt-1 text-gray-500">123 University Campus<br />Tech Building, Room 404</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                                        <Phone className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-lg font-medium text-gray-900">Call Us</p>
                                    <p className="mt-1 text-gray-500">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                                        <Mail className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-lg font-medium text-gray-900">Email Us</p>
                                    <p className="mt-1 text-gray-500">contact@lrnit.edu</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-2/3 bg-white rounded-2xl shadow-xl p-8">
                        <form action="#" method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                                <div className="mt-1">
                                    <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md bg-gray-50 border transition duration-150" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                                <div className="mt-1">
                                    <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md bg-gray-50 border transition duration-150" />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <div className="mt-1">
                                    <input id="email" name="email" type="email" autoComplete="email" className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md bg-gray-50 border transition duration-150" />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <div className="mt-1">
                                    <textarea id="message" name="message" rows={4} className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md bg-gray-50 border transition duration-150" defaultValue={''} />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <button type="button" onClick={() => alert("Message sent! (Mock)")} className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 transform hover:scale-[1.02]">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
