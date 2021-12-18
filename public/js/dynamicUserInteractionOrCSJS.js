console.log('Client Side JavaScript file is loaded!');

// fetch is a browser client-side js functionality..it wont work in node js

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     console.log(response);  // console.log(response.json());
//     response.json().then((data) => {
// note - data will be printed in dev tool as it is  written in client side js file. data wont be here in nodejs terminal=====
//         console.log(data);
//     })
// })

// fetch('http://localhost:2000/fakeweather?address=!').then((res) => {
//     res.json().then((data) => {
//         if (data.error) {
//             return console.log('pls provide correct address');
//         }
//         console.log(data);
//     })
// })

// const formElement = document.querySelector('form')
// const inputElement = document.querySelector('input')

// formElement.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const locationInInputEle = inputElement.value

//     if (!locationInInputEle) {
//         return console.log('provide a location as Input box is blank');
//     }

//     fetch('http://localhost:2000/fakeweather?address=' + locationInInputEle).then((res) => {
//         res.json().then((data) => {
//             if (data.error) {
//                 return console.log('pls provide the valid address');
//             }
//             console.log(data);
//         })
//     })
// })

const formElement = document.querySelector('form')
const inputElement = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')

formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const locationInInputEle = inputElement.value
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    if (!locationInInputEle) {
        return messageOne.textContent = 'provide a location as Input box is blank'
    }

    fetch('http://localhost:2000/fakeweather?address=' + locationInInputEle).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = 'pls provide the valid address'
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(data);
        })
    })
})