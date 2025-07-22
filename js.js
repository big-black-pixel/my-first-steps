// // Задание на for глава 1

// // №1 Напиши цикл for, который выводит числа от 1 до 10.

// for (let index = 1; index <= 10; index++) {
//     console.log(index)
// }

// // №2 Выведи все чётные числа от 2 до 20.

// for (let index = 2; index <= 20; index+=2) {
//     console.log(index)
// }

// // №3 Выведи числа от 10 до 1 в обратном порядке.

// for (let index = 10; index >= 1; index--) {
//     console.log(index)
// }

// // №4 Посчитай сумму всех чисел от 1 до 100.

// let num = 0
// for (let index = 1; index <= 100; index++) {
//     num += index
// }console.log(num)

// // №5 Выведи таблицу умножения для числа 5: 5 × 1, 5 × 2 ... до 5 × 10.

// let num1 = 5
// for (let index = 1; index <= 10; index++) {
//     console.log(` 5 x ${index} = ${num1 * index}`)
// }

// // №6 Посчитай сумму всех нечётных чисел от 1 до 50.

// let num2 = 0
// for (let index = 1; index <= 50; index++) {
//     if(index % 2 !== 0){num2 += index}
// }console.log(num2)

// // №7 Создай строку, содержащую числа от 1 до 10 через запятую. 

// let str = ''
// for (let index = 2; index <= 10; index++) {
// if (index > 1) {str += ', ';}
//     str += index;
// }
// console.log(str)

// // №8 Найди первый делитель числа 60, отличный от 1 и самого числа.

// for (let index = 2; index <= Math.sqrt(60); index++) {
//     console.log(index)
//     if( 60 % index === 0 ) {console.log(index);break}
// }

// // №9 Реализуй "счетчик-обманщик": выведи числа от 1 до 20, но пропусти число 13.

// for (let index = 1; index <= 20; index++) {
//     if(index === 13){continue}
//     console.log(index)
// }

// // №10 Проверь, является ли число 23 простым (делится только на 1 и само себя).

// let isPrime = true;

// for (let index = 2; index <= Math.sqrt(23); index++) {
//     console.log(index);
//     if (23 % index === 0) {isPrime = false;break;}
// }
// if (isPrime) {console.log('Делителей нет — число простое');} 
// else {console.log('Нашли делитель — число не простое')};

// // №11 Создай массив из квадратов чисел от 1 до 10.

// let mas = []
// for (let index = 1; index <= 10; index++) {
//     mas.push(index * index)
// }
// // №12 Напиши функцию, которая принимает число N и возвращает сумму всех чисел от 1 до N.

// (function z12(n){
//     let num = 0
//     for (let index = 1; index <= n; index++) {
//         num += index
//     }  console.log(num)
// })(13)

// // №13 Создай массив из первых 10 степеней числа 2 (начиная с 2^1 = 2)

// let mas1 = []
// for (let index = 1; index <= 10; index++) {
//     mas1.push(2**index)
// }

// // №14 Реализуй игру FizzBuzz: выведи числа от 1 до 30, заменяя:  числа, кратные 3 — на "Fizz", кратные 5 — на "Buzz", кратные и 3, и 5 — на "FizzBuzz". Остальные числа выводи как есть.
     
// for (let index = 1; index <= 30; index++) {
//     if(index % 3 === 0 && index % 5 != 0){console.log("Fizz")}
//     else if(index % 5 === 0 && index % 3 != 0){console.log("Buzz")}
//     else if(index % 3 === 0 && index % 5 === 0){console.log("FizzBuzz")}
//     else{console.log(index)}
// }

// // №15 Реализуй алгоритм подсчёта факториала числа 8.

// num3 = 1 ;
// for (let index = 8; index > 0; index--) {
//     num3 *= index
// }console.log(num3)








// // Задание на for...in глава 2

// // №1 Создай объект с 3 свойствами (например, {name: 'John', age: 25, city: 'Moscow'}) и выведи все ключи объекта.

// let obj = {name: 'John',age: 25,city: 'Moscow'}
// for (const key in obj) {
//     console.log("key: " + key)
// }

// // №2 То же, что и выше, но выведи значения свойств, а не ключи. Доступ к значениям осуществляется через object[key].

// let obj1 = {name: 'John',age: 25,city: 'Moscow'}
//     for (const key in obj1) {
//         console.log("value: " + obj1[key])
//     }

// // №3 Перебери объект с 5 числами (например, {a: 5, b: 10, c: 15, d: 20, e: 25}) и посчитай их сумму.

// let obj3 = {a: 5, b: 10, c: 15, d: 20, e: 25}
// let sum = 0;
// for (const key in obj3) {
//     sum += obj3[key]
// }
// console.log(sum)

