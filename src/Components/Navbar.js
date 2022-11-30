import { useRef } from "react";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Styles/main.css";
import Country from "./Country";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "name is required!";
    }
    if (!values.lastname) {
      errors.lastname = "lastname is required";
    }

    return errors;
  };

  return (
    <div>
      <header>
        <h3>LOGO</h3>
        <nav ref={navRef}>
          <a href="/#">Home</a>
          <a href="/#">My work</a>
          <a href="/#">Blog</a>
          <a href="/#">About me</a>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>

      <div className="container">
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success">Signed in successfully</div>
        ) : (
          <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
        )}

        <form onSubmit={handleSubmit}>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="name"
                value={formValues.name}
                onChange={handleChange}
              />

              <label>Middle Name</label>
              <input
                type="text"
                name="middlename"
                placeholder="middle name"
                value={formValues.middlename}
                onChange={handleChange}
              />

              <label>Last Name</label>
              <input
                type="text"
                name="lastname"
                placeholder="last name"
                value={formValues.lastname}
                onChange={handleChange}
              />
            </div>
            <div>
              <Country />
            </div>
            <p>{formErrors.username}</p>

            <div>
              <label>No. of cattle</label>
              <input
                type="text"
                name="no.ofcattle"
                placeholder="no. of cattle"
              />

              <label>Milk Produce</label>
              <input
                type="text"
                name="milk produce"
                placeholder="milk produce"
              />
            </div>

            <button className="fluid ui button blue">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Navbar;
