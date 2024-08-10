import React, { useState } from 'react';
import { useTheme } from '../themeContext'; // Import theme context
import Modal from './Modal'; // Import the modal component

const Footer = () => {
  const { theme } = useTheme(); // Get theme context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  const handleModalOpen = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleModalClose = () => setIsModalOpen(false);

  const helpCenterContent = {
    title: 'Help Center',
    body: `
      Welcome to the Help Center! Here you can find answers to common questions and solutions to common problems.
      If you encounter any issues or need assistance, please follow the steps below:
  
      1. Browse FAQs: We have a comprehensive list of frequently asked questions. You might find your answer there.
      2. Contact Support: If you need further assistance, you can contact our support team via email or live chat.
      3. Report Issues: If you encounter bugs or problems with the platform, please report them using our bug reporting tool.
  
      We are here to help you make the most of your experience on Hackex. For additional support, visit our support page or reach out to us directly.
      
      Thank you for being a part of our community!
    `
  };

  const bugBountyContent = {
    title: 'Bug Bounty Program',
    body: `
      Welcome to our Bug Bounty Program! We value the security and stability of our platform and rely on our community to help us identify and fix vulnerabilities.
  
      How to Participate:
      1. Identify Bugs: Look for security vulnerabilities or bugs within our platform. This can include issues with data protection, authentication, or other critical aspects.
      2. Report Findings: Submit detailed reports about the bugs you find. Include steps to reproduce, screenshots, and any other relevant information.
      3. Earn Rewards: We offer rewards for valid bug reports based on the severity of the issue. Check our reward guidelines for more details.
  
      Your contributions help us improve the security and reliability of Hackex. Thank you for your efforts!
    `
  };

  const termsContent = {
    title: 'Terms of Service',
    body: `
      By using Hackex, you agree to our Terms of Service. Please read the following terms carefully:
  
      1. Acceptance of Terms: By accessing or using our platform, you agree to comply with and be bound by these terms.
      2. User Responsibilities: You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
      3. Prohibited Conduct: You agree not to engage in any activities that violate laws or regulations or that disrupt the operation of the platform.
      4. Limitation of Liability: We are not liable for any indirect, incidental, or consequential damages arising from the use of our platform.
  
      For complete details, please review our full Terms of Service on our website. If you have any questions, feel free to contact us.
    `
  };

  const privacyPolicyContent = {
    title: 'Privacy Policy',
    body: `
      Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information.
  
      1. Information Collection: We collect information that you provide to us directly, such as your name, email address, and other contact details. We also collect information about your usage of the platform.
      2. Use of Information: We use your information to provide and improve our services, communicate with you, and ensure the security of our platform.
      3. Data Protection: We implement security measures to protect your data from unauthorized access and misuse.
      4. Your Rights: You have the right to access, correct, and delete your personal information. You can also opt out of marketing communications.
  
      For more details, please review our full Privacy Policy on our website. If you have any questions or concerns, please contact us.
    `
  };

  return (
    <footer
      className={`p-4 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-800'} relative`}
    >
      <div className="container mx-auto px-4 text-center">
        {/* Copyright Section */}
        <div className="mb-4">
          <p>&copy; 2024 Hackex. All rights reserved.</p>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <button
            onClick={() => handleModalOpen(helpCenterContent)}
            className={`px-4 py-2 rounded transition duration-300 ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-blue-400'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-200 hover:text-blue-600'
            }`}
          >
            Help Center
          </button>
          <button
            onClick={() => handleModalOpen(bugBountyContent)}
            className={`px-4 py-2 rounded transition duration-300 ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-blue-400'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-200 hover:text-blue-600'
            }`}
          >
            Bug Bounty
          </button>
          <button
            onClick={() => handleModalOpen(termsContent)}
            className={`px-4 py-2 rounded transition duration-300 ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-blue-400'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-200 hover:text-blue-600'
            }`}
          >
            Terms
          </button>
          <button
            onClick={() => handleModalOpen(privacyPolicyContent)}
            className={`px-4 py-2 rounded transition duration-300 ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-blue-400'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-200 hover:text-blue-600'
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Location Section */}
        <div>
          <p>India</p>
        </div>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose} content={modalContent} />
    </footer>
  );
};

export default Footer;
