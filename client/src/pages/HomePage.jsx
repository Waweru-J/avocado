import AvocadoListings from "../components/AvocadoListings";
import Footer from "../components/footer/Footer";
import HomeCards from "../components/home/HomeCards";
import Intro from "../components/home/Intro";
import ViewAllAvocados from "../components/home/ViewAllAvocados";

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen">
        <Intro />
        <HomeCards />
        <AvocadoListings isHome={true} />
        <ViewAllAvocados />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
