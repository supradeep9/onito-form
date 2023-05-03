import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import firebaseDb from "./firebase";
import { Link } from "react-router-dom";

const Form = () => {
  const mob = /^(0|91)?[6-9][0-9]{9}$/;
  const aad = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
  const pan = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;

  const schemas = yup.object().shape({
    name: yup.string().required(),
    age: yup
      .number()
      .typeError("Age is required field")
      .positive()
      .integer()
      .required(),
    sex: yup.string().required(),
    mobile: yup.string().matches(mob),
    emgNo: yup.string().matches(mob),
    govttId: yup.string().when("govtid", {
      is: "Aadhar",
      then: (schema) => schema.matches(aad).max(12).notRequired(),
      otherwise: (schema) => schema.matches(pan).max(10).notRequired(),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemas),
  });
  const submitt = async (data) => {
    var dataAdded = await firebaseDb.child("form").push(data, (err) => {
      if (err) {
        console.log(err);
      }
      reset();
    });
  };

  return (
    <div>
      <Link to="/table" className="details">
        Details
      </Link>
      <div className="box">
        <form className="personal" onSubmit={handleSubmit(submitt)}>
          <h5> Personal Details</h5>
          <label htmlFor="name" className="lname">
            Name:{" "}
          </label>
          <input
            className="name"
            type="text"
            id="name"
            placeholder="Enter Name"
            name="name"
            {...register("name")}
          ></input>
          <span>{errors.name?.message} </span>
          <label htmlFor="age" className="lage">
            Age:{" "}
          </label>
          <input
            className="age"
            type="number"
            id="age"
            placeholder="Enter Your age"
            name="age"
            {...register("age")}
          ></input>
          <span>{errors.age?.message} </span>
          <label htmlFor="sex" className="lsex">
            Sex:{" "}
          </label>
          <select id="sex" name="sex" {...register("sex")} className="sex">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>{" "}
          <br />
          <label htmlFor="mobile" className="lmobile">
            Mobile:{" "}
          </label>
          <input
            className="mobile"
            type="number"
            id="mobile"
            name="mobile"
            placeholder="Enter Mobile number"
            {...register("mobile")}
          ></input>
          <label htmlFor="govtid" className="lgovtid">
            Govt ID:{" "}
          </label>
          <select
            id="govtid"
            name="govtid"
            {...register("govtid")}
            className="govtid"
          >
            <option value="Aadhar">Aadhar</option>
            <option value="Pan">Pan</option>
          </select>{" "}
          <input
            className="govttId"
            type="text"
            name="govttId"
            {...register("govttId")}
          ></input>
          <h5>Contact Details</h5>
          <label htmlFor="guardianDetails" className="lgd">
            Guardian Details:
          </label>
          <input
            className="gd"
            type="text"
            id="guardianDetails"
            placeholder="Enter Guardian Name"
            name="guardianDetails"
            {...register("guardianDetails")}
          ></input>
          <label htmlFor="email" className="lemail">
            email:{" "}
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            className="email"
          ></input>
          <label htmlFor="econtact" className="lemgno">
            Emergency No{" "}
          </label>
          <input
            type="text"
            id="econtact"
            placeholder="Enter Emergency No"
            {...register("emgNo")}
            className="emgno"
          ></input>
          <h5>Address Details</h5>
          <label htmlFor="address" className="ladd">
            Address:{" "}
          </label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            name="address"
            {...register("address")}
            className="add"
          ></input>
          <label htmlFor="state" className="lstate">
            State:{" "}
          </label>
          <select id="state" name="state" className="state">
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Uttara Pradesh">Uttara Pradesh</option>
            <option value="Delhi">Delhi</option>
          </select>{" "}
          <label htmlFor="city" className="lcity">
            City:{" "}
          </label>
          <select id="city" name="city" className="city">
            <option value="Eluru">Eluru</option>
            <option value="Chennai">Chennai</option>
            <option value="Kanpur">Kanpur</option>
            <option value="New Delhi">New Delhi</option>
          </select>{" "}
          <br />
          <label htmlFor="country" className="lcountry">
            Country:{" "}
          </label>
          <input
            type="text"
            id="address"
            value="India"
            className="country"
          ></input>
          <label htmlFor="pincode" className="lpin">
            Pincode:{" "}
          </label>
          <input
            type="text"
            id="pincode"
            placeholder="Enter Pincode"
            className="pin"
          ></input>
          <h5>Other Details</h5>
          <label htmlFor="occupation" className="locc">
            Occupation:{" "}
          </label>
          <input
            className="occ"
            type="text"
            id="occupation"
            placeholder="Enter Occupation"
          ></input>
          <label htmlFor="religion" className="lreli">
            Religion:{" "}
          </label>
          <select id="religion" name="religion" className="reli">
            <option value="Hinduism">Hinduism</option>
            <option value="Islam">Islam</option>
            <option value="Christianity">Christianity</option>
            <option value="Sikhism">Sikhism</option>
          </select>{" "}
          <label htmlFor="martial" className="lmart">
            Martial Status:{" "}
          </label>
          <select id="martial" name="martial" className="mart">
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          <label htmlFor="bloodgroup" className="lblood">
            Blood Group:{" "}
          </label>
          <select id="bloodgroup" name="bloodgroup" className="blood">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>{" "}
          <br />
          <label htmlFor="nationality" className="lnat">
            Nationality:{" "}
          </label>
          <input
            className="nat"
            type="text"
            id="nationality"
            name="nationality"
            {...register("nationality")}
          ></input>{" "}
          <br />
          <button type="submitt" className="submitt">
            submitt
          </button>
          <button
            className="reset"
            type="reset"
            onClick={() => {
              reset();
            }}
          >
            reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
