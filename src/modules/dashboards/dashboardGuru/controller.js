const { success, error } = require("../../../utils/response")
const service = require("./service")

const dashboardGuru = async (req,res)=>{

  try{

    const guruId = req.user.id

    const data = await service.getDashboardGuru(guruId)

    return success(res,"Dashboard guru berhasil didapatkan",data)

  }catch(err){

    return error(res,err.message)

  }

}

module.exports = {
  dashboardGuru
}