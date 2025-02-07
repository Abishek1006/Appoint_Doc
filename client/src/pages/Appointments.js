import { Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import Spinner from "./../components/Spinner";
import { useSelector } from "react-redux";


const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.user);

  const getAppointments = useCallback(async () => {
    try {
      const endpoint = user.isDoctor ? 
        "/api/doctor/doctor-appointments" : 
        "/api/user/user-appointments";
      
      const res = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getAppointments();
  }, [user, getAppointments]);
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}  
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  if (loading) return <Spinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <Layout>
      <h3 className="text-center">Appointments List</h3>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default Appointments;
