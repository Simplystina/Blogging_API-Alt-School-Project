const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const UserModel = new Schema(
    {
        id: ObjectId,
        email: {type:String, unique: true, required:true},
        firstName: {type:String},
        lastName: {type:String},
        password: {type:String, required: true},
       

   },
   {
     timestamps: true, toJSON: { virtuals: true }
    }
)

UserModel.virtual('blogs', {
    ref: 'blog',
    localField: '_id',
    foreignField: 'userId'
  });
  

UserModel.pre(
    'save',
    async function(next){
        const user = this;
        const hash = await bcrypt.hash(this.password, 10)

        this.password = hash
        next()
    }
)


UserModel.methods.isValidPassword = async function(password){
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    return compare
}

const User = mongoose.model('users', UserModel)

module.exports = User