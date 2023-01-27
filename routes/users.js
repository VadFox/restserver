
const { Router} = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/users');

const router = Router();

    router.get('/', usersGet );

    router.put('/:id', usersPut);

    router.post('/',
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria y tener 6 letras').not().isEmpty().isLength({min: 6}),
        check('email', 'El Correo no es valido').isEmail(),
        // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        validateFields
    , usersPost);

    router.delete('/', usersDelete);


module.exports = router;