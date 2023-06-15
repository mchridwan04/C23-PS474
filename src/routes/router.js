const express = require('express');
const router = express.Router();
const db = require('../configs/dbConnection');
const { signupValidation, loginValidation } = require('../controllers/validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post('/register', signupValidation, (req, res, next) => {
      db.query(
            `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
                  req.body.email
            )});`,
            (err, result) => {
                  if (result.length) {
                        return res.status(409).send({
                              message: 'This user is already in use!'
                        });
                  } else {
                        // username is available
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                              if (err) {
                                    return res.status(500).send({
                                          message: err
                                    });
                              } else {
                                    db.query(
                                          `INSERT INTO users (username, email, password) VALUES ('${req.body.username}', ${db.escape(
                                                req.body.email
                                          )}, ${db.escape(hash)})`,
                                          (err, result) => {
                                                if (err) {
                                                      throw err;
                                                      return res.status(400).send({
                                                            message: err
                                                      });
                                                }
                                                return res.status(201).send({
                                                      message: 'Register success'
                                                });
                                          }
                                    );
                              }
                        });
                  }
            }
      );
});
router.post('/login', loginValidation, (req, res, next) => {
      db.query(
            `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
            (err, result) => {
                  // user does not exists
                  if (err) {
                        throw err;
                        return res.status(400).send({
                              msg: err
                        });
                  }
                  if (!result.length) {
                        return res.status(401).send({
                              message: 'Email or password is incorrect!'
                        });
                  }
                  // check password
                  bcrypt.compare(
                        req.body.password,
                        result[0]['password'],
                        (bErr, bResult) => {
                              // wrong password
                              if (bErr) {
                                    throw bErr;
                                    return res.status(401).send({
                                          msg: 'Email or password is incorrect!'
                                    });
                              }
                              if (bResult) {
                                    const token = jwt.sign({ id: result[0].id }, 'the-super-strong-secrect', { expiresIn: '1h' });
                                    // db.query(
                                    //       `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                                    // );
                                    return res.status(200).send({
                                          message: 'Login Succes!',
                                          token,
                                          data: result[0]
                                    });
                              }
                              return res.status(401).send({
                                    message: 'Email or password is incorrect!'
                              });
                        }
                  );
            }
      );
});
router.get('/user', signupValidation, (req, res, next) => {
      if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
      ) {
            return res.status(422).json({
                  message: "Please provide the token",
            });
      }
      const theToken = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
      db.query('SELECT * FROM users where id=?', decoded.id, function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results[0], message: 'Succes' });
      });
});

router.get('/bengkels', (req, res, next) => {
      db.query(
            'SELECT * FROM bengkels;',
            (err, bengkelsResult) => {
                  if (err) {
                        throw err;
                        return res.status(500).send({
                              message: 'Internal Server Error'
                        });
                  }
                  if (!bengkelsResult.length) {
                        return res.status(404).send({
                              message: 'No bengkels found'
                        });
                  }

                  const bengkelsData = bengkelsResult;

                  // Membuat array kosong untuk menyimpan data bengkel dengan review
                  const bengkelsWithReviews = [];

                  // Iterasi setiap bengkel
                  for (let i = 0; i < bengkelsData.length; i++) {
                        const bengkelData = bengkelsData[i];

                        // Query untuk mendapatkan review bengkel
                        const reviewsQuery = 'SELECT * FROM reviews WHERE idBengkel = ?';
                        db.query(reviewsQuery, [bengkelData.id], (err, reviewsResult) => {
                              if (err) {
                                    throw err;
                              }

                              // Menggabungkan data bengkel dengan data review
                              const bengkelWithReviews = {
                                    ...bengkelData,
                                    reviews: reviewsResult
                              };

                              // Memasukkan data bengkel dengan review ke dalam array
                              bengkelsWithReviews.push(bengkelWithReviews);

                              // Jika sudah mencapai bengkel terakhir, mengirimkan tanggapan
                              if (i === bengkelsData.length - 1) {
                                    return res.status(200).send({
                                          message: 'Success',
                                          data: bengkelsWithReviews
                                    });
                              }
                        });
                  }
            }
      );
});


