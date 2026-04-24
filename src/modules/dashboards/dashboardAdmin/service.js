const db = require("../../../db/models")

const getDashboardAdmin = async () => {

  const users = await db.User.findAll({
    attributes: ["id","name","email","role","isActive"]
  })

  const guru = await db.User.findAll({
    where: { role: "guru" },
    attributes: ["id","name","email"]
  })

  const siswa = await db.User.findAll({
    where: { role: "siswa" },
    attributes: ["id","name","email"],
    include: [
      {
        model: db.Siswa,
        include: [
          {
            model: db.Kelas
          }
        ]
      }
    ]
  })

  const kelas = await db.Kelas.findAll()

  const mapel = await db.Mapel.findAll({
    include:[
      {
        model: db.User,
        as:"guru",
        attributes:["id","name"]
      }
    ]
  })

  return {
    total_users: users.length,
    total_guru: guru.length,
    total_siswa: siswa.length,
    total_kelas: kelas.length,
    total_mapel: mapel.length,
    users,
    guru,
    siswa
  }
}

module.exports = {
  getDashboardAdmin
}