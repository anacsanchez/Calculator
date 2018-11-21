const calcFunctions = {
  calcEquation: (equation) => {
    let operands = equation.split(/[/x+-]/g).filter(el=> el !== '').map(el => Number.parseFloat(el));
    let operators = equation.split(/[^/x+-]/g).filter(el => el !== '');
    if (!operators.length || operands.length<2) {
      return equation;
    }
    const allOps = ['/','x','-','+'];
    let i = 0;
    let j = 0;
    let result;
    while (j < allOps.length) {
      if (operators[i] == allOps[j]) {
        if(allOps[j] == '/') {
          result = operands[i]/operands[i+1]
        }
        else if (allOps[j] == 'x') {
          result = operands[i]*operands[i+1]
        }
        else if (allOps[j] == '+') {
          result = operands[i]+operands[i+1]
        }
        else if (allOps[j] == '-') {
          result = operands[i]-operands[i+1]
        }
        operands.splice(i, 2, result)
        operators.splice(i, 1);
      }
      ++i;
      if (i >= operands.length) {
        j++
        i=0;
      }
    }
    return Number.parseFloat(result.toPrecision(4));
  },
  isOperator: (input) => {
    return input == '+' || input == '-' || input == 'x' || input == '/';
  }
}

module.exports = calcFunctions;
