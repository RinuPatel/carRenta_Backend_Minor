const express = require("express")
const listOfCarsModel = require("../../model/listOfCar")
const router = express.Router()
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, path.join('//home/rp/Documents/minorProject/car-rantals-backed/public/carImage'), function (error, success) {
            if (error) {
                throw error;
            }
        })
    },
  
    filename: function (req, file, cb) {
        const name = file.originalname;
        console.log("my image name ==>",file)
        cb(null, name, function (error, success) {
            if (error) throw error;
        });
    }
});
const checkFileType = function (file, cd) {
    const fileTypes = /jpeg|jpg|png|gif|svg|webp/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    console.log("my extension name ===>", extName)
    console.log("my files ===>", file)

    const mimeType = fileTypes.test(file.mimeType);
    console.log("my extension file ===>", mimeType)

    if (extName || mimeType) {
        return cd(null, true);
    } else {
        cd("Error: You can only upload images")
    }
}
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cd) => {
        checkFileType(file, cd)
    }
})

router.post("/", upload.array('image'), async (req, res) => {
    try {
        const bodyRes = req.body;
        const carName = bodyRes.carName;
        const files = req.files;
        const imageArray = files.map(file=>file.originalname)
        console.log("my req === >", files);
        if (carName) {
            const carData = new listOfCarsModel({
                carName: carName,
                schedule: bodyRes.schedule,
                exteriorColor: bodyRes.exteriorColor,
                interiorColor: bodyRes.interiorColor,
                makeYear: bodyRes.makeYear,
                registerYear: bodyRes.registerYear,
                fuelType: bodyRes.fuelType,
                trasmission: bodyRes.trasmission,
                city: bodyRes.city,
                admidName: bodyRes.admidName,
                cartype:bodyRes.cartype,
                image: imageArray,
                kmDriven:bodyRes.kmDriven,
                vahicalNo:bodyRes.vehicalNo
            })
            console.log("my cars data == >",carData.carType);
            const myCarData = await carData.save();
            res.status(200).send({ success: "true" });
        } else {
            res.status(400).send({ error: "something went wrong" });

        }
    } catch (error) {
        res.status(400).send({ error: "something went wrong" });
        console.log("my error here ===>", error);
    }

})
module.exports = router;