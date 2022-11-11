import evaluate from "../egg/evaluator.js";

const specialForms = Object.create(null); // this will include our various functions
// down the road;


specialForms.if = (args, scope) => {
    // similar to arg[0] ? arg[1] : arg[2]
    if (args.length != 3) {
        throw new SyntaxError('Wrong number of arguments to if.')
    } else if (evaluate(args[0], scope) !== false) { // if zeroeth arg is false
        return evaluate(args[1], scope); // then return the oneth arg
    } else {
        return evaluate(args[2], scope); // otherwise return the twoth arg
    }
};

specialForms.while = (args, scope) => {
    if (args.length != 2) {
        throw new SyntaxError("While expects two args");
    }
    while (evaluate(args[0], scope) !== false) {
        evaluate(args[1], scope);
    }
  
    // return false instead of the accursed 'undefined'
    return false;
    // this bothers me as we're not actually writing our own while,
    // merely using JS's while loop
};

specialForms.do = (args, scope) => {
    let value = false;
    for (let arg of args) {
        value = evaluate(arg, scope);
    }
    return value;
};

specialForms.define = (args, scope) => {
    if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of define");
    }
    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
};

specialForms.fun = (args, scope) => {
    if (!args.length) {
      throw new SyntaxError("Functions need a body");
    }
    let body = args[args.length - 1];
    let params = args.slice(0, args.length - 1).map(expr => {
      if (expr.type != "word") {
        throw new SyntaxError("Parameter names must be words");
      }
      return expr.name;
    });
  
    return function() {
      if (arguments.length != params.length) {
        throw new TypeError("Wrong number of arguments");
      }
      let localScope = Object.create(scope);
      for (let i = 0; i < arguments.length; i++) {
        localScope[params[i]] = arguments[i];
      }
      return evaluate(body, localScope);
    };
  };

export default specialForms;