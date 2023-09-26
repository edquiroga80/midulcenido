import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,        
    },
    {
        name: 'Natalia Quiroga',
        email: 'natalia@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,        
    },
    {
        name: 'Federico Quiroga',
        email: 'federico@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,        
    },
];

export default users;