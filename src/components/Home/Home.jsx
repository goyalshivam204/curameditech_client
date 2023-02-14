import React from 'react';
import "./home.css";
import HomeImg from "../../assets/home.jpg"

const Home = () => {
  return (
    <div className='home'>
      <section className="home__section home__section__one">
        <div className="home__section__one__left">
          <h1 className='home__brandName'>
            CURAMEDITECH
          </h1>
          <h2 className='home__quote'>
            Caring for you, every step of the way.
          </h2>
        </div>
      </section>
    </div>
  )
}

export default Home