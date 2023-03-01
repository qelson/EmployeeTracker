const inquirer = require("Inquirer")
const mySQL = require("MySQL2")
require("console.table")
const db = mySQL.createConnection({
    host: "localHost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeetracker_db"
})
db.connect(function(err){
    if (err) throw err;
start()

})


function start(){
    inquirer.prompt([
        {
            type: "list",
            message: "Select an option",
            name: "userChoice",
            choices: ["View all employees.", "View all Departments", "View all Roles", "Add Employee", "Add Role", "Add Department", "Exit App"],

        }
    ]).then (Response => {
        switch(Response.userChoice){
            case "View all employees.":
            viewAllEmployees()
            break; 
            default:
                db.end();
                process.exit(0)
        }
    })
}

function viewAllEmployees(){
    db.query("select * from employee;",function(err,data){
        if(err) throw err;
        console.table(data)
        start()
    })
}