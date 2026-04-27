require("dotenv").config()

const express = require("express")
const app = express()

const sequelize = require("./config/koneksi.js")
const cors = require("cors")

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/*
MIDDLEWARE
*/
app.use(express.json())

/*
IMPORT ROUTES
*/
const adminRoutes = require("./modules/admin/routes.js")
const guruRoutes = require("./modules/guru/routes.js");
const siswaRoutes = require("./modules/siswa/routes.js");
const dashboardAdminRoutes = require("./modules/dashboards/dashboardAdmin/routes.js");
const dashboardGuruRoutes = require("./modules/dashboards/dashboardGuru/routes.js");
const dashboardSiswaRoutes = require("./modules/dashboards/dashboardSiswa/routes.js");
const mapelRoutes = require("./modules/mapel/routes.js");
const absensiRoutes = require("./modules/absensi/routes.js");
const jadwalRoutes = require("./modules/jadwal/routes.js");
const nilaiRoutes = require("./modules/nilai/routes.js");
const pengumumanRoutes = require("./modules/pengumuman/routes.js");
const kelasRoutes = require("./modules/kelas/routes.js");
const tugasRoutes = require("./modules/tugas/routes.js")
const authRoutes = require("./modules/auth/routes.js")


/*
ROUTES
*/
app.use("/api/admin", adminRoutes)
app.use("/api/guru", guruRoutes)
app.use("/api/siswa", siswaRoutes)
app.use("/api/dashboard/admin", dashboardAdminRoutes)
app.use("/api/dashboard/guru", dashboardGuruRoutes)
app.use("/api/dashboard/siswa", dashboardSiswaRoutes)
app.use("/api/mapel", mapelRoutes);
app.use("/api/absensi", absensiRoutes);
app.use("/api/jadwal", jadwalRoutes);
app.use("/api/nilai", nilaiRoutes);
app.use("/api/pengumuman", pengumumanRoutes);
app.use("/api/kelas", kelasRoutes);
app.use("/api/tugas", tugasRoutes)
app.use("/login", authRoutes)
/*
TEST ROUTE
*/
app.get("/", (req,res)=>{
  res.send("API SEKOLAH RUNNING")
})

async function startServer(){

  try{

    await sequelize.authenticate()

    console.log("Database connected")

    const PORT = process.env.PORT || 3000

    app.listen(PORT,()=>{
      console.log(`Server running on port ${PORT}`)
    })

  }catch(err){

    console.log("Database connection failed:", err)

  }

}

startServer()