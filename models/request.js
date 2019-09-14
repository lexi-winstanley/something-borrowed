module.exports = function (sequelize, DataTypes) {
    let Request = sequelize.define('Request', {
        owner: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }, 
        requester: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }, 
        item: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        itemName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        exchange1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        exchange2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        exchange3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        denied: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    // Group.associate = function (models) {
    //     Group.belongsToMany(models.User, { through: 'UserGroup' });
    // };
    return Request;
};
