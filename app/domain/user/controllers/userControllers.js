const express = require('express')
const app = express()
const { User, Token } = require('../../../models')
const bcrypt = require('bcrypt')
const randomString = require('randomstring')

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

const userRegister = async (req, res) => {
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
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });

    res.json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const userLogin = async (req, res) => {
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
};

const userEditProfile = async (req, res) => {
    const{ token: tokenAuth, name, email } = req.body;

    if(!tokenAuth){
        res.status(401).send({error: 'Unauthorized'})
        return;
    }

    //find the user from the token
    const tokenRecord = await Token.findOne({
        where:{ token: tokenAuth },
        include : [{ model: User, as: 'user'}]
    });


    if(!tokenRecord || !tokenRecord.user){
        res.status(401).send({ error: 'Unauthorized' });
        return;
    }

    const user = tokenRecord.user;

    //update the user profle
    try{
        const [rowsUpdated] = await User.update(
            { name, email },
            { where: { id: user.id } }
        );

        if(rowsUpdated > 0){
            res.json({ message: 'Profile successfully updated'})
        }else{
            res.json({ message: 'No changes made to the profile'})
        }
    }catch(error){
        console.error('Error to updating profile:', error);
        res.status(500).send({ error: 'Internal server error' } )
    }
}

const deleteAccount = async (req, res) => {
    const { token: tokenAuth } = req.body;

    if(!tokenAuth){
        res.status(401).send({error: 'Unauthorized'});
        return;
    }

    const tokenRecord = await Token.findOne({
        where:{ token: tokenAuth },
        include: [{ model: User, as: 'user'}]
    });

    if(!tokenRecord || !tokenRecord.user){
        res.status(401).send({ error: 'Unauthorizzed' });
        return;
    }

    const user = tokenRecord.user;
    try{
        await User.destroy({
            where: { id: user.id }
        });

        res.json({ message: 'Account seccessfully deleted' });
    }catch(error){
        console.error('Error deleting account:', error);
        res.status(500).send({ error: 'Internal server error'})
    }
}

const userLogout = async (req, res) => {
    const { token: tokenAuth } = req.body;

    if(!tokenAuth){
        res.status(401).send({error: 'Unauthorized'});
        return;
    }

    try{
        await Token.destroy({
            where: { token: tokenAuth}
        })

        res.json({message: 'Logout successful'})
    }catch(error){
        console.error('Error during logout:', error)
        res.status(500).send({message: 'Internal server error'})
    }
}

// app.get('/protected', tokenAuth, async (req, res) => {
//   res.json({
//     message: 'This is a protected route'
//   })
// })

module.exports = {
    userRegister,
    userLogin,
    userEditProfile,
    deleteAccount,
    userLogout,
}