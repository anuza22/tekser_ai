import { Link } from "react-router-dom";
import MainLayout from "../../layout/mainLayout";

export default function Terms() {
  return (
    <MainLayout>
      <div
        className="w-full flex flex-1 flex-col py-16 md:px-16 xs:px-8 px-4 text-gray-600 text-xs md:text-sm font-poppinsRegular"
        id="terms"
      >
        <h1 className="text-gray-900 text-2xl md:text-3xl font-poppinsSemiBold">TERMS OF USE</h1>
        <div className="font-poppinsSemiBold mt-8">Last updated December 12, 2024</div>
        <h2 className="text-gray-900 text-lg md:text-xl font-poppinsSemiBold mt-12">AGREEMENT TO OUR LEGAL TERMS</h2>
        <div className="mt-3">Welcome to TekserAI ("<span className='font-poppinsSemiBold'>Company</span>", "<span className='font-poppinsSemiBold'>we</span>", "<span className='font-poppinsSemiBold'>us</span>", "<span className='font-poppinsSemiBold'>our</span>"). By accessing our services, you agree to comply with our terms of use as outlined in this document. If you do not agree, please discontinue use immediately.</div>
        <div className="mt-3">TekserAI is an AI-powered platform designed to streamline homework checking for teachers, students, and parents. By leveraging technologies such as OCR and LLMs, we aim to simplify the process while maintaining alignment with Kazakhstan's educational standards.</div>
        <div className="mt-3">For inquiries, please contact us at info@tekserai.kz.</div>

        <h2 className="text-gray-900 text-lg md:text-xl font-poppinsSemiBold mt-12">TABLE OF CONTENTS</h2>
        <a href="#content_1" className="text-gray-600 underline hover:text-primary-600 mt-8">1. OUR SERVICES</a>
        <a href="#content_2" className="text-gray-600 underline hover:text-primary-600">2. INTELLECTUAL PROPERTY RIGHTS</a>
        <a href="#content_3" className="text-gray-600 underline hover:text-primary-600">3. USER REPRESENTATIONS</a>
        <a href="#content_4" className="text-gray-600 underline hover:text-primary-600">4. USER REGISTRATION</a>
        <a href="#content_5" className="text-gray-600 underline hover:text-primary-600">5. PURCHASES AND PAYMENT</a>

        <h2 id="content_1" className="text-gray-900 text-lg md:text-xl font-poppinsSemiBold mt-8">1. OUR SERVICES</h2>
        <div className="mt-3">TekserAI provides tools for homework verification using advanced technologies like OCR for text recognition and LLMs for context-based validation. By using our services, users agree to responsibly upload educational material in line with our policies.</div>

        <h2 id="content_2" className="text-gray-900 text-lg md:text-xl font-poppinsSemiBold mt-8">2. INTELLECTUAL PROPERTY RIGHTS</h2>
        <div className="mt-3">All content provided by TekserAI, including algorithms, UI/UX design, and processed feedback, is protected under intellectual property laws. Unauthorized use, reproduction, or distribution is prohibited without prior consent.</div>

        <h2 id="content_3" className="text-gray-900 text-lg md:text-xl font-poppinsSemiBold mt-8">3. USER REPRESENTATIONS</h2>
        <div className="mt-3">By registering and using TekserAI, you confirm that all submitted content is owned by you or you have the legal rights to use it for educational purposes.</div>

        <h2 id="content_4" className="text-gray-900 text-lg md:text-xl font-poppinsSemiBold mt-8">4. USER REGISTRATION</h2>
        <div className="mt-3">Users are required to register via Kundelik.kz credentials for seamless integration. You are responsible for maintaining the confidentiality of your account credentials.</div>

        <h2 id="content_5" className="text-gray-900 text-lg md:text-xl font-poppinsSemiBold mt-8">5. PURCHASES AND PAYMENT</h2>
        <div className="mt-3">TekserAI offers free and premium plans for educational institutions. Payment details are securely processed via our trusted payment gateways. Refund policies are subject to specific terms outlined at the point of purchase.</div>

        <h2 id="content_6" className="text-gray-900 text-lg md:text-xl font-poppinsSemiBold mt-8">6. PRIVACY POLICY</h2>
        <div className="mt-3">Your data privacy is of utmost importance. Please review our <Link to="/privacy" className="text-gray-600 underline hover:text-primary-600">Privacy Policy</Link> for detailed information.</div>

        <h2 id="content_7" className="text-gray-900 text-lg md:text-xl font-poppinsSemiBold mt-8">7. CONTACT US</h2>
        <div className="mt-3">For further questions or feedback, contact TekserAI support via info@tekserai.kz or visit our office at Nur-Sultan, Kazakhstan.</div>
      </div>
    </MainLayout>
  );
}
