'use strict';

module.exports = {
      up: async (queryInterface, Sequelize) => {
            // Create Users table
            await queryInterface.createTable('Users', {
                  id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                  },
                  username: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  email: {
                        type: Sequelize.STRING,
                        allowNull: false,
                        unique: true,
                        validate: {
                              isEmail: true,
                        },
                  },
                  createdAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                  },
                  updatedAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                  },
            });

            // Create Bengkels table
            await queryInterface.createTable('Bengkels', {
                  id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                  },
                  nama: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  longitude: {
                        type: Sequelize.FLOAT,
                        allowNull: false,
                  },
                  latitude: {
                        type: Sequelize.FLOAT,
                        allowNull: false,
                  },
                  totalNilaiJumlahReview: {
                        type: Sequelize.FLOAT,
                        allowNull: false,
                  },
                  hariBuka: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  jamBuka: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  createdAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                  },
                  updatedAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                  },
            });

            // Create Jasas table
            await queryInterface.createTable('Jasas', {
                  id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                  },
                  idBengkel: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        references: {
                              model: 'Bengkels',
                              key: 'id',
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                  },
                  nama: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  keterangan: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  harga: {
                        type: Sequelize.FLOAT,
                        allowNull: false,
                  },
                  createdAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                  },
                  updatedAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                  },
            });

            // Create Reviews table
            await queryInterface.createTable('Reviews', {
                  id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                  },
                  idBengkel: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        references: {
                              model: 'Bengkels',
                              key: 'id',
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                  },
                  isiReview: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  namaUser: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  rating: {
                        type: Sequelize.FLOAT,
                        allowNull: false,
                  },
                  createdAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                  },
                  updatedAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                  },
            });

            // Create Transaksis table
            await queryInterface.createTable('Transaksis', {
                  id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                  },
                  idBengkel: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        references: {
                              model: 'Bengkels',
                              key: 'id',
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                  },
                  idUser: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        references: {
                              model: 'Users',
                              key: 'id',
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                  },
                  idJasa: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        references: {
                              model: 'Jasas',
                              key: 'id',
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                  },
                  totalBiaya: {
                        type: Sequelize.FLOAT,
                        allowNull: false,
                  },
                  createdAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                  },
                  updatedAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                  },
            });
      },

      down: async (queryInterface, Sequelize) => {
            // Drop Transaksis table
            await queryInterface.dropTable('Transaksis');

            // Drop Reviews table
            await queryInterface.dropTable('Reviews');

            // Drop Jasas table
            await queryInterface.dropTable('Jasas');

            // Drop Bengkels table
            await queryInterface.dropTable('Bengkels');

            // Drop Users table
            await queryInterface.dropTable('Users');
      },
};
