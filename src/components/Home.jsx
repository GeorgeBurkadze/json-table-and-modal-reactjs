import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Table, Modal, Button } from "react-bootstrap"

const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/todos/").then(response => {
            setPosts(response.data)
        })
    }, [])

    const [show, setShow] = useState(false);
    const [modaldata, setModaldata] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = (id, title) => {
        setShow(true)
        setModaldata({
            "id": id,
            "title": title
        })
    };
    const Modalbox = () => {
        return (
        <Modal show={show}>
            <Modal.Header>
            <Modal.Title>{ modaldata.id }</Modal.Title>
            </Modal.Header>
            <Modal.Body>{ modaldata.title }</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        )
    }
    return (
        <>
        {
            <Modalbox id="giorgi" title="burkadze" />
        }
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map(item => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => handleShow(item.id, item.title)}>Show in modal</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
        </>
    )
}

export default Home