const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');


app.use(cors());
app.use(express.json());

const unicornModel = require('./models/unicorn');


app.post('/search', async (req, res) => {
    console.log(req.body);

    if (req.body) {
        // Selection
        let selectionArgument = {}
        console.log(req.body.name);
        if (req.body.type === 'nameSearch') {
            selectionArgument = {
                name: req.body.name,
            }

        } else if (req.body.type === 'searchMinMax') {

            console.log(req.body.min);
            const minWeight = parseInt(req.body.min);
            const maxWeight = parseInt(req.body.max);
            selectionArgument = {
                weight: {
                    $gte: minWeight,
                    $lte: maxWeight
                }
            }
        } else if (req.body.type === "searchFood") {
            selectionArgument = {
                loves: {
                    $all: req.body.food
                }
            }
        }
        // Projection
        var projectionArgument = {}
        if (req.body.projectionFilters.name == false && req.body.projectionFilters.weight == false) {
            projectionArgument = {
                // "name": 0,
                // "_id": 0,
            }
        } else if (req.body.projectionFilters.name == true && req.body.projectionFilters.weight == false) {
            projectionArgument = {
                "name": 1,
                "_id": 0,
            }
        } else if (req.body.projectionFilters.name == false && req.body.projectionFilters.weight == true) {
            projectionArgument = {
                "weight": 1,
                "_id": 0,
            }
        } else {
            projectionArgument = {
                "name": 1,
                "weight": 1,
                "_id": 0,
            }
        }

        const result = await unicornModel.find(
            selectionArgument, projectionArgument
        );
        console.log("RESULT: \n" + result);
        res.json(result);

    }
});
module.exports = app;