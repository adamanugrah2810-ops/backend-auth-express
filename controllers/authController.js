const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users SET ?";
  db.query(sql, { name, email, password: hash }, (err, result) => {
    if (err) return res.status(400).json(err);
    res.json({ message: "Register berhasil" });
  });
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (result.length === 0)
      return res.status(400).json({ message: "User tidak ditemukan" });

    const user = result[0];

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ message: "Login berhasil", token });
  });
};

// GET USER
exports.getUsers = (req, res) => {
  db.query("SELECT id,name,email FROM users", (err, result) => {
    res.json(result);
  });
};

// DELETE USER
exports.deleteUser = (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.params.id], () => {
    res.json({ message: "User dihapus" });
  });
};
