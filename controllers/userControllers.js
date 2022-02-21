const mssql=require('mssql')
const config =require('../config/db')

async function getUsers(req,res){
    try{
        await mssql.connect(config)
        const result=await(new mssql.Request().execute('get_all').then((result)=>{
        res.send(result.recordset)
        console.log(result.recordset)
        }).catch((err)=>{
        res.send(result)
        console.log(result)
        }));
    }catch(err){
        console.log(err)
    }

}
async function getUserById(req,res){
    const id=req.params.id;
    try{
        await mssql.connect(config)
        const result=await(new mssql.Request().input('id',mssql.Int,`${id}`).execute('select_by_id').then((result)=>{
            res.send(result.recordset)
            console.log(result.recordset)
            }).catch((err)=>{
            res.send(result)
            console.log(result)
            }));
    }catch(err){
        console.log(err)
    }

}


async function addUser(req,res){
    const {firstname,secondname,email,project,password}=req.body
    // console.log(project);
    // console.log(firstname);
    try{
        let pool=await mssql.connect(config)
     await pool.request().
        input('firstname',firstname)
        .input('secondname',secondname)
        .input('email',email)
        .input('project',project)
        .input('password',password).execute('add_user')
        res.json('Data inserted successfully')
    }catch(err){
        console.log(err)
    }

}
async function deleteUser(req,res){
    const id=req.params.id;
    try{
        await mssql.connect(config)
        const result=await(new mssql.Request().input('id',mssql.Int,`${id}`).execute('delete_user').then((result)=>{
            res.json("data deleted successfully")
            
            }).catch((err)=>{
            res.send(result)
            console.log(result)
            }));
    }catch(err){
        console.log(err)
    }

}
async function updateUser(req,res){
    const id=req.params.id;
    const {firstname,secondname,email,project,password}=req.body
    // console.log(project);
    // console.log(firstname);

    try{
        let pool=await mssql.connect(config)
     await pool.request()
        .input('id',id)
        .input('firstname',firstname)
        .input('secondname',secondname)
        .input('email',email)
        .input('project',project)
        .input('password',password).execute('update_user')
        res.json('Data updated successfully')
    }catch(err){
        console.log(err)
    }

}

module.exports={getUsers,addUser,getUserById,deleteUser,updateUser};
