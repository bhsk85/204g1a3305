import { useEffect } from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import axios from "axios";

const TrainsList = () => {
  const [trainList, setTrainList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/trains");
        setTrainList(response.data);
      } catch (error) {
        console.error("Error fetching train data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid="md" className="my-5">
      <h2>Train List</h2>

      <Table striped bordered hover className="my-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Train Number</th>
            <th>Train Name</th>
            <th>Price</th>
            <th>Seats Available</th>
            <th>Departure Time</th>
            <th>Delayed By</th>
          </tr>
        </thead>
        <tbody>
          {trainList.map((train, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{train.trainNumber}</td>
              <td>{train.trainName}</td>
              <td>
                Sleeper: ${train.price.sleeper}
                <br />
                AC: ${train.price.AC}
              </td>
              <td>
                Sleeper: {train.seatsAvailable.sleeper}
                <br />
                AC: {train.seatsAvailable.AC}
              </td>
              <td>
                {train.departureTime.Hours}:
                {train.departureTime.Minutes < 10
                  ? "0" + train.departureTime.Minutes
                  : train.departureTime.Minutes}
              </td>
              <td
                className={train.delayedBy > 10 ? "bg-danger text-white" : ""}
              >
                {train.delayedBy} minutes
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TrainsList;
