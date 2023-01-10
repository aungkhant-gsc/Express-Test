const path = require('path');
const data = {
    employees: require("../models/employees.json"),
    setEmployee : function(data){this.employees = data}
}

const getAllEmployee = (req, res) => {
    //res.json(data.employees)
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}

const createNewEmployee = (req, res) => {
    if(!req.body.name){
        return res.status(400).json({message: 'name is required!'})
    }

    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        name: req.body.name
    };
    data.setEmployee([...data.employees, newEmployee]);
    res.json(data.employees);
}

const updateEmployee = (req, res)=>{
    if(!req.body.id){
        return res.status(400).json({message: 'id is required!'})
    }

    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

    if(!employee){
        return res.status(400).json({message: `No employee founded with id ${req.body.id}`})
    }

    employee.name = req.body.name;

    const removedOldData = data.employees.filter(emp => emp.id !== parseInt(req.body.id))

    const newEmpList = [...removedOldData, employee];
    
    const reSort = newEmpList.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0);

    data.setEmployee(reSort);    

    res.json(data.employees);
}

const deleteEmployee = (req, res) => {
    if(!req.body.id){
        return res.status(400).json({message: 'id is required!'})
    }

    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

    if(!employee){
        return res.status(400).json({message: `No employee founded with id ${req.body.id}`})
    }

    const removedOldData = data.employees.filter(emp => emp.id !== parseInt(req.body.id));

    data.setEmployee(removedOldData);

    res.json(data.employees);
}
const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));

    if(!employee){
        return res.status(400).json({message: `No employee founded with id ${req.body.id}`})
    }

    res.json(employee)

}

module.exports = {
    getAllEmployee,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}