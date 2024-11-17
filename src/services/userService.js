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
        const user = await User.findById(_id);
        if (!user) throw new Error('User not found');

        if (user.facturapiid){
            await facturapi.updateUser(user.facturapiid, {
                legal_name: rest.name || user.name,
                tax_id: rest.rfc || user.rfc,
                email: rest.email || user.email,
                email: rest.email || user.email,
                address: {
                    zip: rest.zip || user.zip
                }
            });
        }

        return await User.findByIdAndUpdate(_id, rest, { new: true });
    },

    deleteProduct: async (_id) => {
        const user = await User.findById(_id);
        if (!user) throw new Error('User not found');
        if (user.facturapiid){ await facturapi.deleteUser(user.facturapiid); }
        return await User.findByIdAndDelete(_id);
    }
};

module.exports = userService;