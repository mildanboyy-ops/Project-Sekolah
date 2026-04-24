const { success, error } = require("../../../utils/response")
const service = require("./service")

const dashboardAdmin = async (req,res)=>{

  try{

    const data = await service.getDashboardAdmin()

    return success(res,"Dashboard admin berhasil didapatkan",data)

  }catch(err){

    return error(res,err.message)

  }

}

module.exports = {
  dashboardAdmin
}