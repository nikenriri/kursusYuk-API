const express = require('express')
const app = express()
const { User, Token, Role } = require('../models')
const bcrypt = require('bcrypt')
const Roles = require('../constants/role')
const randomString = require('randomstring')

app.use(express.json())

const userLogin = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne(
    { where: { email: email.toLowerCase() } })

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
    //check if the user already exists
    const existingUser = await User.findOne({
        where: {email: email},
    });

    if(existingUser){
        res.status(422).send({error: 'User already exists'});
        return;
    }

    //Create a new user
    const newUser = await User.create({
        name,
        email,
        password,
        roleId: role.id
    })
    res.json({ message: 'User registered successfully', userId: newUser.id })
  } catch (error) {
    console.error(error);
    res.status(500).send({error: 'Internal server error'})
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
    const authorizationToken = req.headers['authorization'];

    if (!authorizationToken) {
        res.status(401).send({ error: 'Unauthorized' });
        return;
    }

    try {
        const tokenRecord = await Token.findOne({
            where: { token: authorizationToken },
            include: [{ model: User, as: 'user' }]
        });

        if (!tokenRecord || !tokenRecord.user) {
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }

        const user = tokenRecord.user;

        //menghapus token terkait pengguna
        await Token.destroy({
            where: { userId: user.id }
        });
        //menghapus pengguna setelah token terkait dihapus
        await User.destroy({
            where: { id: user.id }
        })

        res.json({ message: 'Account successfully deleted' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

const userLogout = async (req, res) => {
    const authorizationToken = req.headers['authorization'];

    if(!authorizationToken){
        res.status(401).send({error: 'Unauthorized'});
        return;
    }

    try{
        await Token.destroy({
            where: { token: authorizationToken}
        })

        res.json({message: 'Logout successful'})
    }catch(error){
        console.error('Error during logout:', error)
        res.status(500).send({message: 'Internal server error'})
    }
}

module.exports = {
  userRegister,
  userLogin,
  userEditProfile,
  deleteAccount,
  userLogout,
}