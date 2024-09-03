const User = require('../Models/User')


exports.SignUp = async (req, res) => {

    const {firstName, lastName,email,password, country, city} = req.body

    const checkingEmail = await User.findOne({email})

    if(checkingEmail) {
        return res.status(400).json({ message: "Email already exists" });
    }
    try {
        NewUser = new User({
            firstName, lastName,email,password,country, city
        })
        await NewUser.save()
        res.status(200).json({ message: "Registred successfuly"});
    } catch (error) {
        res.status(500).json(error);
    }
}