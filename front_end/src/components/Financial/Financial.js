import React, { useState, useEffect, useContext } from 'react'
import { Table, Icon, Button, Space, Input, Col, Row } from 'antd';
import axios from "axios";
import { EditTwoTone, DeleteOutlined, DeleteTwoTone, DownloadOutlined, FilePdfOutlined, FilePdfTwoTone, SelectOutlined, MessageOutlined } from '@ant-design/icons';
import CustomRow from '../common/Form_header';
import WrapperCard from '../common/Wrapper_card';
import { Link, useParams } from 'react-router-dom'
import AddFinancial from './AddFinancial';
import DeleteModal from '../common/DeleteModal';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'

const { Search } = Input;


const Financial = () => {
    const [financial, setFinancial] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState('');
    const [venue, setVenue] = useState("");
    const [total, setTotal] = useState("");
    const [status, setStatus] = useState("");
    const [deleteModalOpen, setIsDeleteModalOpen] = useState(false)


    const { _id } = useParams();
    const [refresh, setRefresh] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    function getFinancial() {
        axios.get("http://localhost:4000/financial/")
            .then((res) => {
                setFinancial(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }
    useEffect(() => {
        getFinancial();
    }, [refresh])


    // const handleDelete = (_id) => {
    //     setFinancial(financial => financial.filter(financial => financial._id !== _id));
    //   };
    const handleDelete = async (_id) => {
        setIsDeleteModalOpen(true)
        axios.delete("http://localhost:4000/financial/" + _id)
            .then((result) => {
                console.log("Deleted", result);
            }).catch((err) => {
                console.log(err);
            })
    };

    const handleUpdate = async (_id) => {
        setIsDeleteModalOpen(true)
        axios.put("http://localhost:4000/financial/" + _id)
            .then((result) => {
                console.log("Deleted", result);
            }).catch((err) => {
                console.log(err);
            })
    };

    const generatePdf = () => {
        var doc = new jsPDF()
        doc.setFontSize(40)
        doc.text(35, 25, 'Financial Summary')

        autoTable(doc,
            {
                columns:[
                    doc.setFontSize(40),
                    doc.text(35, 25, 'Financial Summary')
                ],
                columns: [
                    { header: 'Name', dataKey: 'name' },
                    { header: ' Type', dataKey: 'type' },
                    { header: 'Date', dataKey: 'date' },
                    { header: 'Venue', dataKey: 'venue' },
                    { header: 'Total Funds', dataKey: 'total' },
                    { header: 'Status', dataKey: 'status' },


                ],
                body: financial.map(financial => {
                    return {
                        Row:Row,
                        name: financial.name,
                        type: financial.type,
                        date: financial.date,
                        venue: financial.venue,
                        total: financial.total,
                        status: financial.status,
                    };
                })
            })
        doc.save('Financial Report.pdf')

    }

    const onSearch = (value) => console.log(value);

    const columns = [{
        title: 'Donation Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="#">{text}</a>,
    }, {
        title: 'Fund',
        dataIndex: 'address',
        key: 'address',
    },
    ];


    const Columns = [{
        title: 'Program Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    }, {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Venue',
        dataIndex: 'venue',
        key: 'venue',
    }, {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
    }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button icon={<EditTwoTone />} onClick={() => {
                    handleUpdate(record._id)
                }}>

                </Button>
                <Button icon={<DeleteOutlined style={{ color: 'red' }} />}
                    //  onClick={handleDelete}
                    onClick={() => handleDelete(record._id)
                    }

                ></Button>
            </Space>
        ),
    }];
    return (

        //     
        <>

            <br></br>
            <br></br>
            <br></br>

            <div style={{ paddingLeft: 150 }} >
                <div style={{ paddingLeft: 870 }} >
                    <Button onClick={() => { setIsModalOpen(true) }} type="primary">Create Report</Button>


                </div>
                <br></br>
                <br></br>

                <div style={{ padding: 1, alignItems: "center", width: 1000, height: 650, borderRadius: 5 }}>

                    <WrapperCard style={{ backgroundColor: "#37475E" }}>
                        <CustomRow style={{ justifyContent: "space-between", padding: "10px" }} >
                            <h1 style={{ color: "White", fontSize: 18 }}>Financial Summmary</h1>
                            <Col span={12} />
                            <Search
                                placeholder="input search text"
                                onSearch={onSearch}
                                style={{
                                    width: 250,
                                }}
                            />
                            <Button icon={<FilePdfOutlined style={{ fontSize: '21px', color: 'red' }} />} onClick={generatePdf} />
                        </CustomRow>
                    </WrapperCard>
                    <Table columns={Columns} dataSource={financial}
                    />
                    <AddFinancial
                        isModalOpen={isModalOpen}
                        handleCancel={handleCancel}
                        handleOk={handleOk}

                    />
                    <AddFinancial
                        isModalOpen={isModalOpen}
                        handleCancel={handleCancel}
                        handleOk={handleOk}
                    />

                    <br></br>
                    <br></br>
                    <br></br>


                    <Table columns={columns} dataSource={financial} />


                </div>
            </div>
        </>
    )
}

export default Financial