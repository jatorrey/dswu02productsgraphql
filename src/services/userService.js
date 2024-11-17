const User = require('../models/userModel');
const facturapi = require('../apis/facturapi/user');

const userService = {
    getUsers: async () => await User.find(),
    createUser: async (args) => {
        const user = new User(args);
        const facturapiuser = await facturapi.createUser(user);
        user.facturapiid = facturapiuser.id;
        return await user.save();
    },
    updateUser: async ({ _id, ...rest }) => {
        const user = await User.findByIdAndUpdate(_id, rest, { new: true });
        facturapi.updateUser(user.facturapiid, user);
        return user;
    },

    deleteProduct: async (_id) => {
        const user = await User.findByIdAndDelete(_id);
        facturapi.deleteUser(user.facturapiid);
        return user;
    }
};

module.exports = userService;