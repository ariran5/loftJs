/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
  if (!(fn instanceof Function)) throw new Error('fn is not a function');
  if (!(array instanceof Array) || !array.length) throw new Error('empty array');

  for (var i = 0; i < array.length; i++) {
    if (!fn(array[i])) return false;
  }
  return true;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
  if (!(fn instanceof Function)) throw new Error('fn is not a function');
  if (!array.length || !(array instanceof Array)) throw new Error('empty array');

  for (var i = 0; i < array.length; i++) {
    if (fn(array[i])) return true;
  }
  return false;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn,...args) {

  if (!(fn instanceof Function)) throw new Error('fn is not a function');

  let badArgs = [];

  for (var i = 0; i < args.length; i++) {
    try {

      fn(args[i]);

    } catch (e) {
      badArgs[badArgs.length] = args[i];
      // .push();
    }

  }
  return badArgs;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(num = 0) {

  function badProp(prop) {
    Error.call(this,prop);

    this.message = 'this prop is not a number';
    this.name = 'ProperyError';
    this.prop = prop;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this,badProp)
    } else {
      this.stack = (new Error()).stack;
    }
  }
  badProp.prototype = Object.create(Error.prototype);

  if (isNaN(+num)) throw new badProp(number);


  return {
    sum: (...args) => {

      for (var i = 0; i < args.length; i++) {

        let number = args[i];
        if (isNaN(+number)) throw new badProp(number);
        num += number;

      }

      return num;
    },
    dif: (...args) => {

      for (var i = 0; i < args.length; i++) {

        let number = args[i];
        if (isNaN(+number)) badProp(number);
        num -= number;

      }

      return num;
    },
    div: (...args) => {

      for (var i = 0; i < args.length; i++) {

        let number = args[i];
        if (isNaN(+number)) badProp(number);
        if (number === 0) throw new Error('division by 0');
        num /= number;

      }

      return num;
    },
    mul: (...args) => {

      for (var i = 0; i < args.length; i++) {

        let number = args[i];
        if (isNaN(+number)) badProp(number);
        num *= number;

      }

      return num;
    }
  }
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
