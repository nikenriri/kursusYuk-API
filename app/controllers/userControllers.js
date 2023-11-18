const express = require('express')
const app = express()
const { User, Token, Role } = require('../models')
const bcrypt = require('bcrypt')
const Roles = require('../constants/role')
const randomString = require('randomstring')

app.use(express.json())

//const tokenAuth = async (req, res, next) => {
//   const authorizationToken = req.headers['authorization']
//   if (!authorizationToken) {
//     res.status(401).send({ error: 'No token provided' })
//     return
//   }
//   const userToken = await Token.findOne({ where: { token: authorizationToken } })
//   if (!userToken) {
//     res.status(401).send({ error: 'Invalid token' })
//     return
//   }
//   const user = await User.findByPk(userToken.userId)
//   req.user = user.toJSON()

//   next()
// }
const userLogin = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = Buffer.from(`${randomString.generate()}:${randomString.generate()}`).toString(
    'base64'
  )
  await Token.create({ token, userId: user.id })

  res.json({ token })

};

const userRegister = async (req, res) => {
  const { name, email, password } = req.body

  const role = await Role.findOne({ where: { name: Roles.CUSTOMER } })

  try {
    await User.create({
      name,
      email,
      password,
      roleId: role.id
    })

    res.json({ message: 'Registration success' })
  } catch (error) {
    res.status(422).json(error)
  }

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