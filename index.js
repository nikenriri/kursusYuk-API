const express = require('express')
const app = express()
const { User, Token } = require('./app/models')
const bcrypt = require('bcrypt')
const randomString = require('randomstring')
const port = process.env.APP_PORT || 8080
const router = require('./app/router')

app.use(express.json())

const tokenAuth = async (req, res, next) => {
  const authorizationToken = req.headers['authorization']
  if (!authorizationToken) {
    res.status(401).send({ error: 'No token provided' })
    return
  }
  const userToken = await Token.findOne({ where: { token: authorizationToken } })
  if (!userToken) {
    res.status(401).send({ error: 'Invalid token' })
    return
  }
  const user = await User.findByPk(userToken.userId)
  req.user = user.toJSON()

  next()
}

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (existingUser) {
      res.status(422).send({ error: 'User already exists' });
      return;
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({
    where: { email: email.toLowerCase() }
  })

  console.log('Login attempt:', { email, password });

  if (!user) {
    res.status(422).send({ error: 'Invalid credentials' })
    return
  }

  const validPassword = await bcrypt.compare(password, user.password)
  console.log('Password comparison result:', validPassword);
  if (!validPassword) {
    console.log('Invalid password');
    res.status(422).send({ error: 'Invalid credentials', details: { email, password } })
    return
  }

  const token = randomString.generate()
  await Token.create({ userId: user.id, token: token })
  res.json({ token: token })
})

app.get('/protected', tokenAuth, async (req, res) => {
  res.json({
    message: 'This is a protected route'
  })
})

app.use('/api', router);
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

module.exports = app;