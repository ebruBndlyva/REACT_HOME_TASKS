import { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import './App.css';
import Modal from 'react-bootstrap/Modal';

function App() {
  let [datas, setData] = useState([]);
  let [modalData, setModalData] = useState({});
  let [showModal, setShowModal] = useState(false);  // Modal üçün
  let [showForm, setShowForm] = useState(false);    // Form üçün
  let [updateData, setUpdateData] = useState({});
  let [name, setName] = useState("");
  let [prof, setProf] = useState("");
  let [email, seteEmail] = useState("");
  let [role, setRole] = useState("");
  let [name2, setName2] = useState("");
  let [prof2, setProf2] = useState("");
  let [email2, seteEmail2] = useState("");
  let [role2, setRole2] = useState("");

  function getData() {
    axios.get("http://localhost:4000/users")
      .then(res => {
        setData(res.data);
      });
  }

  async function deleteData(id) {
    try {
      await axios.delete("http://localhost:4000/users/" + id);
      let filtered = datas.filter((user) => user.id !== id);
      setData(filtered);
    } catch (error) {
      console.log(error);
    }
  }

  function updatesData(id) {
    axios.get("http://localhost:4000/users/" + id)
      .then(res => {
        setUpdateData(res.data);
        setName(res.data.name);
        setProf(res.data.profession);
        seteEmail(res.data.email);
        setRole(res.data.role);
      });
    setShowForm(true);
  }

  function addForm(e) {
    e.preventDefault();
    let newObj = {
      name: name2,
      profession: prof2,
      email: email2,
      role: role2,
    };
  
    axios.post("http://localhost:4000/users", newObj)
      .then(res => {
       
        setData([...datas, res.data]); 
        
        setName2("");
        setProf2("");
        seteEmail2("");
        setRole2("");
      })
      .catch(err => {
        console.error("Xəta baş verdi: ", err);
      });
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    let newObj = {
      id: updateData.id,
      name: name,
      profession: prof,
      email: email,
      role: role
    };
    axios.put(`http://localhost:4000/users/${updateData.id}`, newObj)
      .then(res => {
        console.log(res.data);
        getData();
        setName("");
        setProf("");
        seteEmail("");
        setRole("");
        setShowForm(false);
      });
  }

  function handleModal(id) {
    axios.get("http://localhost:4000/users/" + id)
      .then(res => {
        setModalData(res.data);
      });
    setShowModal(true);
  }

  function closeForm() {
    setShowForm(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <form className='w-50' onSubmit={(e)=>addForm(e)}>
        <label htmlFor="name">Name</label>
        <input value={name2} onChange={(e) => setName2(e.target.value)} type="text" />
        <label htmlFor="prof">Profession</label>
        <input value={prof2} onChange={(e) => setProf2(e.target.value)} type="text" />
        <label htmlFor="email">Email</label>
        <input value={email2} onChange={(e) => seteEmail2(e.target.value)} type="email" />
        <label htmlFor="role">Role</label>
        <input value={role2} onChange={(e) => setRole2(e.target.value)} type="text" />
        <button className='btn btn-success'>Add</button>
      </form>
      <div className="table p-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Profession</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {
              datas.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleModal(user.id)}>{user.name}</td>
                  <td>{user.profession}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <DeleteOutlined className='btn btn-danger' onClick={() => deleteData(user.id)} />
                  </td>
                  <td>
                    <EditOutlined className='btn btn-primary' onClick={() => updatesData(user.id)} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>

      {/* Modal */}
      <div
        className="modal show"
        style={{ display: showModal ? "block" : "none" }}
      >
        {
          <Modal.Dialog key={modalData.id}>
            <Modal.Header className='d-flex justify-content-between'>
              <Modal.Title style={{ textTransform: "uppercase" }}>{modalData.name}</Modal.Title>
              <button onClick={() => setShowModal(false)} className='btn btn-warning'>X</button>
            </Modal.Header>

            <Modal.Body>
              <ol>
                <li>{modalData.profession}</li>
                <li>{modalData.email}</li>
                <li>{modalData.role}</li>
              </ol>
            </Modal.Body>
          </Modal.Dialog>
        }
      </div>

      <div
        style={{ display: showModal ? "block" : "none" }}
        className="overlay"
      ></div>

      {/* Form və Overlay */}
      <div className="form-container" style={{ display: showForm ? "block" : "none" }}>
        <div className="overlay-form" onClick={closeForm}></div>  {/* Overlay */}
        <div className="update-form">
          <form onSubmit={handleSubmit} key={updateData.id}>
            <label htmlFor="name">Ad:</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} type="text" />

            <label htmlFor="prof">Peşə:</label>
            <input id="prof" value={prof} onChange={(e) => setProf(e.target.value)} type="text" />

            <label htmlFor="email">E-poçt:</label>
            <input id="email" value={email} onChange={(e) => seteEmail(e.target.value)} type="email" />

            <label htmlFor="role">Rol:</label>
            <input id="role" value={role} onChange={(e) => setRole(e.target.value)} type="text" />

            <button className='btn btn-success' type="submit">Update</button>
            <button className='btn btn-danger' type="button" onClick={closeForm}>X</button> {/* Close button */}
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
