import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";


const TodoTable = () => {
    const [todoList, setTodoList] = useState([]);
    const [datetodo, setDatetodo] = useState("");
    const [project, setProject] = useState("");
    const [task, setTask] = useState("");
    const [des, setDes] = useState("");
    const [timetodo, setTimetodo] = useState("");
    const [id, setId] = useState("");


    const showTodo = async () => {
    try {
        const { data } = await axios.get("/api/show/showtasklist");
        setTodoList(data);
    } catch (err) {
        console.log(err);
    }
    };

    const addTodo = async (e) => {
        e.preventDefault();
        try{
            const add = await axios.post("/api/create/tasklist", {datetodo, project, task, des, timetodo});  
            if(add.status === 200){
                setDatetodo("");
                setProject("");
                setTask("");
                setDes("");
                setTimetodo("");
                showTodo();
            }
        }catch(err){
            console.log(err);
        }
    }
    const deletetodo = async (id) => {
        try {
            const tododel = await axios.delete(`/api/task/delete/${id}`);
            if(tododel.status === 200){
                showTodo();
            }

        } catch (error) {
            console.log(error);
        }
    }

    const showSingleTodo = async (id) => {
        try {
          const { data } = await axios.get(`/api/show/showsingletask/${id}`);
          setDatetodo(moment(data.datetodo).format("YYYY-MM-DD"));
          setProject(data.project);
          setTask(data.task);
          setDes(data.des);
          setTimetodo(data.timetodo);
          setId(data.id);
        } catch (error) {
          console.log(error);
        }
    };

    
    const editTodo = async (e) => {
        e.preventDefault();
        try {
            const edit = await axios.put(`/api/task/update/${id}`, {datetodo, project, task, des, timetodo});
            if(edit.status === 200){
                setDatetodo("");
                setProject("");
                setTask("");
                setDes("");
                setTimetodo("");
                showTodo();
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            editTodo(e);
        } else {
            addTodo(e);
        }
    }
    useEffect(() => {showTodo();}, []);
        
    return (
    <div className="container">
        <h3 className="text-center mt-3">THÊM MỚI CÔNG VIỆC</h3>
        <form action="/action_page.php" method="post" className="form-inline" onSubmit={handleSubmit}>
        <div className="mb-3 d-flex gap-2">
            <label htmlFor="datetodo" className="form-label">Ngày:</label>
            <input
                onChange={(e) => setDatetodo(e.target.value)}
                value={datetodo}
                type="date"
                className="form-control"
                id="datetodo"
                name="datetodo"
                required
            />
        </div>
        <div className="mb-3 d-flex gap-2">
            <label htmlFor="project" className="form-label">Dự án:</label>
            <input
            onChange={(e) => setProject(e.target.value)}
            value={project}
            type="text"
            className="form-control"
            id="project"
            name="project"
            required
            />
        </div>
        <div className="mb-3 d-flex gap-2">
            <label htmlFor="task" className="form-label">Công việc:</label>
            <input
            onChange={(e) => setTask(e.target.value)}
            value={task}
            type="text"
            className="form-control"
            id="task"
            name="task"
            required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="des" className="form-label">Mô tả:</label>
            <textarea
            onChange={(e) => setDes(e.target.value)}
            value={des}
            className="form-control"
            id="des"
            name="des"
            rows="3"
            required
            ></textarea>
        </div>
        <div className="mb-3 d-flex gap-2">
            <label htmlFor="timetodo" className="form-label">Thời gian:</label>
            <input
            onChange={(e) => setTimetodo(e.target.value)}
            value={timetodo}
            type="time"
            className="form-control"
            id="timetodo"
            name="timetodo"
            required
            />
        </div>
        <button type="submit" className="btn btn-primary m-3">
            Thêm mới
        </button>
        <button type="submit" className="btn btn-success">
        sửa
        </button>
        </form>
        <h3 className="text-center mt-3">DANH SÁCH CÔNG VIỆC</h3>
        <table className="table mt-3">
        <thead>
            <tr>
            <th scope="col">ID</th>
            <th scope="col">Ngày</th>
            <th scope="col">Dự án</th>
            <th scope="col">Nhiệm vụ</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Thời gian</th>
            <th scope="col">Sửa/Xóa</th>
            </tr>
        </thead>
        <tbody>
            {todoList && todoList.map((todo) => (
            <tr key={todo.id}>
                <th scope="row">{todo.id}</th>
                <td>{moment(todo.datetodo).format("DD-MM-YYYY")}</td>
                <td>{todo.project}</td>
                <td>{todo.task}</td>
                <td>{todo.des}</td>
                <td>{todo.timetodo}</td>
                <td>
                <div className="d-flex gap-2">
                    <i class="fa-solid fa-pen" onClick={()=>showSingleTodo(todo.id)}></i>
                    <i class="fa-solid fa-delete-left"style={{ marginLeft: '15px' }} onClick={()=>deletetodo(todo.id)}></i>
                </div>
                </td>
            </tr>
            ))} 
        </tbody>
        </table>
    </div>
    );
    };

export default TodoTable;
