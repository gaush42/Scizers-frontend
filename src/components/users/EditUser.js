import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState({
    name: "",
    phone: ""
  });

  const { name, phone } = contact;
  const onInputChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if(id){
      loadContact(id)
    }
  }, [id]);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/update/${id}`, contact);
    navigate('/');
  };

  const loadContact = async (id) => {
    const result = await axios.get(`http://localhost:5000/api/data/${id}`);
    setContact(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Contact</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              name="phone"
              value={phone}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update Contact</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
