/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn, ...args) {

  for (var i = 0; i < array.length; i++) {
    fn(array[i], i, array, ...args);
  }

}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn, ...args) {
  let newArray = [];
  for (var i = 0; i < array.length; i++) {
    newArray[newArray.length] = fn(array[i] ,i ,array, ...args);
  }
  return newArray;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial, ...args) {
  var i = 0;
  if (!initial) {
    initial = array[0];
    i++;
  }

  for (; i < array.length; i++) {
    initial = fn(initial,array[i],i,array, ...args);
  }

  return initial;

}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
  delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
  if (prop in obj) return !0;
  return !1;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
  var array = [];
  for (var key in obj) {
    array.push(key);
  }
  return array
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {

  let names = getEnumProps(obj);
  let newNames = map( names, name => name.toUpperCase() )

  return newNames;

}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to) {
  let newArray = [];

  if (from > array.length) return [];
  if (to <= from &&  to >= 0) return [];
  if (to <= from && from < 0) return [];

  if (from < 0)
    from = array.length + from;
  if (from < -array.length)
    from = 0;

  
  if (to < 0)
    to = array.length + to;

  if (to > array.length)
    to = array.length;

  if (to < -array.length)
    to = -array.length + 1;
    
  if (to === undefined) to = array.length;
  for (; from < to; from++) {
    newArray[newArray.length] = array[from];
  }

  return newArray;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  return new Proxy(obj,{
    set(target,prop,value) {
      target[prop] = value ** 2;
      return true;
    }
  });
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
