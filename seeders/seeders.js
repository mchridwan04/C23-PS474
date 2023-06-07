'use strict';

module.exports = {
      up: async (queryInterface, Sequelize) => {
            // Seed Users table
            await queryInterface.bulkInsert('Users', [
                  {
                        password: 'password1',
                        username: 'user1',
                        email: 'user1@example.com',
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  {
                        password: 'password2',
                        username: 'user2',
                        email: 'user2@example.com',
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  // Add more user seed data if needed
            ]);

            // Seed Bengkels table
            await queryInterface.bulkInsert('Bengkels', [
                  {
                        nama: 'Bengkel 1',
                        longitude: 123.456,
                        latitude: 78.910,
                        totalNilaiJumlahReview: 4.5,
                        hariBuka: 'Monday',
                        jamBuka: '08:00 AM',
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  {
                        nama: 'Bengkel 2',
                        longitude: 12.345,
                        latitude: 67.890,
                        totalNilaiJumlahReview: 3.8,
                        hariBuka: 'Tuesday',
                        jamBuka: '09:00 AM',
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  {
                        nama: 'Bengkel 3',
                        longitude: 12.345,
                        latitude: 67.890,
                        totalNilaiJumlahReview: 3.8,
                        hariBuka: 'Tuesday',
                        jamBuka: '09:00 AM',
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  {
                        nama: 'Bengkel 4',
                        longitude: 12.345,
                        latitude: 67.890,
                        totalNilaiJumlahReview: 3.8,
                        hariBuka: 'Tuesday',
                        jamBuka: '09:00 AM',
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  {
                        nama: 'Bengkel 5',
                        longitude: 12.345,
                        latitude: 67.890,
                        totalNilaiJumlahReview: 3.8,
                        hariBuka: 'Tuesday',
                        jamBuka: '09:00 AM',
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  {
                        nama: 'Bengkel 6',
                        longitude: 12.345,
                        latitude: 67.890,
                        totalNilaiJumlahReview: 3.8,
                        hariBuka: 'Tuesday',
                        jamBuka: '09:00 AM',
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  {
                        nama: 'Bengkel 7',
                        longitude: 12.345,
                        latitude: 67.890,
                        totalNilaiJumlahReview: 3.8,
                        hariBuka: 'Tuesday',
                        jamBuka: '09:00 AM',
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  {
                        nama: 'Bengkel 8',
                        longitude: 12.345,
                        latitude: 67.890,
                        totalNilaiJumlahReview: 3.8,
                        hariBuka: 'Tuesday',
                        jamBuka: '09:00 AM',
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  {
                        nama: 'Bengkel 9',
                        longitude: 12.345,
                        latitude: 67.890,
                        totalNilaiJumlahReview: 3.8,
                        hariBuka: 'Tuesday',
                        jamBuka: '09:00 AM',
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  {
                        nama: 'Bengkel 10',
                        longitude: 12.345,
                        latitude: 67.890,
                        totalNilaiJumlahReview: 3.8,
                        hariBuka: 'Tuesday',
                        jamBuka: '09:00 AM',
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  // Add more bengkel seed data if needed
            ]);

            // Seed Jasas table
            await queryInterface.bulkInsert('Jasas', [
                  {
                        idBengkel: 1,
                        nama: 'Jasa 1',
                        keterangan: 'Keterangan jasa 1',
                        harga: 50.0,
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  {
                        idBengkel: 1,
                        nama: 'Jasa 2',
                        keterangan: 'Keterangan jasa 2',
                        harga: 70.0,
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  // Add more jasa seed data if needed
            ]);

            // Seed Reviews table
            await queryInterface.bulkInsert('Reviews', [
                  {
                        idBengkel: 1,
                        isiReview: 'Review 1',
                        namaUser: 'User 1',
                        rating: 4.5,
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  {
                        idBengkel: 1,
                        isiReview: 'Review 2',
                        namaUser: 'User 2',
                        rating: 3.8,
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  // Add more review seed data if needed
            ]);

            // Seed Transaksis table
            await queryInterface.bulkInsert('Transaksis', [
                  {
                        idBengkel: 1,
                        idUser: 1,
                        idJasa: 1,
                        totalBiaya: 50.0,
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  {
                        idBengkel: 1,
                        idUser: 2,
                        idJasa: 2,
                        totalBiaya: 70.0,
                        createdAt: new Date(),
                        updatedAt: new Date()
                  },
                  // Add more transaksi seed data if needed
            ]);
      },

      down: async (queryInterface, Sequelize) => {
            // Truncate all tables to remove seeded data
            await queryInterface.bulkDelete('Transaksis', null, {});
            await queryInterface.bulkDelete('Reviews', null, {});
            await queryInterface.bulkDelete('Jasas', null, {});
            await queryInterface.bulkDelete('Bengkels', null, {});
            await queryInterface.bulkDelete('Users', null, {});
      }
};
