import { useEffect, useState } from 'react'
import { Space, Table,  Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from "axios"
import './App.css'

function App() {
  let [data, setData] = useState([])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',

      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Title',
      dataIndex: 'title',

    },
    {
      title: 'Email',
      dataIndex: 'email',

    },
    {
      title: 'Role',

      dataIndex: 'role',

    },
    {
      title: 'Action',

      render: (_, record) => (
        <Space size="middle">

          <EditOutlined />
          <DeleteOutlined onClick={()=>deleteData(record.key)}/>
        </Space>
      ),
    },
  ];

  function getData() {
    axios.get("http://localhost:4000/users")
      .then(res => {

        const modifiedData = res.data.map(item => ({
          ...item,
          key: item.id,
        }));
        setData(modifiedData);
      });
  }
  async function deleteData(id) {
   
   try {
 
    await axios.delete("http://localhost:4000/users/" + id)
    let filtered = data.filter((user) => user.id != id )
    setData(filtered)
   } catch (error) {
    console.log(error);
   }



  }

  console.log(data);
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default App
