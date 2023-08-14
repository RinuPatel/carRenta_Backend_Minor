const router = require('express').Router()

router.use('/user-register',require('./registerRouter'));

router.use('/user-login',require('./loginRouter'));

router.use('/user-logout',require("./logoutRouter"));

router.use('/car-list',require('./listOfCarRouter'));

router.use('/display-carlist',require('./displayListOfCars'));

router.use('/check-login',require('./checkUserLogin'));

router.use('/car-booking' ,require('./carBooking'));

router.use('/car-booking-status',require('./carBookingStatus'));

router.use('/user-profile',require('./userAccount'))

module.exports = router;

