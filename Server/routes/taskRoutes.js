const express = require('express');
const router = express.Router();
const {getUserRole,createUserRole,deleteUserRole,updateUserRole,
    getUserTask,createUserTask,deleteUserTask,updateUserTask,
    getProject,createProject,deleteProject,updateProject,
    getTask,createTask,deleteTask,updateTask,
    getUserTaskTask,createUserTaskTask,deleteUserTaskTask,updateUserTaskTask,
    adLogin,getUser,getTaskBelongUser, middleware} = require('../controllers/taskControllers');


//Authenticate 
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:            
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    
 */

//ADlogin

/**
 * @swagger
 *  /api/login:
 *   post:
 *     tags: [Authentication]
 *     description: Authenticate a user and return a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: A successful login. The response body contains the JWT.
 *       '400':
 *         description: Bad request. The request body is missing or contains invalid data.
 *       '401':
 *         description: Unauthorized. Invalid username or password.
 */
router.post('/login', adLogin);

//get user

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags: [Api User]
 *     description: Retrieves all user items.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response containing an array of user items.
 *       '401':
 *         description: 'Unauthorized: No authorization token provided.'
 *       '403':
 *         description: 'Forbidden: Invalid authorization token.'
 *       '404':
 *         description: 'Not Found: No user items found.'
 *       '500':
 *         description: 'Internal Server Error: An error occurred.'
 */
router.get('/user', middleware,getUser);


//get task belong user

/**
 * @swagger
 *  /api/gettaskbelonguser:
 *   get:
 *     tags: [Api User]
 *     description: Retrieves all tasks belonging to the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response containing an array of task items.
 *       '401':
 *         description: 'Unauthorized: No authorization token provided or Invalid token.'
 *       '404':
 *         description: 'Not Found: No task items found.'
 *       '500':
 *         description: 'Internal Server Error: An error occurred.'
 */
router.get('/gettaskbelonguser',getTaskBelongUser);
 
// user role

/**
 * @swagger
 *  /api/getuserrole:
 *   get:
 *     tags: [User Role]
 *     description: Use to request all userrole items
 *     responses:
 *       '200':
 *         description: A successful response with all the userrole items.
 *       '401':
 *         description: No authorization token provided.
 *       '403':
 *         description: Invalid authorization token.
 *       '404':
 *         description: No userrole items found.
 *       '500':
 *         description: An error occurred.
 */
router.get('/getuserrole', getUserRole);

/**
 * @swagger
 *   /api/createuserrole:
 *   post:
 *     summary: Create a new user role
 *     tags: [User Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - UserRoleId
 *               - RoleName
 *             properties:
 *               UserRoleId:
 *                 type: integer
 *               RoleName:
 *                 type: string
 *     responses:   
 *       201:
 *         description: The user role was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/createuserrole',createUserRole);


/**
 * @swagger
 *  /api/deleteuserrole/{id}:
 *   delete:
 *     summary: Delete a user role
 *     tags: [User Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user role id
 *     responses:
 *       200:
 *         description: The user role was successfully deleted
 *       500:
 *         description: Some server error
 */
router.delete('/deleteuserrole/:id',deleteUserRole);


/**
 * @swagger
 *  /api/updateuserrole/{id}:
 *   put:
 *     summary: Update a user role
 *     tags: [User Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user role id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               RoleName:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user role was successfully updated
 *       500:
 *         description: Some server error
 */
router.put('/updateuserrole/:id',updateUserRole);


// user task

/**
 * @swagger
 *    /api/getusertask:
 *      get:
 *         tags: [User Task]
 *         description: Use to request all usertask items
 *         responses:
 *          '200':
 *            description: A successful response with all the usertask items.
 *          '404':
 *            description: No usertask items found.
 *          '500':
 *            description: An error occurred.
 */
router.get('/getusertask',getUserTask);

/**
 * @swagger
 *  /api/createusertask:
 *   post:
 *     summary: Create a new user task
 *     tags: [User Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - UserId
 *               - Username
 *               - Password
 *               - FirstName
 *               - LastName
 *               - Email
 *               - NumberPhone
 *               - UserRoleID
 *             properties:
 *               UserId:
 *                 type: integer
 *               Username:
 *                 type: string
 *               Password:
 *                 type: string
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *               Email:
 *                 type: string
 *               NumberPhone:
 *                 type: string
 *               UserRoleID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The user task was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/createusertask',createUserTask);


/**
 * @swagger
 *  /api/deleteusertask/{id}:
 *   delete:
 *     summary: Delete a user role
 *     tags: [User Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user task id
 *     responses:
 *       200:
 *         description: The user task was successfully deleted
 *       500:
 *         description: Some server error
 */
