import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import WorkoutCreate from "../Components/WorkoutCreate";
import WorkoutTable from "../Components/WorkoutTable";
import WorkoutEdit from "../Components/WorkoutEdit";

const WorkoutIndex = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [workoutToUpdate, setworkoutToUpdate] = useState({});

  const fetchWorkouts = () => {
    fetch("http://localhost:3000/log", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': props.token,
      },
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        setWorkouts(logData.logs);
      });
  };

  const editUpdateworkout = (workout) => {
    setworkoutToUpdate(workout);
    console.log(workout);
  };

  const updateOn = () => {
    setUpdateActive(true);
  };

  const updateOff = () => {
    setUpdateActive(false);
  };

  useEffect(() => {
    console.log('effect ran')
    fetchWorkouts();
  }, []);

  return (
    <Container>
      <Row>
        <Col md="3">
          <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token} />
        </Col>
        <Col md="9">
          <h2>
            <WorkoutTable
              workouts={workouts}
              editUpdateworkout={editUpdateworkout}
              updateOn={updateOn}
              fetchWorkouts={fetchWorkouts}
              token={props.token}
            />
          </h2>
        </Col>
        {updateActive ? (
          <WorkoutEdit
            workoutToUpdate={workoutToUpdate}
            updateOff={updateOff}
            token={props.token}
            fetchWorkouts={fetchWorkouts}
          />
        ) : (
            <></>
          )}
      </Row>
    </Container>
  );
};

export default WorkoutIndex;
