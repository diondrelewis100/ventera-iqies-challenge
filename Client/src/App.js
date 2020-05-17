import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [ipunit,setIpunit] = useState("temperature:Kelvin");
  const [opunit,setOpunit] = useState("temperature:Kelvin");  
  const [ipnumber,setipnumber] = useState(0);   
  const [opnumber,setopnumber] = useState(0);  
  const verifyStudentOutput=(e)=>{
     e.preventDefault();
     if(ipunit.split(":")[0] !== opunit.split(":")[0]){
       alert("invalid");
       return false;
     }
     fetch('http://localhost:5000/validateInput?studentInput='+ipnumber+'&inputUnit='+ipunit.split(":")[1] +'&targetUnit='+opunit.split(":")[1]+'&studentResponse='+opnumber+'')
     .then(response => response.json())
     .then(data => alert(data.result))
     .catch(error => alert("failed to get result")) 
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Convertor
        </h2>
      </header>
      <div className="jumbotron">
        <div className="container">
        <form onSubmit={verifyStudentOutput}>
          <div class="form-group">
            <label for="inputUnit">Input Unit</label>
            <select className="form-control" value={ipunit} onChange={e=>{setIpunit(e.target.value)}} required>
            <optgroup label="Temperature">
                <option value="temperature:Kelvin">Kelvin</option>
                <option value="temperature:Celsius">Celsius</option>
                <option value="temperature:Fahrenheit">Fahrenheit</option>
                <option value="temperature:Rankine">Rankine</option>
              </optgroup>
              <optgroup label="Volume">
                <option value="volume:Liter">Liter</option>
                <option value="volume:Table spoon">Tablespoon</option>
                <option value="volume:Cup">Cup</option>
                <option value="volume:Gallon">Gallon</option>
                <option value="volume:Cubic inch">Cubic Inch</option>
                <option value="volume:Cubic feet">Cubic Feet</option>
              </optgroup>
              </select>
          </div>
            <div class="form-group">
              <label for="outputUnit">Output Unit</label>
              <select className="form-control" value={opunit} onChange={e=>{setOpunit(e.target.value)}} required>
              <optgroup label="Temperature">
                <option value="temperature:Kelvin">Kelvin</option>
                <option value="temperature:Celsius">Celsius</option>
                <option value="temperature:Fahrenheit">Fahrenheit</option>
                <option value="temperature:Rankine">Rankine</option>
              </optgroup>
              <optgroup label="Volume">
                <option value="volume:Liter">Liter</option>
                <option value="volume:Table spoon">Tablespoon</option>
                <option value="volume:Cup">Cup</option>
                <option value="volume:Gallon">Gallon</option>
                <option value="volume:Cubic inch">Cubic Inch</option>
                <option value="volume:Cubic feet">Cubic Feet</option>
              </optgroup>
              </select>
            </div>
            <div class="form-group" required>
              <label for="inputNumber">Student Input</label>
              <input type="number" class="form-control" id="ipnumber" placeholder="Input" value={ipnumber} onChange={e=>{setipnumber(e.target.value)}} required />
              </div>
            <div class="form-group" required>
              <label for="inputNumber">Student Outut</label>
              <input type="number" class="form-control" id="opnumber" placeholder="Output" value={opnumber} onChange={e=>{setopnumber(e.target.value)}} required />
            </div>
                <button type="submit" class="btn btn-primary">Convert</button>
        </form>
          </div>
            </div>
          </div>
  );
}

export default App;
