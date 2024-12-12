import MainLayout from "../../layout/mainLayout";

export default function Privacy() {
  return (
    <MainLayout>
      <div
        className="w-full flex flex-1 flex-col py-16 md:px-32 xs:px-8 px-4"
        id="privacy"
      >
        <h1 className="text-gray-900 text-2xl sm:text-3xl font-poppinsSemiBold">Privacy Policy</h1>
        <div className="text-gray-600 text-sm sm:text-base font-poppinsRegular mt-8">Welcome to TekserAI. We respect your privacy and are committed to protecting it through this Privacy Policy ("Policy").</div>
        <div className="text-gray-600 text-sm sm:text-base font-poppinsRegular mt-3">This Policy describes how we collect, use, maintain, protect, and disclose your personal information when you use our platform through our website or any other associated services (collectively, the "Services"). Please read this Policy carefully to understand our practices regarding your personal information.</div>
        <div className="text-gray-600 text-sm sm:text-base font-poppinsRegular mt-3">By using the Services, you accept and agree to be bound by this Policy. If you do not agree to this Policy, please discontinue use of the Services immediately.</div>

        <h2 className="text-gray-600 text-base sm:text-lg font-poppinsSemiBold mt-8">Information We Collect</h2>
        <div className="text-gray-600 text-sm sm:text-base font-poppinsRegular mt-3">We collect the following information:</div>
        <ul className="list-disc list-outside ml-10 mt-3 text-gray-600 text-sm sm:text-base font-poppinsRegular">
          <li>Your name and email address for account creation and communication.</li>
          <li>Homework submissions, including uploaded images, for AI processing and feedback generation.</li>
          <li>Technical data, such as IP address, browser type, and usage statistics, to improve our services.</li>
        </ul>

        <h2 className="text-gray-600 text-base sm:text-lg font-poppinsSemiBold mt-8">Use of Your Information</h2>
        <div className="text-gray-600 text-sm sm:text-base font-poppinsRegular mt-3">We use the collected information to:</div>
        <ul className="list-disc list-outside ml-10 mt-3 text-gray-600 text-sm sm:text-base font-poppinsRegular">
          <li>Provide and improve the TekserAI Services, including homework verification and feedback generation.</li>
          <li>Communicate with you regarding account-related issues or service updates.</li>
          <li>Analyze user behavior to enhance the platform’s usability and performance.</li>
        </ul>

        <h2 className="text-gray-600 text-base sm:text-lg font-poppinsSemiBold mt-8">Disclosure of Your Information</h2>
        <div className="text-gray-600 text-sm sm:text-base font-poppinsRegular mt-3">We do not sell, rent, or share your personal information with third parties, except in the following situations:</div>
        <ul className="list-disc list-outside ml-10 mt-3 text-gray-600 text-sm sm:text-base font-poppinsRegular">
          <li>To comply with legal obligations or respond to lawful requests.</li>
          <li>To enforce our terms of use or protect our rights, privacy, safety, or property.</li>
          <li>In connection with a business transfer, such as a merger or acquisition.</li>
        </ul>

        <h2 className="text-gray-600 text-base sm:text-lg font-poppinsSemiBold mt-8">Data Security</h2>
        <div className="text-gray-600 text-sm sm:text-base font-poppinsRegular mt-3">We implement robust technical and organizational measures to secure your personal information from unauthorized access, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is entirely secure, and we cannot guarantee absolute security.</div>

        <h2 className="text-gray-600 text-base sm:text-lg font-poppinsSemiBold mt-8">Data Retention</h2>
        <div className="text-gray-600 text-sm sm:text-base font-poppinsRegular mt-3">We retain your personal data only as long as necessary to fulfill the purposes outlined in this Policy or as required by law. Homework submissions and processed feedback are stored temporarily and deleted after a specified period.</div>

        <h2 className="text-gray-600 text-base sm:text-lg font-poppinsSemiBold mt-8">Your Rights</h2>
        <div className="text-gray-600 text-sm sm:text-base font-poppinsRegular mt-3">Depending on your location, you may have the right to access, update, or delete your personal data. To exercise these rights, please contact us at info@tekserai.kz.</div>

        <h2 className="text-gray-600 text-base sm:text-lg font-poppinsSemiBold mt-8">Changes to This Policy</h2>
        <div className="text-gray-600 text-sm sm:text-base font-poppinsRegular mt-3">We may update this Privacy Policy periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page regularly for the latest information.</div>

        <h2 className="text-gray-600 text-base sm:text-lg font-poppinsSemiBold mt-8">Contact Us</h2>
        <div className="text-gray-600 text-sm sm:text-base font-poppinsRegular mt-3">If you have any questions about this Privacy Policy, please contact us:</div>
        <ul className="list-disc list-outside ml-10 mt-3 text-gray-600 text-sm sm:text-base font-poppinsRegular">
          <li>Email: info@tekserai.kz</li>
          <li>Address: Nur-Sultan, Kazakhstan</li>
        </ul>
      </div>
    </MainLayout>
  );
}
