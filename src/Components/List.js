import React, { useEffect, useState } from 'react'
import { Container, Jumbotron, Modal, Spinner, Table } from 'react-bootstrap';

const List = (props) => {

  const [memmberList, setMemberList] = useState(null)
  const [lgShow, setLgShow] = useState(false)
  const [active, setActive] = useState('')

  console.log(memmberList)

  useEffect(() => {
    fetch('https://fake-jsun-server.herokuapp.com/members')
      .then(res => res.json())
      .then(result => {
        setMemberList(result)
      })
  }, [])


  const modalHandler = (ele) => {
    setLgShow(true)
    setActive(ele)
  }

  if (memmberList == null) {
    return (
      <Spinner animation="border" variant="info" style ={{ marginLeft:'45vw',marginTop:'40vh',width:'6rem',height:'6rem'}}/>
    )
  }
  else {
    return (
      <>
      <Jumbotron fluid>
        <Container>
          <h1>Members Info</h1>
        </Container>
      </Jumbotron>
      <div style={{ maxWidth: '70%', margin: 'auto', marginTop: '10vh' }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Real Name</th>
              <th>Time Zone</th>
            </tr>
          </thead>
          <tbody>
            {memmberList ? memmberList.map(ele => {
              return (
                <tr key={ele.id}>
                  <td>{ele.id}</td>
                  <td onClick={() => modalHandler(ele)}>{ele.real_name}</td>
                  <td>{ele.tz}</td>
                </tr>
              )
            })
              : null}
            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  Large Modal
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover variant="dark">
                  <tbody>
                    <tr>
                      <th>#id</th>
                      <td>{active.id}</td>
                    </tr>
                    <tr>
                      <th>Name </th>
                      <td>{active.real_name}</td>
                    </tr>
                    <tr>
                      <th>Time Zone</th>
                      <td>{active.tz}</td>
                    </tr>
                  </tbody>
                </Table>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Start Time </th>
                      <th>End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {active ? active.activity_periods.map((ele, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{ele.start_time}</td>
                          <td>{ele.end_time}</td>
                        </tr>
                      )
                    }) : null}

                  </tbody>
                </Table>
              </Modal.Body>
            </Modal>
          </tbody>
        </Table>
      </div>
      </>
    )
  }
}

export default List