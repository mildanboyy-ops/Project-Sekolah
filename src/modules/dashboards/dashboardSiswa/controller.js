const { success, error } = require("../../../utils/response")
const service = require("./service")

const dashboardSiswa = async (req,res)=>{

  try{

    const data = await service.getDashboardSiswa()

    return success(res,"Dashboard siswa berhasil didapatkan",data)

  }catch(err){

    return error(res,err.message)

  }

}

module.exports = {
  dashboardSiswa
}