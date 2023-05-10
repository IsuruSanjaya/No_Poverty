import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Modal, Button, Input, Form, notification } from "antd";
import WrapperCard from '../../common/Wrapper_card';
import CustomRow from '../../common/Form_header';
import '../Event-Main.css';
import { ReadOutlined } from '@ant-design/icons';
import FormItem from "antd/es/form/FormItem";

const DisplayEvent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [participateModalVisible, setParticipateModalVisible] = useState(false);
    const [eventDetails, setAllEventDetails] = useState([]);
    const [id, setid] = useState("");
    const [name, setname] = useState("");
    const [eventId, setEventId] = useState("");
    const [selectedEventId, setSelectedEventId] = useState(null);

    function getAllEventDetails() {
        axios
            .get("http://localhost:4000/event/getAll")
            .then((res) => {
                console.log(res);
                setAllEventDetails(res.data.Event);
                setEventId(res.data.Event[0]._id); // set the first event ID as default
            })
            .catch(() => {
                alert("Check The Connectivity");
            });
    }

    useEffect(() => {
        getAllEventDetails();
    }, []);

    const handleSubmit = () => {
        // e.preventDefault();

        const eventSchema = {
            id,
            name,
        };
        axios
            .post(
                `http://localhost:4000/event/${eventId}/registered-entities`,
                eventSchema
            )
            .then(() => {
                window.location.reload(false);
            })
            .catch((err) => {
                alert(err);
            });
        console.log(eventSchema);
    };

    const showModal = () => {
        setModalVisible(true);
    };


    const handleCancel = () => {
        setModalVisible(false);
    };

    // const showParticipateModal = () => {
    //     setModalVisible(false);
    //     setParticipateModalVisible(true);
    // };

    const showParticipateModal = () => {
        setModalVisible(false);
        setParticipateModalVisible(true);
    };

    const handleEventSelect = (eventId) => {
        setEventId(eventId);
        setSelectedEventId(eventId);
    };

    return (
        <div className="main-container">
            <div className="sub-container">
                <WrapperCard style={{ backgroundColor: "#37475E" }}>
                    <CustomRow
                        style={{ justifyContent: "space-between", padding: "16px" }}
                    >
                        <h1 style={{ color: "white" }}>Upcoming Events</h1>
                    </CustomRow>
                </WrapperCard>
                <div
                    style={{ justifyContent: "center", margin: "5%" }}
                >
                    {eventDetails.map((eventDetailsVal) => (
                        <Card
                            key={eventDetailsVal._id}
                            title={<div style={{ textAlign: "center", fontWeight: "bolder" }}>{eventDetailsVal.eventName}</div>}
                            bordered={false}
                            style={{
                                marginBottom: "20px",
                                width: "100%",
                                backgroundColor: selectedEventId === eventDetailsVal._id ? "#e6f7ff" : "#fff",
                                border: selectedEventId === eventDetailsVal._id ? "2px solid #1890ff" : "1px solid #d9d9d9"
                            }}
                            onClick={() => handleEventSelect(eventDetailsVal._id)}

                        >

                            <div style={{ display: "flex", marginBottom: "10px" }}>
                                <Card style={{ width: "100%", backgroundColor: "#eaeaea", marginRight: "10px" }} title={<div style={{ textAlign: "center", fontWeight: "bold" }}>Location</div>}>
                                    <div style={{ fontWeight: "lighter" }}> {eventDetailsVal.eventPlace}</div>
                                </Card>
                                <Card style={{ width: "100%", backgroundColor: "#eaeaea" }} title={<div style={{ textAlign: "center", fontWeight: "bold" }}>Date</div>}>
                                    <div style={{ fontWeight: "lighter", display: "flex", justifyContent: "center" }}>{eventDetailsVal.eventDate}</div>
                                </Card>
                            </div>
                            <Card style={{ width: "100%", backgroundColor: "#eaeaea" }} title={<div style={{ textAlign: "center", fontWeight: "bold" }}>Description</div>}>
                                <p style={{ fontWeight: "lighter" }}>{eventDetailsVal.eventDetails.length > 124 ? eventDetailsVal.eventDetails.substring(0, 120) + " ..." : eventDetailsVal.eventDetails}</p>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <ReadOutlined
                                        onClick={() => {
                                            showModal();
                                        }}
                                        style={{
                                            color: "#5DBB63",
                                            cursor: "pointer",
                                            marginLeft: "20px",
                                        }}
                                    />

                                </div>
                            </Card>
                            {/* <CustomRow style={{ justifyContent: "flex-end" }}>
                                <ReadOutlined onClick={showModal} style={{ color: "#5DBB63", cursor: "pointer", marginLeft: "20px" }} />
                            </CustomRow> */}

                            {eventDetailsVal._id === selectedEventId && (

                                <Modal
                                    open={modalVisible}
                                    onCancel={handleCancel}
                                    footer={null}
                                >
                                    <Form onFinish={handleSubmit}>

                                        <FormItem>
                                            <Card style={{ width: "100%", backgroundColor: "#EAEAEA" }} title={<div style={{ textAlign: "center", fontWeight: "bold" }}>Participate</div>}>
                                                <p style={{ fontWeight: "lighter" }}>{eventDetailsVal.eventDetails}</p>
                                            </Card>
                                            <h3 style={{ display: "flex", justifyContent: "center" }}>Participate in Event</h3>
                                        </FormItem>
                                        <Form.Item
                                            label="Name"
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your name!",
                                                },
                                            ]}
                                        >
                                            <Input onChange={(e) => setname(e.target.value)} />
                                        </Form.Item>
                                        <Form.Item
                                            label="ID No"
                                            name="id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your ID!",
                                                },
                                            ]}
                                        >
                                            <Input onChange={(e) => setid(e.target.value)} />
                                        </Form.Item>

                                        <CustomRow style={{ justifyContent: "flex-end" }}>
                                            <Button type="primary" htmlType="submit">
                                                Participate in Event
                                            </Button>
                                        </CustomRow>
                                    </Form>
                                </Modal>
                            )}

                            {/* <Modal open={modalVisible} onCancel={handleCancel} footer={null} destroyOnClose={true}>
                                <p>{eventDetailsVal.eventDetails}</p>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button onClick={showParticipateModal} style={{ backgroundColor: "#5DBB63", color: "#fff" }}>Participate</Button>
                                </div>
                            </Modal> */}
                        </Card>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default DisplayEvent;