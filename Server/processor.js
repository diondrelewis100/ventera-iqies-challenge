const convertor = require('./convertors'); 
const inputData = require('./questionarie.json');

//calculating round off values
function round(value, precision) {
    const isNegative = value < 0;
    if (isNegative)
        value *= -1;
    var multiplier = Math.pow(10, precision || 0);
    return (Math.round(value * multiplier) / multiplier) * (isNegative ? -1 : 1);
}

module.exports =function (answers)  {

    //storing user input in separate variable
    const studentInput = answers[0];
    const inputUnit = answers[1];
    const targetUnit = answers[2];
    const studentResponse = answers[3];

    //checking first if input value is valid or not
    if (!isNaN(studentInput)) {
        //checking first if student response value is valid or not
        if (!isNaN(studentResponse)) {

            // check invalid case (checking if source unit can be converted to target unit or not)
            // all covertible units are stored under same array (refer to: "compatibleUnits" in questionarie.json)
            // if both input and target unit belongs to same array then its convertible else not.
            const compatibleUnits = inputData.compatibleUnits
                .filter(_compatibleUnits => _compatibleUnits.indexOf(inputUnit) !== -1 && _compatibleUnits.indexOf(targetUnit) !== -1);
            const compatibleConversion = compatibleUnits && compatibleUnits.length ? true : false;
            // if source and target units are convertible then comparing  student response with converted value 
            if (compatibleConversion) {
                //converting input value to target unit value
                const convertedVal = convertor(inputUnit, targetUnit, studentInput);
                //rounding of calculated value to its tenth place
                const rounOfanswer = round(convertedVal,1);
                //rounding of student response value
                const rounOfresponse = round(parseFloat(studentResponse),1);

                //comparision of round off values
                if (rounOfanswer === rounOfresponse) {
                    console.log("output: correct");
                    return 'correct';
                } else {
                    console.log("output: incorrect");
                    return 'incorrect';
                }
            } else {
                console.log('output: invalid');
                return 'invalid';
            }

        } else {
            console.log("output: incorrect");
            return 'incorrect';
        }
    } else {
        console.log("output: invalid outer");
        return 'invalid';
    }
}