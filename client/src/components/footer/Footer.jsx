import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full lg:w-1/3 px-4 mb-8">
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p>
            We are your one-stop shop for all things avocado! From delicious
            recipes to the freshest avocados, we got you covered.
          </p>
        </div>
        <div className="w-full lg:w-1/3 px-4 mb-8">
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p>Email: info@avocadoemarket.com</p>
          <p>Phone: 1-800-AVOCADO</p>
        </div>
        <div className="w-full lg:w-1/3 px-4 mb-8">
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <p>
            Stay updated with our latest offers and avocado news by following us
            on social media.
          </p>
          <div className="flex mt-4">
            <Link to="#" className="mr-4">
              <i className="fab fa-facebook text-white"></i>
            </Link>
            <Link to="#" className="mr-4">
              <i className="fab fa-twitter text-white"></i>
            </Link>
            <Link to="#" className="mr-4">
              <i className="fab fa-instagram text-white"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; 2024 Avocado eMarket. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