router.get('/bengkels/:id', (req, res, next) => {
      const bengkelId = req.params.id;

      // Query untuk mendapatkan detail bengkel
      const bengkelQuery = 'SELECT * FROM bengkels WHERE id = ?';
      db.query(bengkelQuery, [bengkelId], (err, bengkelResult) => {
            if (err) {
                  throw err;
                  return res.status(500).send({
                        message: 'Internal Server Error'
                  });
            }

            // Jika bengkel tidak ditemukan
            if (!bengkelResult.length) {
                  return res.status(404).send({
                        message: 'Bengkel not found'
                  });
            }

            const bengkelData = bengkelResult[0];

            // Query untuk mendapatkan daftar jasa yang terkait dengan bengkel
            const jasasQuery = 'SELECT * FROM jasas WHERE idBengkel = ?';
            db.query(jasasQuery, [bengkelId], (err, jasasResult) => {
                  if (err) {
                        throw err;
                        return res.status(500).send({
                              message: 'Internal Server Error'
                        });
                  }

                  // Jika tidak ada jasa yang terkait dengan bengkel
                  if (!jasasResult.length) {
                        return res.status(404).send({
                              message: 'No jasas found for this bengkel'
                        });
                  }

                  const jasasData = jasasResult;

                  // Query untuk mendapatkan review bengkel
                  const reviewsQuery = 'SELECT * FROM reviews WHERE idBengkel = ?';
                  db.query(reviewsQuery, [bengkelId], (err, reviewsResult) => {
                        if (err) {
                              throw err;
                              return res.status(500).send({
                                    message: 'Internal Server Error'
                              });
                        }

                        const reviewsData = reviewsResult;

                        // Menggabungkan data bengkel, jasa, dan review
                        const responseData = {
                              bengkel: bengkelData,
                              jasas: jasasData,
                              reviews: reviewsData
                        };

                        return res.status(200).send({
                              message: 'Success',
                              data: responseData
                        });
                  });
            });
      });
});

router.post('/transaksis', (req, res, next) => {
      const { idUser, jasaIds } = req.body;

      // Memeriksa apakah pengguna yang dimaksud ada dalam database
      const userQuery = 'SELECT * FROM users WHERE id = ?';
      db.query(userQuery, [idUser], (err, userResult) => {
            if (err) {
                  throw err;
                  return res.status(500).send({
                        message: 'Internal Server Error'
                  });
            }

            // Jika pengguna tidak ditemukan
            if (!userResult.length) {
                  return res.status(404).send({
                        message: 'User not found'
                  });
            }

            // Memeriksa apakah jasa-jasa yang dimaksud ada dalam database
            const jasasQuery = 'SELECT * FROM jasas WHERE id IN (?)';
            db.query(jasasQuery, [jasaIds], (err, jasasResult) => {
                  if (err) {
                        throw err;
                        return res.status(500).send({
                              message: 'Internal Server Error'
                        });
                  }

                  // Memeriksa apakah jumlah jasa yang ditemukan sama dengan jumlah jasa yang diminta
                  if (jasasResult.length !== jasaIds.length) {
                        return res.status(404).send({
                              message: 'One or more jasas not found'
                        });
                  }

                  // Menghitung total biaya transaksi
                  const totalBiaya = jasasResult.reduce((total, jasa) => total + jasa.biaya, 0);

                  // Membuat data transaksi baru dalam database
                  const createTransaksiQuery = 'INSERT INTO transaksis (idBengkel, idUser, idJasa, totalBiaya, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)';

                  const currentTime = new Date();
                  const values = jasasResult.map(jasa => [
                        jasa.idBengkel,
                        idUser,
                        jasa.id,
                        jasa.biaya,
                        currentTime,
                        currentTime
                  ]);

                  db.query(createTransaksiQuery, [values], (err, result) => {
                        if (err) {
                              throw err;
                              return res.status(500).send({
                                    message: 'Internal Server Error'
                              });
                        }

                        return res.status(201).send({
                              message: 'Transaksi created successfully',
                              data: {
                                    id: result.insertId,
                                    idUser,
                                    jasas: jasasResult,
                                    totalBiaya
                              }
                        });
                  });
            });
      });
});



module.exports = router;
