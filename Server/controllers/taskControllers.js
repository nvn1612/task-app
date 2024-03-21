const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

  const SECRET_KEY = '@16122002';

  exports.adLogin = async (req, res) => {
    const { username, password } = req.body;
  
    const user = await prisma.USERTASK.findUnique({
      where: {
        Username: username,
      },
    });
  
    if (user && password === user.Password) {
      const token = jwt.sign({ id: user.UserId }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token }); 
    } else {
      res.status(403).json({ message: 'Username or password is incorrect' });
    }
  };
  exports.middleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

//get user
  exports.getUser = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
    
      const user = await prisma.USERTASK.findUnique({
        where: {
          UserId: decoded.id,
        },
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    
      return res.json(user);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  //get user and task
  exports.getTaskBelongUser = async (req, res) => {
      const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY);

      const userTasks = await prisma.USERTASK_TASK.findMany({
        where: {
          UserId: decoded.id,
        },
        include: {
          TASK: true,
        },
      });

      const tasks = userTasks.map(userTask => userTask.TASK);

      return res.json(tasks);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
// user role

exports.getUserRole = async (req, res) => {
  try {
    const userRole = await prisma.USERROLE.findMany();
    res.status(200).json(userRole);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving data from the USERROLE table.' });
  }
};


  exports.createUserRole = async (req, res) => {
    try {
      const newUserRole = await prisma.USERROLE.create({
        data: req.body,
      });
      res.status(201).json(newUserRole);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while creating a new USERROLE.' });
    }
  };

 exports.deleteUserRole = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedUserRole = await prisma.USERROLE.delete({
        where: {
          UserRoleId: Number(id),
        },
      });
      res.status(200).json(deletedUserRole);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while deleting the USERROLE.' });
    }
  };

  exports.updateUserRole = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedUserRole = await prisma.USERROLE.update({
        where: {
          UserRoleId: Number(id),
        },
        data: req.body,
      });
      res.status(200).json(updatedUserRole);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while updating the USERROLE.' });
    }
  };

  //user task

  exports.getUserTask = async (req, res) => {
    try {
      const userTask = await prisma.USERTASK.findMany();
      res.status(200).json(userTask);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving data from the USERTASK table.' });
    }
  };

  exports.createUserTask = async (req, res) => {
    try {
      const newUserTask = await prisma.USERTASK.create({
        data: req.body,
      });
      res.status(201).json(newUserTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while creating a new USERTASK.' });
    }
  };

  exports.deleteUserTask = async (req, res) => {
      const { id } = req.params;
    
      try {
        const deletedUserTask = await prisma.USERTASK.delete({
          where: {
            UserId: Number(id),
          },
        });
        res.status(200).json(deletedUserTask);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while deleting the USERTASK.' });
      }
    };

  exports.updateUserTask = async (req, res) => { 
    const { id } = req.params;
  
    try {
      const updatedUserTask = await prisma.USERTASK.update({
        where: {
          UserId: Number(id),
        },
        data: req.body,
      });
      res.status(200).json(updatedUserTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while updating the USERTASK.' });
    }
  }

  //project

  exports.getProject = async (req, res) => {
    try {
      const project = await prisma.PROJECT.findMany();
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving data from the PROJECT table.' });
    }
  }

  exports.createProject = async (req, res) => {
    try {
      const newProject = await prisma.PROJECT.create({
        data: req.body,
      });
      res.status(201).json(newProject);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while creating a new PROJECT.' });
    }
  }

  exports.deleteProject = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedProject = await prisma.PROJECT.delete({
        where: {
          ProjectId: Number(id),
        },
      });
      res.status(200).json(deletedProject);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while deleting the PROJECT.' });
    }
  }

  exports.updateProject = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedProject = await prisma.PROJECT.update({
        where: {
          ProjectId: Number(id),
        },
        data: req.body,
      });
      res.status(200).json(updatedProject);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while updating the PROJECT.' });
    }
  }

  //task

  exports.getTask = async (req, res) => {
    try {
      const task = await prisma.TASK.findMany();
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving data from the TASK table.' });
    }
  }

  exports.createTask = async (req, res) => {
    try {
      const newTask = await prisma.TASK.create({
        data: req.body,
      });
      res.status(201).json(newTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while creating a new TASK.' });
    }
  }

  exports.deleteTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedTask = await prisma.TASK.delete({
        where: {
          TaskId: Number(id),
        },
      });
      res.status(200).json(deletedTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while deleting the TASK.' });
    }
  }

  exports.updateTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedTask = await prisma.TASK.update({
        where: {
          TaskId: Number(id),
        },
        data: req.body,
      });
      res.status(200).json(updatedTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while updating the TASK.' });
    }
  }

  //usertask_Task

  
  
  // Lấy tất cả mối quan hệ giữa USERTASK và TASK
  exports.getUserTaskTask = async function (req, res) {
    try {
      const userTaskTasks = await prisma.USERTASK_TASK.findMany();
      res.status(200).json(userTaskTasks);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while retrieving the UserTask-Task relationships.' });
    }
  }

  exports.createUserTaskTask = async (req, res) => {
    try {
      const newUserTaskTask = await prisma.USERTASK_TASK.create({
        data: req.body,
      });
      res.status(201).json(newUserTaskTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while creating a new USERTASK_TASK.' });
    }
  }

  exports.deleteUserTaskTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedUserTaskTask = await prisma.USERTASK_TASK.delete({
        where: {
          IdUserTask: Number(id),
        },
      });
      res.status(200).json(deletedUserTaskTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while deleting the USERTASK_TASK.' });
    }
  }

  exports.updateUserTaskTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedUserTaskTask = await prisma.USERTASK_TASK.update({
        where: {
          IdUserTask: Number(id),
        },
        data: req.body,
      });
      res.status(200).json(updatedUserTaskTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while updating the USERTASK_TASK.' });
    }
  }
 
