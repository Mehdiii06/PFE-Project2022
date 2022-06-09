const express = require("express")
const router = express.Router()
const app = express();

const cookieParser = require("cookie-parser");
const passport = require('passport')

// Routes
const { register, login } = require('./authRoute');
const { getAllUsers, getUser, delUser , updatepassword , getAlldevs , getAllClients ,updateuser ,getAllMangers} = require('./userRoute')
const { updateClaim , getClaim, getAllClaim, addClaim, updateStatusClaim, delClaim, archivedClaim} = require('./claimRoute')
const { getTask, getAllTasks, createTask, delTask, delAllTasks, updateStatusTask, updateTask, assignedTo, unassignedFrom } = require('./taskRoute')
const { addCompany , getAllCompany , delCompany , updatecompany, getCompany} = require('./companyRoute');
const { isRole, ROLES } = require('../middleware/RoleMiddleware.js')

// middleware
app.use(express.json())
app.use(cookieParser())

// passport
app.use(passport.initialize())
require('../middleware/passport')(passport)
const Authentication = passport.authenticate('jwt', { session: false })
const Authorization = {
    Project_manajer: isRole(ROLES.PROJECT_MANAGER),
    Developer: isRole(ROLES.DEVELOPER),
    Client: isRole(ROLES.CLIENT)
}

const routesObject = {
    index: '/',
    auth: '/auth',
    // Authentication
    register: '/register',
    login: '/login',

    //User
    getAllUsers: '/users',
    getUser: '/users/:id',
    delUser: '/users/:id',
    updatepassword:'/users/updatepassword/:id',
    getAlldevs: '/devs',
    getAllClients: '/clients',
    updateuser :'/updateuser/:id',
    getAllMangers:'/getmangers',

    // Claim
    getAllClaim: '/claims',
    getClaim: '/claims/:id',
    addClaim: '/claims',
    updateStatusClaim: '/claims/:id',
    updateClaim:'/claim/:id',
    delClaim: '/claims/:id',
    archivedClaim: '/claim/archived/:id',

    //Task
    getAllTasks: '/tasks',
    getTask: '/tasks/:id',
    createTask: '/tasks',
    delTask: '/tasks/:id',
    delAllTasks: '/tasks',
    updateStatusTask: '/tasks/status/:id',
    updateTask: '/updatetask/:id',
    assignedTo: '/tasks/assigned/:id',
    unassignedFrom: '/tasks/unassigned/:id',

    //Company
    addCompany:'/addcompany',
    getAllCompany:'/getallcompany',
    delCompany:'/deleteCompany/:id',
    updatecompany:'/updateCompany/:id',
    getCompany: '/company/:id'
}

app.use(routesObject.auth, router)
app.use(routesObject.index, router)



router.get(routesObject.index, (req, res) => res.send('index'))

/* Authentication */
router.post(routesObject.register, Authentication, Authorization.Project_manajer, register)
router.post(routesObject.login, login)

/* User */
router.get(routesObject.getAllUsers, Authentication, Authorization.Project_manajer, getAllUsers)
router.get(routesObject.getUser, Authentication, Authorization.Project_manajer, getUser)
router.get(routesObject.getAlldevs, Authentication, Authorization.Project_manajer, getAlldevs)
router.get(routesObject.getAllClients, Authentication, Authorization.Project_manajer, getAllClients)
router.get(routesObject.getAllMangers, Authentication, Authorization.Project_manajer, getAllMangers)
router.delete(routesObject.delUser, Authentication, Authorization.Project_manajer, delUser)
router.put(routesObject.updatepassword, updatepassword)
router.put(routesObject.updateuser,Authentication, Authorization.Project_manajer, updateuser)


/* Claim */
router.post(routesObject.addClaim, Authentication, Authorization.Client, addClaim)
router.get(routesObject.getClaim, Authentication, isRole(ROLES.PROJECT_MANAGER, ROLES.CLIENT), getClaim)
router.get(routesObject.getAllClaim, Authentication,isRole(ROLES.PROJECT_MANAGER, ROLES.CLIENT), getAllClaim)
router.put(routesObject.updateStatusClaim, Authentication, Authorization.Project_manajer, updateStatusClaim)
router.put(routesObject.updateClaim, Authentication, Authorization.Client, updateClaim)
router.delete(routesObject.delClaim, Authentication, isRole(ROLES.PROJECT_MANAGER, ROLES.CLIENT), delClaim)
router.put(routesObject.archivedClaim,   archivedClaim)


/* Task */
router.post(routesObject.createTask, Authentication, isRole(ROLES.PROJECT_MANAGER, ROLES.DEVELOPER), createTask)
router.get(routesObject.getAllTasks, Authentication, isRole(ROLES.PROJECT_MANAGER, ROLES.DEVELOPER), getAllTasks)
router.get(routesObject.getTask, Authentication, isRole(ROLES.PROJECT_MANAGER, ROLES.DEVELOPER), getTask)
router.put(routesObject.updateStatusTask, Authentication, isRole(ROLES.PROJECT_MANAGER, ROLES.DEVELOPER), updateStatusTask)
router.put(routesObject.updateTask, Authentication, isRole(ROLES.PROJECT_MANAGER, ROLES.DEVELOPER), updateTask)
router.delete(routesObject.delTask, Authentication, isRole(ROLES.PROJECT_MANAGER, ROLES.DEVELOPER), delTask)
router.delete(routesObject.delAllTasks, Authentication, isRole(ROLES.PROJECT_MANAGER, ROLES.DEVELOPER), delAllTasks)
router.put(routesObject.assignedTo, Authentication, isRole(ROLES.PROJECT_MANAGER, ROLES.DEVELOPER), assignedTo)
router.put(routesObject.unassignedFrom, Authentication, isRole(ROLES.PROJECT_MANAGER, ROLES.DEVELOPER), unassignedFrom)

/*company*/
router.post(routesObject.addCompany , Authentication , Authorization.Project_manajer , addCompany)
router.get(routesObject.getCompany, Authentication, Authorization.Project_manajer, getCompany)
router.get(routesObject.getAllCompany , Authentication , Authorization.Project_manajer , getAllCompany)
router.delete(routesObject.delCompany , Authentication , Authorization.Project_manajer ,delCompany)
router.put(routesObject.updatecompany, Authentication, Authorization.Project_manajer,updatecompany)


module.exports = router