// // №4 Создай объект с именами месяцев как ключи и их номерами как значения. Пройдись по нему и выведи фразы вроде: "Месяц: январь, номер: 1".

// const months = {январь: 1,февраль: 2,март: 3,апрель: 4,май: 5,июнь: 6,июль: 7,август: 8,сентябрь: 9,октябрь: 10,ноябрь: 11,декабрь: 12 };
// for (const key in months) {
// console.log(`Месяц: ${key}, номер: ${months[key]}`)
// }

// // №5 Добавь проверку, чтобы игнорировать методы объекта (если они есть), и выводил только собственные свойства. 

// const obj5 = {name: 'Анна',age: 28,city: 'СПб',isAdmin: true,sayHello() {console.log('Привет от пользователя')}};
// for (const key in obj5) {
//     if(Object.hasOwn(obj5,key) && typeof obj5[key] !== 'function'){console.log(`Ключ: ${key}, значение: ${obj5[key]}`)}
// }
    
// // №6 Создай объект с товарами и их ценами. Пройдись по нему и выведи только те товары, цена которых больше 100.

// const obj6 = {яблоко: 50,банан: 130,апельсин: 140,хлеб: 125,молоко: 45,сыр: 80};
// for (const key in obj6) {
//     if (obj6[key] >= 100) {console.log(`Товар: ${key}, цена: ${obj6[key]}`)}
// }

// // №7 Пройдись по объекту и создай массив из его значений.

// const obj7 = {январь: 1,февраль: 2,март: 3,апрель: 4,май: 5,июнь: 6,июль: 7,август: 8,сентябрь: 9,октябрь: 10,ноябрь: 11,декабрь: 12 };
// const mas7 =[]
// for (const key in obj7) {mas7.push(obj7[key])}
// console.log(mas7)

// // №8 Создай объект с полями "имя", "возраст", "пол". Проверь, есть ли среди ключей слово "возраст".

// const user8 = {имя: "Алексей",возраст: 28,пол: "мужской"};
// for (const key in user8) {
//     if (key === 'возраст') {console.log(true)}
// }

// // №9 Создай объект с несколькими числами и найди максимальное значение среди них. Сравнивай текущее значение с максимальным.

// const obj9 = {a: 10, b: 25,c: 7,d: 42};
// let n9 = 0
// for (const key in obj9) {if(obj9[key] > n9){n9 = obj9[key]}}
// console.log(n9)

// // №10 Создай объект с полями, которые могут быть числами или строками. Пройдись по нему и выведи только числовые значения.

// const userData10 = {name: "Алексей",age: 28,city: "Москва",salary: 75000,isActive: true,rating: "высокий"};
// for (const key in userData10) {if (typeof userData10[key] === 'number' ) {console.log(userData10[key])}}

// // №11 Пройдись по объекту и преобразуй все числовые значения в удвоенные. 

// const obj11 = { name: "Иван",age: 30,city: "Новосибирск",height: 180, weight: 75.5,isStudent: false,email: "ivan@example.com",rating: "A"};
// for (const key in obj11) {
//     if (typeof obj11[key] === 'number'){obj11[key] = (obj11[key]*2)}
// }console.log(obj11)

// // №12 Создай объект, где ключи — это буквы, а значения — цифры. Посчитай сумму всех значений.

// const obj12 = {a: 1,b: 2,c: 3,d: 4,e: 5,f: 6,g: 7, h: 8,i: 9,j: 10};
// let num212 = 0;
// for (const key in obj12) {num212 += obj12[key]}
// console.log(num212)

// // №13 Создай объект с именами студентов и их баллами. Пройдись по нему и выведи имя студента с самым высоким баллом. 

// const students13 = {Алексей: 85,Мария: 92,Дмитрий: 78,Екатерина: 96,Иван: 88,Ольга: 90};
// let ball13 = 0
// let namstud13 = ''
// for (const key in students13) {if(students13[key] > ball13){ball13 = students13[key] ; namstud13 = key}}
// console.log(namstud13,ball13)

// // №14 Создай объект с 5 парами ключ-значение. Пройдись по нему и удали все пары, где значение меньше 10.

// const obj14 = {a: 3,b: 7,c: 15,d: 9,e: 22};
// for (const key in obj14) {
//     if(obj14[key] < 10) {delete obj14[key]}
// }console.log(obj14)

// // №15 Создай объект, где ключи — имена продуктов, а значения — их цены. Пройдись по нему и выведи список товаров со скидкой 20%.

// const prices15 = {яблоко: 100,банан: 80,апельсин: 150};
// const updatedPrices = {};
// for (const key in prices15){updatedPrices[key] = prices15[key] * 0.8}
// console.log(updatedPrices)








// // Задание на for...of глава 3

// // №1 Создай массив из 5 имён и выведи каждое из них по одному.

