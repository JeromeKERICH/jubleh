import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FAQHelpCenter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [activeCategory, setActiveCategory] = useState('shipping');
  const [openItems, setOpenItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqCategories = {
    shipping: {
      title: 'Shipping & Delivery',
      questions: [
        {
          id: 'shipping-1',
          question: 'What are your delivery areas and times?',
          answer: 'We deliver nationwide across Kenya. Delivery times are 3-5 business days within Nairobi and 5-7 business days for other regions. Express delivery (1-2 days) is available for Nairobi at an additional cost.'
        },
        {
          id: 'shipping-2',
          question: 'How much does shipping cost?',
          answer: 'We offer FREE shipping on all orders over KES 10,000. For orders below KES 10,000, shipping costs KES 500 within Nairobi and KES 800 for other regions.'
        },
        {
          id: 'shipping-3',
          question: 'How can I track my order?',
          answer: 'Once your order is shipped, you will receive a tracking number via SMS and email. You can track your order in real-time using our tracking portal or contact our customer service team for updates.'
        },
        {
          id: 'shipping-4',
          question: 'Do you offer international shipping?',
          answer: 'Currently, we only ship within Kenya. We are working on expanding our delivery services to other East African countries in the near future.'
        }
      ]
    },
    returns: {
      title: 'Returns & Exchanges',
      questions: [
        {
          id: 'returns-1',
          question: 'What is your return policy?',
          answer: 'We offer a 7-day return policy for unused items in their original packaging. Items must be in resalable condition with all tags attached. Custom or personalized items cannot be returned unless damaged or defective.'
        },
        {
          id: 'returns-2',
          question: 'How do I initiate a return?',
          answer: 'Contact our customer service team at support@jublehhaven.co.ke or call +254 725 588 119. Provide your order number and reason for return. We will guide you through the return process and provide a return authorization.'
        },
        {
          id: 'returns-3',
          question: 'How long do refunds take?',
          answer: 'Once we receive your returned item, refunds are processed within 3-5 business days. The refund will be credited to your original payment method. You should see the refund in your account within 7-10 business days depending on your bank.'
        },
        {
          id: 'returns-4',
          question: 'What if I receive a damaged item?',
          answer: 'If you receive a damaged or defective item, please contact us within 24 hours of delivery. Send photos of the damaged item and packaging to support@jublehhaven.co.ke We will arrange for a replacement or full refund at no extra cost.'
        }
      ]
    },
    products: {
      title: 'Products & Quality',
      questions: [
        {
          id: 'products-1',
          question: 'What materials do you use in your products?',
          answer: 'We use premium quality materials including solid wood, genuine leather, high-grade metals, and durable fabrics. Each product description includes detailed material information. All our materials are sourced from reputable suppliers and tested for durability and safety.'
        },
        {
          id: 'products-2',
          question: 'Do you offer product warranties?',
          answer: 'Yes! We offer a 1-year warranty on all furniture and home essentials against manufacturing defects. Electronics come with manufacturer warranties ranging from 6 months to 2 years. Warranty details are included with each product.'
        },
        {
          id: 'products-3',
          question: 'Can I see products before purchasing?',
          answer: 'Yes, you can visit our showroom in Nairobi to see our products in person. We are located at [Your Showroom Address]. Please call ahead to schedule an appointment for personalized assistance.'
        },
        {
          id: 'products-4',
          question: 'Do you offer custom orders?',
          answer: 'Yes, we offer custom orders for furniture and home essentials. Custom orders require a 50% deposit and have a lead time of 4-6 weeks. Contact our sales team to discuss your custom requirements.'
        }
      ]
    },
    payment: {
      title: 'Payments & Security',
      questions: [
        {
          id: 'payment-1',
          question: 'What payment methods do you accept?',
          answer: 'We accept M-Pesa, credit/debit cards (Visa, MasterCard), bank transfers, and Paystack payments. All payments are processed securely through encrypted channels to protect your financial information.'
        },
        {
          id: 'payment-2',
          question: 'Is it safe to pay on your website?',
          answer: 'Absolutely! We use industry-standard SSL encryption and secure payment gateways. Your payment information is never stored on our servers. We are PCI-DSS compliant and follow the highest security standards.'
        },
        {
          id: 'payment-3',
          question: 'Do you offer installment payments?',
          answer: 'Yes, we offer flexible payment plans through our partners. You can split your payment over 3-6 months with 0% interest on selected items. Contact our sales team for more information about installment options.'
        },
        {
          id: 'payment-4',
          question: 'Can I pay cash on delivery?',
          answer: 'Yes, we offer cash on delivery for orders within Nairobi. A 20% deposit is required for COD orders over KES 20,000. Our delivery team will contact you before delivery to confirm the payment method.'
        }
      ]
    },
    account: {
      title: 'Account & Orders',
      questions: [
        {
          id: 'account-1',
          question: 'How do I create an account?',
          answer: 'Click on the "Sign Up" button in the top navigation and fill in your details. You can also create an account during checkout. Having an account allows you to track orders, save favorites, and get personalized recommendations.'
        },
        {
          id: 'account-2',
          question: 'I forgot my password. How can I reset it?',
          answer: 'Click on "Forgot Password" on the login page and enter your email address. You will receive a password reset link via email. If you do not receive the email, check your spam folder or contact customer support.'
        },
        {
          id: 'account-3',
          question: 'Can I modify or cancel my order?',
          answer: 'You can modify or cancel your order within 2 hours of placing it. After 2 hours, the order enters processing and cannot be modified. Contact us immediately if you need to make changes to your order.'
        },
        {
          id: 'account-4',
          question: 'How do I view my order history?',
          answer: 'Log into your account and go to "My Orders" in your dashboard. Here you can view all your past and current orders, track shipments, and download invoices.'
        }
      ]
    }
  };

  const filteredQuestions = searchQuery 
    ? Object.values(faqCategories).flatMap(category => 
        category.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : faqCategories[activeCategory].questions;

  return (
    <div className="min-h-screen bg-white pt-16 pb-12">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
              Help Center
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Find answers to common questions
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                />
                <svg 
                  className="absolute right-3 top-3 w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <h3 className="text-sm font-medium text-gray-900 mb-3 px-2">Categories</h3>
              <div className="space-y-1">
                {Object.entries(faqCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveCategory(key);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeCategory === key && !searchQuery
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>

              {/* Contact Card */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Need more help?</h4>
                <div className="space-y-2 text-xs text-gray-600 mb-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+254 728 588 119</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>support@jublehhaven.com</span>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="block w-full bg-black text-white text-center py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {searchQuery ? (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Search results for "{searchQuery}"
                </h2>
                {filteredQuestions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No results found for your search.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredQuestions.map((item) => (
                      <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="flex justify-between items-center w-full text-left"
                        >
                          <h3 className="text-sm font-medium text-gray-900 pr-4">
                            {item.question}
                          </h3>
                          <svg
                            className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                              openItems[item.id] ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openItems[item.id] && (
                          <div className="mt-2 text-sm text-gray-600 leading-relaxed">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    {faqCategories[activeCategory].title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Common questions about {faqCategories[activeCategory].title.toLowerCase()}
                  </p>
                </div>

                <div className="space-y-4">
                  {filteredQuestions.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="flex justify-between items-center w-full text-left"
                      >
                        <h3 className="text-sm font-medium text-gray-900 pr-4">
                          {item.question}
                        </h3>
                        <svg
                          className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                            openItems[item.id] ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openItems[item.id] && (
                        <div className="mt-2 text-sm text-gray-600 leading-relaxed">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Help */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-black rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    Still need help?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Our support team is available to help with any questions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                      to="/contact"
                      className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors text-center"
                    >
                      Contact Support
                    </Link>
                    <a
                      href="mailto:support@jublehhaven.co.ke"
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors text-center"
                    >
                      Send Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQHelpCenter;