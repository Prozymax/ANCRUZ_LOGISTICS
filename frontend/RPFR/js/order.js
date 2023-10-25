const duckNumber = document.querySelector('#ducknumber'),
eggsNumber = document.querySelector('#eggsnumber'),
absForm = document.querySelector('#absForm'),
times = document.querySelector('#times'),
updatedEggsNumber = document.querySelector('#eggs'),
updatedDucksNumber = document.querySelector('#ducks'),
minus = document.getElementsByClassName('minus'),
plus = document.getElementsByClassName('plus'),
orderCnt = document.getElementById('order');

// FOR ORDER ID GENERTAION
const FUNCTIONS = {
    variables: {
    1: 'A',
        2: 'B',
        3: 'C',
        4: 'D',
        5: 'E',
        6: 'F',
        7: 'G',
        8: 'H',
        9: 'I',
        10: 'J',
    },
    getRandom: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    },
    getRandomLetters: () => {
        let letterIndex = FUNCTIONS.getRandom(1, 5);
        let generatedLetter = FUNCTIONS.variables[letterIndex];
        return generatedLetter;
    },
    orderID: async () => {
        const idNum = FUNCTIONS.getRandom(105000, 904000);
        const idLetters = FUNCTIONS.getRandomLetters();
        let orderid = `ANC${idNum}${idLetters}`
        return orderid;
    }
}

// console.log(FUNCTIONS.orderID());

const updateValues = async (e) => {
    let ORDERID = await FUNCTIONS.orderID();
    orderCnt.innerHTML = 'kojdeocd'
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
    })
    absForm.style.display = 'flex';
    updatedEggsNumber.value = eggsNumber.value;
    updatedDucksNumber.value = duckNumber.value;
    document.body['style'].overflow = 'hidden';
}

times.addEventListener('click', () => {
    absForm.style.display = 'none';
    document.body['style'].overflow = 'visible';
})

// const CalcFunctions = {
//     minus
// }


