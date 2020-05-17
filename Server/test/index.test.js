const assert = require('assert');
const calculate = require('../processor');

const correctTestData = [
    {input:"1" , input_unit:"Fahrenheit" , target_unit:"Rankine" , response:"460.67"},
    {input:"1" , input_unit:"Fahrenheit" , target_unit:"Celsius" , response:"-17.22"},
    {input:"1" , input_unit:"Fahrenheit" , target_unit:"Kelvin" , response:"255.92"},

    {input:"1" , input_unit:"Rankine" , target_unit:"Fahrenheit" , response:"-458.67"},
    {input:"1" , input_unit:"Rankine" , target_unit:"Celsius" , response:"-272.59"},
    {input:"1" , input_unit:"Rankine" , target_unit:"Kelvin" , response:"0.55"},

    {input:"1" , input_unit:"Celsius" , target_unit:"Fahrenheit" , response:"33.8"},
    {input:"1" , input_unit:"Celsius" , target_unit:"Rankine" , response:"493.47"},
    {input:"1" , input_unit:"Celsius" , target_unit:"Kelvin" , response:"274.15"},

    {input:"1" , input_unit:"Kelvin" , target_unit:"Fahrenheit" , response:"-457.87"},
    {input:"1" , input_unit:"Kelvin" , target_unit:"Rankine" , response:"1.8"},
    {input:"1" , input_unit:"Kelvin" , target_unit:"Celsius" , response:"-272.15"},

    {input:"1" , input_unit:"Table spoon" , target_unit:"Cup" , response:"0.06"},
    {input:"1" , input_unit:"Table spoon" , target_unit:"Liter" , response:"0.01"},
    {input:"1" , input_unit:"Table spoon" , target_unit:"Gallon" , response:"0.01"},
    {input:"1" , input_unit:"Table spoon" , target_unit:"Cubic feet" , response:"0.00"},
    {input:"1" , input_unit:"Table spoon" , target_unit:"Cubic inch" , response:"0.90"},

    {input:"1" , input_unit:"Cup" , target_unit:"Table spoon" , response:"16.0"},
    {input:"1" , input_unit:"Cup" , target_unit:"Liter" , response:"0.24"},
    {input:"1" , input_unit:"Cup" , target_unit:"Gallon" , response:"0.06"},
    {input:"1" , input_unit:"Cup" , target_unit:"Cubic feet" , response:"0.00"},
    {input:"1" , input_unit:"Cup" , target_unit:"Cubic inch" , response:"14.43"},

    {input:"1" , input_unit:"Liter" , target_unit:"Table spoon" , response:"67.63"},
    {input:"1" , input_unit:"Liter" , target_unit:"Cup" , response:"4.23"},
    {input:"1" , input_unit:"Liter" , target_unit:"Gallon" , response:"0.26"},
    {input:"1" , input_unit:"Liter" , target_unit:"Cubic inch" , response:"61.02"},
    {input:"1" , input_unit:"Liter" , target_unit:"Cubic feet" , response:"0.03"},

    {input:"1" , input_unit:"Gallon" , target_unit:"Table spoon" , response:"256"},
    {input:"1" , input_unit:"Gallon" , target_unit:"Cup" , response:"16"},
    {input:"1" , input_unit:"Gallon" , target_unit:"Liter" , response:"3.78"},
    {input:"1" , input_unit:"Gallon" , target_unit:"Cubic inch" , response:"231.0"},
    {input:"1" , input_unit:"Gallon" , target_unit:"Cubic feet" , response:"0.13"},

    {input:"1" , input_unit:"Cubic inch" , target_unit:"Cubic feet", response:"0.00"},
  
    {input:"1" , input_unit:"Cubic feet" , target_unit:"Cubic inch" , response:"1728"},
    
];

const invalidTestData = [
    {input:"1" , input_unit:"Fahrenheit" , target_unit:"Table spoon" , response:"12.23"},
    {input:"1" , input_unit:"Fahrenheit" , target_unit:"Cubic inch" , response:"32.23"},
    {input:"1" , input_unit:"Rankine" , target_unit:"Table spoon" , response:"12.23"},
    {input:"1" , input_unit:"Rankine" , target_unit:"Cubic inch" , response:"32.23"},
    {input:"1" , input_unit:"Celsius" , target_unit:"Table spoon" , response:"12.23"},
    {input:"1" , input_unit:"Celsius" , target_unit:"Cubic inch" , response:"32.23"},
    {input:"1" , input_unit:"Kelvin" , target_unit:"Table spoon" , response:"12.23"},
    {input:"1" , input_unit:"Kelvin" , target_unit:"Cubic inch" , response:"32.23"},
    {input:"1" , input_unit:"Table spoon" , target_unit:"Fahrenheit" , response:"12.23"},
    {input:"1" , input_unit:"Cup" , target_unit:"Fahrenheit" , response:"12.23"},
    {input:"1" , input_unit:"Liter" , target_unit:"Fahrenheit" , response:"12.23"},
    {input:"1" , input_unit:"Gallon" , target_unit:"Fahrenheit" , response:"12.23"},
    {input:"1" , input_unit:"Cubic inch" , target_unit:"Fahrenheit" , response:"12.23"},
    {input:"1" , input_unit:"Cubic feet" , target_unit:"Fahrenheit" , response:"12.23"},
  ];

const incorrectTestData = [
    {input:"317.33" , input_unit:"Kelvin" , target_unit:"Fahrenheit" , response:"111.554"},
    {input:"25.6" , input_unit:"Cup" , target_unit:"Liter" , response:"7.1"},
    {input:"6.5" , input_unit:"Fahrenheit" , target_unit:"Rankine" , response:"dog"},
    {input:"1" , input_unit:"Table spoon" , target_unit:"Gallon" , response:"cat"},
    {input:"1" , input_unit:"Liter" , target_unit:"Gallon" , response:"0.21"},
]

const testCases = () =>{
  // run all correct tests
  describe('Correct tests', () => {
    correctTestData.forEach((el) => {
      let answers =[];
      answers.push(el.input);
      answers.push(el.input_unit);
      answers.push(el.target_unit);
      answers.push(el.response);
      
        it(`${el.input_unit} => ${el.target_unit}, ${el.input} => ${el.response} should be correct`, () => {
          const answer = calculate(answers);
          assert(answer === 'correct', `Result should be 'correct'`);
        });
      });
    });

    // run on invalid tests
    describe('Invalid tests', () => {
      invalidTestData.forEach((el) => {
        let answers =[];
        answers.push(el.input);
        answers.push(el.input_unit);
        answers.push(el.target_unit);
        answers.push(el.response);
        
          it(`${el.input_unit} => ${el.target_unit}, ${el.input} => ${el.response} should be invalid`, () => {
            const answer = calculate(answers);
            assert(answer === 'invalid', `Result should be 'invalid'`);
          });
        });
      });

      // run on incorrect tests
      describe('Incorrect tests', () => {
        incorrectTestData.forEach((el) => {
          let answers =[];
          answers.push(el.input);
          answers.push(el.input_unit);
          answers.push(el.target_unit);
          answers.push(el.response);
          
            it(`${el.input_unit} => ${el.target_unit}, ${el.input} => ${el.response} should be incorrect`, () => {
              const answer = calculate(answers);
              assert(answer === 'incorrect', `Result should be 'incorrect'`);
            });
          });
        });
}

testCases();
