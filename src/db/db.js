const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tomatopawsinitial', 'username', 'password', {
    host: 'tomatopaws.cnmmsigu82g0.us-east-2.rds.amazonaws.com',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;