//calculate the axis of symmetry of a quadratic function
//y = ax^2 + bx + c

//calculate button
document.getElementById("calculate").addEventListener("click", calculate);
//reset button
document.getElementById("reset").addEventListener("click", reset);

function reset() {
    document.getElementById("equation").value = "";
    document.getElementById("result").innerHTML = "";
    }
//calculate the axis of symmetry


function calculate() {
    // Get the equation from the input field
    let equation = document.getElementById("equation").value.replaceAll(/\s/g,'');
    //check if includes y
    if(!equation.includes("y=")){
        equation = "y="+equation;
    }

    const regex = /^y\s*=\s*([+-]?\d*x\^2)\s*([+-]?\d*x)?\s*([+-]?\d*)$/
    console.log("eq",equation)
    console.log("test",regex.test(equation))

    // Calculate the axis of symmetry
    var a = 0, b = 0, c = 0;
    var matches = equation.match(regex);
    console.log(matches)
    if (matches) {
      a = getCoefficient(matches[1]);
      b = getCoefficient(matches[2]);
      c = getCoefficient(matches[3]);
    }
    let axis = -b / (2 * a);
    if(isNaN(axis)){
        axis="Not a Number"
    }
    //show the user how axis of symmetry is calculated step by step
    document.getElementById('result').innerHTML=`
    <div>
    <h3>Solution</h3>
    <p>Axis of symmetry is calculated as:</p>

            <p>x=-b / (2 × a);</p>
    <p>From your equation: </p>
    <p>a=${a}, b=${b}, c=${c} </p>

    <p>x=-${b} / (2 × ${a});</p>

    <p><strong>x=${axis}</p>
    </div>

    
    `

    

   


  }


  function getCoefficient(term) {
  // Check if the term is of the form "ax^2" or "ax"
        var match = term.match(/^([+-]?)(\d*)(x\^2|x)$/);
        if (match) {
    // Return the coefficient as an integer, taking the sign into account
    var sign = (match[1] === "-") ? -1 : 1;
    var coefficient = parseInt(match[2] || "1");
    return sign * coefficient;
  }

  // Otherwise, the term must be a constant
  return parseInt(term)||0;
  }


