const calculate = require('./processor');
const bodyParser = require('body-parser');
var express = require("express");
var app = express();
const cors = require("cors");
const path = require("path");
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));
// configure the get end point
app.get("/validateInput", (req, res, next) => {

    const studentInput = req.query.studentInput;
    const inputUnit = req.query.inputUnit;
    const targetUnit = req.query.targetUnit;
    const studentResponse = req.query.studentResponse;

    if (!studentInput) {
        return res.status(400).json({
            success: false,
            error: 'student input is required'
        });
    } else if (!inputUnit) {
        return res.status(400).json({
            success: false,
            error: 'input unit is required'
        });
    } else if (!targetUnit) {
        return res.status(400).json({
            success: false,
            error: 'target unit is required'
        });
    } else if (!studentResponse) {
        return res.status(400).json({
            success: false,
            error: 'student response is required'
        });
    } else {
        const payload = []; // 0 = studentInput, 1 = inputUnit, 2 = targetUnit, 3 = studentResponse
        payload.push(studentInput);
        payload.push(inputUnit);
        payload.push(targetUnit);
        payload.push(studentResponse)
        const answer = calculate(payload);
        return res.status(200).json({
            success: true,
            result: answer
        });
    }
});
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/static/index.html'));
});

// start express server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
