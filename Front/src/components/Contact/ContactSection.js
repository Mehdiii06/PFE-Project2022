import React from "react";
import "./ContactSection.scss";

import ContactInfoItem from "./ContactInfoItem";
import ContactForm from "./ContactForm";
import SectiontTitle from './SectionTitle'

import { MdLocalPhone, MdEmail } from "react-icons/md";

const ContactSection = () => {
  return (
    <div className="box">
      <div className="containerContact">
        <SectiontTitle />
        <div className="contactSection__wrapper">
          <div className="left">
            <ContactForm />
          </div>
          <div className="right">
            <ContactInfoItem icon={<MdLocalPhone />} text="+2016 99 999 999" />
            <ContactInfoItem icon={<MdEmail />} text="email@email.com" />
            <ContactInfoItem text="Sousse, Tunisia" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
