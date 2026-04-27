'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {

    const now = new Date();

    const rawAdmins = [
      {
        role: "super_admin",
        name: "Muhammad Mildan Saputra",
        email: "mildan@school.id",
        password: "Mildan123"
      },
      {
        role: "admin",
        name: "Dimas Anggoro",
        email: "dimas@school.id",
        password: "Dimas123"
      },
      {
        role: "admin",
        name: "Alfin Fathurahman",
        email: "alfin@school.id",
        password: "Alfin123"
      },
      {
        role: "admin",
        name: "Gilang Rhamadan",
        email: "gilang@school.id",
        password: "Gilang123"
      }
    ];

    const admins = [];

    for (const admin of rawAdmins) {

      const hashedPassword = await bcrypt.hash(admin.password, 10);

      admins.push({
        uuid: uuidv4(),

        role: admin.role,
        name: admin.name,
        email: admin.email.toLowerCase(),
        password: hashedPassword,

        phone: "081200000000",
        address: "Indonesia",
        avatar: null,

        lastLogin: null,
        refreshToken: null,

        status: "active",   // ✔ sesuai ENUM migration
        isActive: true,

        loginAttempt: 0,
        lockedUntil: null,

        deletedAt: null,    // ✔ penting karena paranoid model

        createdAt: now,
        updatedAt: now
      });
    }

    await queryInterface.bulkInsert('Admin', admins);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Admin', null, {});
  }
};