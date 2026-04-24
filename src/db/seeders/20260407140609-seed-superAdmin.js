'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {

    const password = await bcrypt.hash("123456", 10);
    const now = new Date();

    const superAdmins = [
      {
        uuid: uuidv4(),
        role: "super_admin",
        name: "Rizky Pratama",
        email: "rizky.superadmin@school.id",
        password,
        phone: "081200000001",
        address: "Jakarta",
        isActive: true,
        createdAt: now,
        updatedAt: now
      },

      {
        uuid: uuidv4(),
        role: "super_admin",
        name: "Ahmad Fauzan",
        email: "fauzan.superadmin@school.id",
        password,
        phone: "081200000002",
        address: "Bandung",
        isActive: true,
        createdAt: now,
        updatedAt: now
      },

      {
        uuid: uuidv4(),
        role: "super_admin",
        name: "Budi Santoso",
        email: "budi.superadmin@school.id",
        password,
        phone: "081200000003",
        address: "Surabaya",
        isActive: true,
        createdAt: now,
        updatedAt: now
      }
    ];

    await queryInterface.bulkInsert('SuperAdmin', superAdmins);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('SuperAdmin', null, {});
  }
};