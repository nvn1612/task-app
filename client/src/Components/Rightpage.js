import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FixedSizeGrid as Grid } from 'react-window';

const Rightpage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/gettaskbelonguser', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    if (rowIndex === 0) {
      switch (columnIndex) {
        case 0:
          return <div style={style}>STT</div>;
        case 1:
          return <div style={style}>Tên nhiệm vụ </div>;
        case 2:
          return <div style={style}>Mô tả nhiệm vụ</div>;
        default:
          return null;
      }
    } else {
      const task = tasks[rowIndex - 1];
      switch (columnIndex) {
        case 0:
          return <div style={style}>{rowIndex}</div>;
        case 1:
          return <div style={style}>{task.TaskName}</div>;
        case 2:
          return <div style={style}>{task.TaskDescription}</div>;
        default:
          return null;
      }
    }
  };

  return (
    <div className="tabletask">
      <Grid
        columnCount={4}
        columnWidth={270}
        height={400}
        rowCount={tasks.length + 1}
        rowHeight={90}
        width={1000}
      >
        {Cell}
      </Grid>
    </div>
  );
};

export default Rightpage;