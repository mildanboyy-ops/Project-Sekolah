'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {

    const password = await bcrypt.hash("123456", 10);
    const now = new Date();

    const admins = [
      {
        uuid: uuidv4(),
        role: "super_admin",
        name: "Super Admin Utama",
        email: "superadmin.main@school.id",
        password,
        phone: "081234567890",
        address: "Jakarta",
        isActive: true,
        createdAt: now,
        updatedAt: now
      },

      {
        uuid: uuidv4(),
        role: "admin",
        name: "Ahmad Fauzan",
        email: "ahmad.admin@school.id",
        password,
        phone: "081200000001",
        address: "Bandung",
        isActive: true,
        createdAt: now,
        updatedAt: now
      },

      {
        uuid: uuidv4(),
        role: "admin",
        name: "Budi Santoso",
        email: "budi.admin@school.id",
        password,
        phone: "081200000002",
        address: "Surabaya",
        isActive: true,
        createdAt: now,
        updatedAt: now
      },

      {
        uuid: uuidv4(),
        role: "admin",
        name: "Rizky Ramadhan",
        email: "rizky.admin@school.id",
        password,
        phone: "081200000003",
        address: "Yogyakarta",
        isActive: true,
        createdAt: now,
        updatedAt: now
      }
    ];

    await queryInterface.bulkInsert('Admin', admins);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Admin', null, {});
  }
};