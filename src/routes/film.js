const express = require ('express')
const filmController = require("../controller/film")

const router = express.Router()

router.use((req,res,next)=>{
    console.log("Accesing route /films");
    next();
})

router.get('/', filmController.retrieveAllFilm);

router.get("/:id", filmController.retrieveById)

router.post('/', filmController.createFilm);

router.put('/:id', filmController.updateFilm);

router.delete('/:id', filmController.deleteFilm);

module.exports = router;