


let color =["แดง","ขาว","ม่วง","ฟ้า"];
color.push("black");

for(let i=0;i<color.length;i++){
    console.log("NO"+(i+1)+"มีค่า"+color[i])
}

for(let i=0;i<color.length;i++){
console.log(color[i])
}

// 
color.forEach(getcolor);

function getcolor(color){
    console.log("color="+color)
}
let x = color.toString();
console.log(x)

let scores =[10,20,30,40,50,60,70,80,90,100]
let sum =0;

for(let i= 0;i<scores.length;i++){
    if (scores[i] >= 50){
    console.log(sum += scores[i] )   
    }

}


//loop of i  
for(let i=1;i<=3;i++){  
    //loop of j  
    for(let j=1;j<=3;j++){  
            console.log(i+" "+j);  
    }//end of i  
    }//end of j  
   

//  for(let i=1 ;i<=5;i++ ){
//     for(let j=1;j<=5;j++){
//         console.log("*");   

//     }
   

//  }   


 const capitals = {
    a: "Athens",
    b: "Belgrade",
    c: "Cairo"
  };
  
  for (let key in capitals) {
    console.log(key + ": " + capitals[key]);
  }
  
  // Output:
  // a: Athens
  // b: Belgrade
  // c: Cairo

  const array = [1, 2, 3];

for (const i in array) {
  console.log(i);
}


const m = new Map();
m.set(1, "black");
m.set(2, "red");

for (let n of m) {
  console.log(n);
}

const courses = {
    java: 10,

    javascript: 55,

    nodejs: 5,

    php: 15
};

// convert object to key's array

const keys = Object.keys(courses);

// print all keys

console.log(keys);

//////
const animals = {
    tiger: 1,

    cat: 2,

    monkey: 3,

    elephant: 4
};

// iterate over object values

Object.values(animals).forEach(val => console.log(val));

// 1
// 2
// 3
// 4


// 

const entries = Object.entries(animals);
console.log(entries);

// 
for (const [key, value] of Object.entries(animals)) {
    console.log(`${key}: ${value}`);
}

// `forEach()` method

Object.entries(animals).forEach(([key, value]) => {
    console.log(`${key}: ${value}`)
});


let numbers = [10, 20, 30, 40, 50];
let colors = ["Red", "Orange", "Yellow", "Green"];

let sumall = 0;
for (let num of numbers) {
    sumall += num;
}
console.log("Sumall: " + sumall);

for (let item of colors) {
    console.log(item);
}
let sumall1 = 0;
for (let i = 0; i < numbers.length; i++) {
    sumall1 += numbers[i];
    
}console.log("Sumall1: " + sumall1);

// 
let user = {
    id: 1,
    name: "Metin",
    isAdmin: true
};

for (let prop in user) {
    console.log(prop, user[prop]);
}
//


console.log(Object.keys(user));
// Output: [ 'id', 'name', 'isAdmin' ]

// 
let number = [10, 20, 30, 40, 50];

for (let index in number) {
    console.log(index, number[index]);
}

let str = "Hello";
for (let index in str) {
    console.log(index , str[index]);
}

// 
let user1 = {
    id: 1
};

user.name = "Metin";

Object.defineProperty(user1, "lang", {
    value: "JavaScript",
    enumerable: true
});

Object.defineProperty(user, "age", {
    value: 32,
    enumerable: false
});

for (let prop in user) {
    console.log(prop);
}

console.log(Object.keys(user));

// 
 
let numbersa = [10, 20, 30, 40, 50];
let Sumnumbersa = 0;
console.log("for of");
for (let item of numbersa) {
    Sumnumbersa += item
    console.log(item);
    
}
console.log("Sumnumbersa="+Sumnumbersa);

// 
console.log("for in");
for (let index in numbersa) {
    console.log(index, numbersa[index]);
}

console.log("for");
for (let i = 0; i < numbersa.length; i++) {
    console.log(i, numbersa[i]);
}

// https://medium.com/thai-devmaster/10-%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B1%E0%B8%9A-javascript-object-2b44d9d06567

// 
let person = {
    firstname: 'Natthapol',
    lastname: 'Thaisakornphan',
    height: 177,
};

// 1. การเข้าถึงแบบใช้ .
console.log(person.firstname); // Natthapol
console.log(person.height); // 177

// 2. การเข้าถึงแบบวงเล็บเหลี่ยม
console.log(person['firstname']); // Natthapol
console.log(person['height']); // 177

// 
let person1 = {
    firstname: 'Natthapol',
    lastname: 'Thaisakornphan',
    fullName: function() {
        return this.firstname + ' ' + this.lastname;
    }
};

console.log(person1.fullName()); // Natthapol Thaisakornphan