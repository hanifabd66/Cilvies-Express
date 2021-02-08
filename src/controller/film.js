const FilmModel = require("../model").film
const FilmModelSequelize = require("../model").Sequelize;
const Op = FilmModelSequelize.Op

module.exports = {
    retrieveAllFilm: async (req, res) => {
        console.log(req.query, "this req");
        try {
            const title = req.query.title
            const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
            console.log(condition, "this condisi");
            let where;
            if (condition) {
                where = condition
            } else {
                where = null
            }
            console.log(where, "this dimana");
            const allFilm = await FilmModel.findAll({ where: where });
            res.json(allFilm);
        } catch (error) {
            res.sendStatus(500);
        }
    },
    retrieveById: async (req, res) => {
        const id = parseInt(req.params.id)
        const selectedFilm = await FilmModel.findByPk(id);
        if (!selectedFilm) {
            res.status(404).send(`Film with id ${id}`)
        } else {
            res.json(selectedFilm);
        }
    },
    createFilm: async (req, res) => {
        const newFilm = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            status: req.body.status,
        };
        await FilmModel.create(newFilm);
        res.sendStatus(201); // created
    },
    updateFilm: async (req, res) => {
        const payload = req.body;
        const id = parseInt(req.params.id);
        await FilmModel.update(payload, { where: { id: id } });
        res.json({ id, ...payload });
    },
    deleteFilm: async (req, res) => {
        const id = req.params.id;

        await FilmModel.destroy({ where: { id: id } });
        res.sendStatus(204)
    }
}