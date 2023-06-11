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
            'SELECT * FROM Bengkels;',
            (err, result) => {
                  if (err) {
                        throw err;
                        return res.status(500).send({
                              message: 'Internal Server Error'
                        });
                  }
                  if (!result.length) {
                        return res.status(404).send({
                              message: 'No bengkels found'
                        });
                  }
                  const bengkelsData = result;
                  return res.status(200).send({
                        message: 'Success',
                        data: bengkelsData
                  });
            }
      );
});

router.get('/bengkels/:id', (req, res, next) => {
      const bengkelId = req.params.id;

      // Query untuk mendapatkan detail bengkel
      db.query(
            'SELECT * FROM Bengkels WHERE id = ?',
            [bengkelId],
            (err, result) => {
                  if (err) {
                        throw err;
                        return res.status(500).send({
                              message: 'Internal Server Error'
                        });
                  }

                  // Jika bengkel tidak ditemukan
                  if (!result.length) {
                        return res.status(404).send({
                              message: 'Bengkel not found'
                        });
                  }

                  const bengkelData = result[0];

                  // Query untuk mendapatkan daftar jasa yang terkait dengan bengkel
                  db.query(
                        'SELECT * FROM Jasas WHERE idBengkel = ?',
                        [bengkelId],
                        (err, result) => {
                              if (err) {
                                    throw err;
                                    return res.status(500).send({
                                          message: 'Internal Server Error'
                                    });
                              }

                              // Jika tidak ada jasa yang terkait dengan bengkel
                              if (!result.length) {
                                    return res.status(404).send({
                                          message: 'No jasas found for this bengkel'
                                    });
                              }

                              const jasasData = result;

                              // Menggabungkan data bengkel dengan data jasas
                              const responseData = {
                                    bengkel: bengkelData,
                                    jasas: jasasData
                              };

                              return res.status(200).send({
                                    message: 'Success',
                                    data: responseData
                              });
                        }
                  );
            }
      );
});


module.exports = router;
