import { Fragment } from "react";
import AvocadoListings from "../components/AvocadoListings";
import Footer from "../components/footer/Footer";

const AvocadoPage = () => {
  return (
    <Fragment>
      <section className=" bg-blue-50 px-4 py-6">
        <AvocadoListings />
      </section>
      <Footer />
    </Fragment>
  );
};

export default AvocadoPage;
