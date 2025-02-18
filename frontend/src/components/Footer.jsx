import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

function Footer() {
  const footerSections = [
    {
      title: "ABOUT",
      links: [
        "Contact Us",
        "About Us",
        "Careers",
        "Flipkart Stories",
        "Press",
        "Corporate Information"
      ]
    },
    {
      title: "GROUP COMPANIES",
      links: [
        "Myntra",
        "Cleartrip",
        "Shopsy"
      ]
    },
    {
      title: "HELP",
      links: [
        "Payments",
        "Shipping",
        "Cancellation & Returns",
        "FAQ"
      ]
    },
    {
      title: "CONSUMER POLICY",
      links: [
        "Cancellation & Returns",
        "Terms Of Use",
        "Security",
        "Privacy",
        "Sitemap",
        "Grievance Redressal",
        "EPR Compliance"
      ]
    }
  ];

  return (
    <footer className="bg-[#172337] text-white mt-8">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-5 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-gray-400 font-medium mb-4">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:underline">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <div className="border-l border-gray-600 pl-4">
              <h3 className="text-gray-400 font-medium mb-2">Mail Us:</h3>
              <p className="text-sm">
                Flipkart Internet Private Limited,<br />
                Buildings Alyssa, Begonia &<br />
                Clove Embassy Tech Village,<br />
                Outer Ring Road, Devarabeesanahalli Village,<br />
                Bengaluru, 560103,<br />
                Karnataka, India
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-10 pt-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <a href="#" className="flex items-center space-x-2">
                <img src="/category-icons/seller.png" alt="" className="h-4" />
                <span>Become a Seller</span>
              </a>
              <a href="#" className="flex items-center space-x-2">
                <img src="/category-icons/advertise.png" alt="" className="h-4" />
                <span>Advertise</span>
              </a>
              <a href="#" className="flex items-center space-x-2">
                <img src="/category-icons/gift-card.png" alt="" className="h-4" />
                <span>Gift Cards</span>
              </a>
              <a href="#" className="flex items-center space-x-2">
                <img src="/category-icons/help-center.png" alt="" className="h-4" />
                <span>Help Center</span>
              </a>
            </div>
            <p>© 2007-2025 Flipkart.com</p>
            <div className="flex space-x-4">
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg" alt="Payment Methods" className="h-4" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center text-sm">
          <div className="flex space-x-4">
            <span>Social:</span>
            <a href="#" className="hover:text-blue-400"><FaFacebook /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-400"><FaYoutube /></a>
            <a href="#" className="hover:text-blue-400"><FaInstagram /></a>
          </div>
          <div className="text-gray-400">
            <p>CIN : U51109KA2012PTC066107</p>
            <p>Telephone: <a href="tel:044-45614700" className="text-blue-400">044-45614700</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;