// const names31 = ['Алексей', 'Мария', 'Дмитрий', 'Екатерина', 'Иван'];
// for (const names of names31) {
//     console.log(names)
// }

// // №2 Создай массив чисел и выведи их сумму.

// const numbers32 = [10, 25, 7, 32, 18];
// let sum32 = 0 ;
// for (const iterator of numbers32) {sum32 += iterator } console.log(sum32)

// // №3 Создай массив строк и выведи каждую строку в верхнем регистре. 

// const names33 = ["Анна", "Борис", "Виктория", "Григорий", "Дарья"];
// const names332 = []
// for (const iterator of names33) {
//     names332.push(iterator.toUpperCase())
// }console.log(names332)

// // №4 Создай массив из 10 случайных чисел и найди минимальное значение.

// const randomNumbers34 = [17, 42, 5, 9, 81, 23, 56, 34, 70, 17];
// let nssn34 = 100
// for (const iterator of randomNumbers34) {
//     nssn34 = Math.min(nssn34,iterator)
// }console.log(nssn34)

// // №5 Создай массив из 10 случайных чисел и выведи только те, которые больше среднего арифметического.

// const randomNumbers35 = [17, 42, 5, 9, 81, 23, 56, 35, 70, 12];
// let sum35 = 0;
// for (const iterator of randomNumbers35) {sum35 += iterator}
// sum35 = Math.round(sum35/randomNumbers35.length)
// for (const iterator of randomNumbers35) {iterator >= sum35 ? console.log(iterator) : false}

// // №6 Создай строку и пройдись по ней, выведи каждый символ отдельно.

// let str36 = 'hello'
// for (const iterator of str36) {
//     console.log(iterator)
// }

// // №7 Создай массив с числами и умножь каждое число на 2, сохранив результат в новом массиве.

// const numbers37 = [10, 20, 30, 40, 50];mas37=[]
// for (const iterator of numbers37) {
//     mas37.push(iterator*2)
// }console.log(mas37)

// // №8 Создай массив слов и собери из них предложение, добавляя пробел между словами. 

// let onm37 = '', words38 = ["я", "люблю", "программировать", "на", "JavaScript"];
// for (const iterator of words38) {
//    onm37 += iterator + " "
// }console.log(onm37)

// // №9 Создай массив чисел и проверь, есть ли в нём хотя бы одно отрицательное число. Используй флаг или break, чтобы остановить цикл при нахождении.

// const numbers39 = [5, 10, -3, 8, 15];
// for (const iterator of numbers39) {if(iterator < 0){ console.log('error') ;break }}

// // №10 Создай массив чисел и проверь, все ли числа положительны. Если встречается отрицательное — установи флаг и выйди из цикла.

// const numbers310 = [5, 10, 3, -8, 7];let znq310 = true
// for (const iterator of numbers310) {if(iterator < 0){znq310 = false; break}}

// // №11 Создай массив строк и найди самую длинную строку.

// const words311 = ["яблоко", "банан", "вишня", "дыня", "ежевика"];
// let num311 = 0 ,str311=''
// for (const iterator of words311) {if(iterator.length > num311){num311 = iterator.length; str311 = iterator}}

// // №12 Создай массив из 10 чисел и выведи индексы тех элементов, которые равны 0.

// const numbers312 = [5, 0, 3, 0, 8, 0, 2, 7, 0, 4];
// let nam312 = 0 
// for (const iterator of numbers312) {
//     if(iterator === 0){console.log(nam312)}
//     nam312++
// }


// // №13 Создай массив строк и удалите из него все пустые строки.

// const words313 = ["яблоко", "", "банан", "", "вишня", "", "апельсин", "", "малина", ""];
// const nspal313 =[]
// for (const iterator of words313) {
//     if(iterator.trim().length !== 0 ){nspal313.push(iterator)}
// }

// // №14 Создай массив чисел и создай новый массив, содержащий только уникальные значения.

// const numbers314 = [1, 2, 2, 3, 4, 4, 5];
// const lolset = new Set()
// for (const iterator of numbers314) {
//     lolset.add(iterator)
// }

// // №15 Создай массив объектов с полями id и name. Пройдись по нему и выведи только name. Это подготовка к работе с массивами объектов.

// const users315 = [
//     { id: 1, name: "Анна" },
//     { id: 2, name: "Борис" },
//     { id: 3, name: "Виктория" },
//     { id: 4, name: "Григорий" },
//     { id: 5, name: "Дарья" }
//   ];
//   for (const iterator of users315) {console.log(iterator.name)}







// // Задание на for await...of глава 4

// №1Создай массив промисов, возвращающих числа через setTimeout



// №2
// №3
// №4
// №5
// №6
// №7
// №8
// №9
// №10
// №11
// №12
// №13
// №14
// №15
