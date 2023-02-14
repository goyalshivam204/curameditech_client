import React from 'react'
import "./footer.css"
import { AiOutlineHome, AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import { AiOutlineLinkedin, AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai"
import Logo from "../../assets/logo5.png";

const Footer = () => {
  return (
    <>
        <footer className='footer'>
            <section className="footer__section footer__section__one">
                <h4 className='footer__item__header'>ABOUT</h4>
                <div className="footer__item">
                    {/* <img className='footer__logo' src={Logo} alt="" /> */}
                </div>
            </section>
            <section className="footer__section footer__section__two">
                <h4 className='footer__item__header'>SERVICES</h4>
            </section>
            <section className="footer__section footer__section__three">
                <h4 className='footer__item__header'>FOLLOW US</h4>
                <a className="footer__item" href="https://www.linkedin.com/in/cura-meditech-b1a497265/" target="blank">
                    <AiOutlineLinkedin size={"1.5rem"} />
                    <div>
                        LinkedIn
                    </div>
                </a>
                <a className="footer__item" href="https://www.instagram.com/curameditech/" target="__blank">
                    <AiOutlineInstagram size={"1.5rem"} />
                    <div>
                        Instagram
                    </div>
                </a>
                <a className="footer__item" href="https://www.facebook.com/people/Cura-Meditech/100090344553077/" target="__blank" >
                    <AiOutlineFacebook size={"1.5rem"} />
                    <div>
                        Facebook
                    </div>
                </a>

            </section>
            <section className="footer__section footer__section__four">
                <h4 className='footer__item__header'>CONTACT</h4>
                <a className="footer__item" href="https://goo.gl/maps/efCxARjRPHDkYFAK9" target="__blank">
                    <AiOutlineHome size={"1.5rem"} />
                    <div>
                        Sector 25, Chandigarh
                    </div>
                </a>
                <a className="footer__item" href="mailto: curameditech@outlook.com">
                    <AiOutlineMail size={"1.5rem"} />
                    <div> curameditech@outlook.com</div>
                </a>
                <a className="footer__item" href="tel:+917888933310">
                    <AiOutlinePhone size={"1.5rem"} />
                    <div className='footer__link' >+91-7888933310</div>
                </a>
            </section>
        </footer>
        <div className="footer__copyright">
            Curameditech © 2023 | Caring for you, every step of the way. 
        </div>
    </>
 
  )
}

export default Footer;