import Hero from "../components/Hero";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Auth | Home</title>
      </Helmet>
      <Hero />
    </>
  );
};

export default Home;
