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
    let equation1=''
    //check if includes y

    if(!equation.includes("y=")){
        equation = "y="+equation;
    }

    regex = /^y\s*=\s*([+-]?\d*x\^2)\s*([+-]?\d*x)?\s*([+-]?\d*)$/
    console.log("eq1",equation)
    if(!regex.test(equation)){
        equation1=equation;
        equation=convertEquation(equation);
        equation = "y="+equation;


        console.log("eq2",equation)

    }
    console.log("final",regex.test(equation))
    equation=equation.replaceAll(/\s/g,'')

    // Calculate the axis of symmetry
    var a = 0, b = 0, c = 0;
    var matches = equation.match(regex);
    if (matches) {
      a = getCoefficient(matches[1]);
      b = getCoefficient(matches[2]);
      c = getCoefficient(matches[3]);
    }
    let axis = -b / (2 * a);
    if(isNaN(axis)){
        axis="Not a Number"
    }
    axis=toFraction(axis);
    //show the user how axis of symmetry is calculated step by step
    document.getElementById('result').innerHTML=`
    <div>
    <h3>Solution</h3>
    <p>From your equation: </p>

        <p>${equation1}</p>

    <p>${equation}</p>
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

    
    
//convert the equation to the form y=ax^2+bx+c
function convertEquation(equation){
  

    let a=equation.split('x')[0].split('(')[1]||1;

    let b=equation.split('x')[1].split(')')[0];

    let c=equation.split('^')[1].split('2')[1]||0;

    return `${a*a}x^2${eval(2*a*b)>0?'+':''}${eval(2*a*b)}x${eval((b*b)+c)>0?'+':''}${eval((b*b)+c)}`;

}



function toFraction(float) {
    // Check if the number is an integer
    if (Number.isInteger(float)) {
      return `${float}`;
    }
  
    // Check if the number is a terminating decimal
    let digits = (float.toString().split('.')[1] || '').length;
    let denominator = Math.pow(10, digits);
    let numerator = float * denominator;
    if (Number.isInteger(numerator)) {
      let whole = Math.trunc(numerator / denominator);
      numerator = numerator % denominator;
      if (whole === 0) {
        if(denominator>1000){
            return float;
        }
        return `${toSimplestForm(numerator, denominator)}`;
      } else {
        if(denominator>1000){
            return float;
        }
        return `${whole} ${toSimplestForm(Math.abs(numerator), Math.abs(denominator))}`;
      }
    }
  
    // The number is not a terminating decimal, so we return it as is
    return float;
  }

  function toSimplestForm(numerator, denominator) {
    const gcd = getGCD(numerator, denominator);
    numerator /= gcd;
    denominator /= gcd;
    return numerator + '/' + denominator;
  }
  
  // Helper function to get the greatest common divisor of two numbers
  function getGCD(a, b) {
    if (b === 0) {
      return a;
    }
    return getGCD(b, a % b);
  }
  