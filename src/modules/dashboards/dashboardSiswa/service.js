const db = require("../../../db/models")

const getDashboardSiswa = async () => {

  const jadwal = await db.Jadwal.findAll({
    include: [
      {
        model: db.Kelas
      },
      {
        model: db.Mapel,
        include: [
          {
            model: db.User,
            as: "guru",
            attributes: ["id","name","email"]
          }
        ]
      }
    ]
  })

  const pengumuman = await db.Pengumuman.findAll({
    include: [
      {
        model: db.User,
        attributes: ["id","name"]
      }
    ],
    order: [["createdAt","DESC"]],
    limit: 5
  })

  return {
    total_jadwal: jadwal.length,
    jadwal,
    pengumuman
  }

}

module.exports = {
  getDashboardSiswa
}