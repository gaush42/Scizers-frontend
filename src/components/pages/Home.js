import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [contact, setContact] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    const result = await axios.get("http://localhost:5000/api/data");
    setContact(result.data.reverse());
  };

  const deleteUser = async _id => {
    await axios.delete(`http://localhost:5000/api/delete/${_id}`);
    loadContact();
  };
  const filterData = contact.filter((contacts)=>
    contacts.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const handleSearch =(e)=>{
    setSearchTerm(e.target.value)
  }

  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <input
            placeholder="Search for Peopel"
            type="text"
            onChange={handleSearch}
          />
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/edit/${user._id}`}
                  >
                    Edit
                  </Link>
                  <Link className="btn btn-danger" to=""
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
