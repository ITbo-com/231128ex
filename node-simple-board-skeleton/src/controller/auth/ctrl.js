const {UserDAO}=require("../../DAO")
const {generatePassword,verifyPassword} = require("../../lib/authentication")

const signInform = async (req, res, next) => {
    try {
        const {user} = req.session;
        if (user ==undefined) {
            return res.render("auth/sign-in.pug", {user});
        }else {
            return res.redirect("/")
        }
    } catch (err) {
        return next(err);
    }
};
    

const signIn = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        if(!username || !password){
            throw new Error("Bad_Requset");
        }
        const user = UserDAO.getByUsername(username);
        if(!user) {
            throw new Error("UNAUTHORIZED")
        };
        const isTure= await verifyPassword(password, user.password);
        if(!isTrue) {
            throw new Error("UNAUTHORIZED");
        }

        req.session.user={
            id:user.id,
            username:username,
            displayname:user.displayname,
            isActive:user.isActive,
            isStaff:user.isStaff,
        };

        return res.redirect("/");

    } catch (err) {
        return next(err);
    }
};
    

const signUpForm = async(req, res, next)=>{
    try{
        const {user}=req.session;
        return res.render("auth/sign-up.pug", {user});

    }catch(err){
        return next(err);
    }
}


const signUp = async(req, res, next)=>{
    try{
        const {username, password, displayname} =req.body;
        if(!username||!password||!displayname) {
            throw new Error("BAD_REQUEST");
        }
        if(username.length > 16 || displayname > 32) {
            throw new Error("BAD_REQUEST");
        }

        const hashedPW = await generatePassword(password);
        await UserDAO.create(username, hashedPW, displayname);
        return res.redirect("/auth/sign_in")
    }catch(err){
        return next(err);
    }
}


const signOut = async(req, res, next)=>{
    try{
        req.session.destroy((err) =>{
            if (err) throw err;
            else returnres.redirect("/");
        });

    }catch(err){
        return next(err);
    }
};

module.exports = {
    signInform,
    signIn,
    signUpForm,
    signUp,
    signOut,
};