router.delete('/deleteusertask/:id',deleteUserTask);


/**
 * @swagger
 *   /api/updateusertask/{id}:
 *   put:
 *     summary: Update a user task
 *     tags: [User Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *               Password:
 *                 type: string
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *               Email:
 *                 type: string
 *               NumberPhone:
 *                 type: string
 *               UserRoleID:
 *                 type: integer
 *     responses:   
 *       200:
 *         description: The user task was successfully updated
 *       500:
 *         description: Some server error
 */
router.put('/updateusertask/:id',updateUserTask);


//project

/**
 * @swagger
 *    /api/getproject:
 *      get:
 *         tags: [Project]
 *         description: Use to request all project items
 *         responses:
 *          '200':
 *            description: A successful response with all the project items.
 *          '404':
 *            description: No project items found.
 *          '500':
 *            description: An error occurred.
 */
router.get('/getproject',getProject);


/**
 * @swagger
 *  /api/createproject:
 *   post:
 *     summary: Create a new project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ProjectId
 *               - ProjectName
 *               - ProjectDescription
 *               - UserId
 *             properties:
 *               ProjectId:
 *                 type: integer
 *               ProjectName:
 *                 type: string
 *               ProjectDescription:
 *                 type: string
 *               UserId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The project was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/createproject', createProject);

/**
 * @swagger
 * /api/deleteproject/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The project id
 *     responses:
 *       200:
 *         description: The project was successfully deleted
 *       500:
 *         description: Some server error
 */
router.delete('/deleteproject/:id', deleteProject);

/**
 * @swagger
 * /api/updateproject/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The project id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProjectName:
 *                 type: string
 *               ProjectDescription:
 *                 type: string
 *               UserId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The project was successfully updated
 *       500:
 *         description: Some server error
 */
router.put('/updateproject/:id', updateProject);

//task

/**
 * @swagger
 *   /api/gettask:
 *      get:
 *         tags: [Task]
 *         description: Use to request all task items
 *         responses:
 *          '200':
 *            description: A successful response with all the task items.
 *          '404':
 *            description: No task items found.
 *          '500':
 *            description: An error occurred.
 */
router.get('/gettask', getTask);

/**
 * @swagger
 *  /api/createtask:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - TaskId
 *               - TaskName
 *               - TaskDescription
 *               - ProjectId
 *             properties:
 *               TaskId:
 *                 type: integer
 *               TaskName:
 *                 type: string
 *               TaskDescription:
 *                 type: string
 *               ProjectId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The task was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/createtask', createTask);

/**
 * @swagger
 *  /api/deletetask/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task was successfully deleted
 *       500:
 *         description: Some server error
 */
router.delete('/deletetask/:id', deleteTask);

/**
 * @swagger
 *   /api/updatetask/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TaskName:
 *                 type: string
 *               TaskDescription:
 *                 type: string
 *               ProjectId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The task was successfully updated
 *       500:
 *         description: Some server error
 */
router.put('/updatetask/:id', updateTask);

//usertask-task



/**
 * @swagger
 *  /api/getusertasktask:
 *   get:
 *     summary: Retrieve all UserTask-Task relationships
 *     tags: [UserTask-Task]
 *     responses:
 *       200:
 *         description: The UserTask-Task relationships were successfully retrieved
 *       500:
 *         description: Some server error
 */
router.get('/getusertasktask', getUserTaskTask);


/**
 * @swagger
 *  /api/createusertasktask:
 *   post:
 *     summary: Create a new UserTask-Task relationship
 *     tags: [UserTask-Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdUserTask:
 *                type: integer
 *               UserId:
 *                 type: integer
 *               TaskId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The UserTask-Task relationship was successfully created
 *       500:
 *         description: An error occurred while creating a new UserTask-Task relationship
 */
router.post('/createusertasktask', createUserTaskTask);


/**
 * @swagger
 *   /api/deleteusertasktask/{id}:
 *   delete:
 *     summary: Delete a usertask-task
 *     tags: [UserTask-Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The usertask-task id
 *     responses:
 *       200:
 *         description: The usertask-task was successfully deleted
 *       500:
 *         description: Some server error
 */
router.delete('/deleteusertasktask/:id', deleteUserTaskTask);


/**
 * @swagger
 *   /api/updateusertasktask/{id}:
 *   put:
 *     summary: Update a usertask-task
 *     tags: [UserTask-Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The usertask-task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserId:
 *                 type: integer 
 *               TaskId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The usertask-task was successfully updated
 *       500:
 *         description: Some server error
 */
router.put('/updateusertasktask/:id', updateUserTaskTask);


module.exports = router;
