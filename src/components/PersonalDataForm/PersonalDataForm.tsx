import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import CartContext from "../../store/cart-context";

import { BsExclamationTriangleFill } from "react-icons/bs";
import "./PersonalDataForm.scss";

const PersonalDataForm = () => {
  const { personalData, setPersonalData, cartArray } = useContext(CartContext);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const errorLog = {
    missingData: "Please fill in all the fields.",
    invalidName: "Please insert a valid name.",
    invalidSurname: "Please insert a valid surname.",
    invalidEmail: "Please insert a valid e-mail address.",
    invalidEmailRep: "Provide the same e-mail address.",
    invalidTel: "Please insert a valid phone number.",
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, surname, email, emailRep, tel } = personalData;
    const {
      missingData,
      invalidName,
      invalidSurname,
      invalidEmail,
      invalidEmailRep,
      invalidTel,
    } = errorLog;
    if (
      Object.values(personalData).some(
        (value) => value === undefined || value === ""
      )
    ) {
      setError(missingData);
      return;
    } else {
      if (name?.trim().length === 0 || !name?.trim().match(/^[A-Za-z]*$/)) {
        setError(invalidName);
        return;
      }
      if (
        surname?.trim().length === 0 ||
        !surname?.trim().match(/^[A-Za-z]*$/)
      ) {
        setError(invalidSurname);
        return;
      }
      if (!email?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        setError(invalidEmail);
        return;
      }
      if (email !== emailRep) {
        setError(invalidEmailRep);
        return;
      }
      if (!tel?.match(/^\+?[1-9][0-9]{7,14}$/)) {
        setError(invalidTel);
        return;
      }
      setError("");
      navigate("/checkout");
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setPersonalData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      {cartArray.length === 0 ? (
        <div className="mt-8">
          <p>Your cart is empty. Please select a movie first.</p>
        </div>
      ) : (
        <div className="personal-data__main-container">
          <form
            onSubmit={handleFormSubmit}
            className="personal-data__form-container"
          >
            {error === "" || error === undefined ? (
              <p className="personal-data__form-text">
                To receive the ticket(s), fill in the form with your personal data.
              </p>
            ) : (
              <p className="personal-data__form-error">
                <BsExclamationTriangleFill className="personal-data__form-error-icon" />{" "}
                {error}
              </p>
            )}
            <input
              type="text"
              name="name"
              value={personalData.name}
              placeholder="Insert your name"
              className={
                error === errorLog.invalidName
                  ? "personal-data__form--input-error"
                  : ""
              }
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="surname"
              value={personalData.surname}
              placeholder="Insert your surname"
              className={
                error === errorLog.invalidSurname
                  ? "personal-data__form--input-error"
                  : ""
              }
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="email"
              value={personalData.email}
              placeholder="Insert your e-mail address"
              className={
                error === errorLog.invalidEmail
                  ? "personal-data__form--input-error"
                  : ""
              }
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="emailRep"
              value={personalData.emailRep}
              placeholder="Repeat your e-mail address"
              className={
                error === errorLog.invalidEmailRep
                  ? "personal-data__form--input-error"
                  : ""
              }
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="tel"
              value={personalData.tel}
              placeholder="Insert your phone number"
              className={
                error === errorLog.invalidTel
                  ? "personal-data__form--input-error"
                  : ""
              }
              onChange={handleFormChange}
            />
            <button className="btn-main mt-2 mb-2">Proceed to checkout</button>
          </form>
        </div>
      )}
    </motion.div>
  );
};

export default PersonalDataForm;
