var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10);

var UserSchema = new Schema({
    email: String,
    hashedPass: String,
    created: {type: Date, default: Date.now}
});

UserSchema.virtual('password').set(function(passwd){
    this.hashedPass = this.makeHash(passwd);
});

UserSchema.methods = {
    authenticate: function(passwd, user){
        return bcrypt.compareSync(passwd, user.hashedPass);
    },
    
    makeHash: function(passwd){
        if (!passwd){
            return false;
        }
        return bcrypt.hashSync(passwd, salt);
    }
};

mongoose.model('User', UserSchema);