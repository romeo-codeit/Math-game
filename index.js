console.clear()

//THE GAME VARIABLE
const inputText = document.querySelector("#inputText")
const checkButton = document.querySelector("#checkButton")


//MODAL, THE ANSWER, X SIGN

const modal = document.querySelector("#mymodal")
const theAnswer = document.querySelector(".theAnswer")
const closebtn = document.querySelector(".close")
 
//ANSWERS: "CORRECT, GOOD WORK" , "INCORRECT, TRY AGAIN"

let answerOptions = ["Correct, good work", "Incorrect, try again", "What the fuck!"]
//CHECK BUTTON FUNCTION
checkButton.addEventListener("click", function(){
    document.getElementById('myModal').style.display = 'block'
    let userInput = parseInt(inputText.value) //NUMBER
    if(userInput ===2){
        document.getElementById('myModal').style.background = 'rgb(46, 204, 113)'
        theAnswer.textContent = answerOptions[0]
    } else{
        document.getElementById('myModal').style.background = '#e74c3c'
        theAnswer.textContent = answerOptions[1]
    }
    if(userInput > 15){
        document.getElementById('myModal').style.background = '#e74c3c'
        theAnswer.textContent = answerOptions[2]
    }
})
closebtn.addEventListener("click", function(){
    document.getElementById('myModal').style.display = 'none'
})

// Example questions array
const questions = [
    { a: 4, b: 2, op: '-', answer: 2 },
    { a: 5, b: 3, op: '-', answer: 2 },
    { a: 7, b: 1, op: '-', answer: 6 },
    { a: 6, b: 2, op: '-', answer: 4 },
    { a: 8, b: 5, op: '-', answer: 3 },
    { a: 10, b: 4, op: '-', answer: 6 },
    { a: 9, b: 3, op: '-', answer: 6 },
    { a: 12, b: 7, op: '-', answer: 5 },
    { a: 15, b: 8, op: '-', answer: 7 },
    { a: 14, b: 6, op: '-', answer: 8 }
];

let currentQuestion = 0;

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('class').innerHTML = 
        `<span class="blue">${q.a}</span> - <span class="red">${q.b}</span> = ?`;
}

document.getElementById('checkButton').addEventListener('click', function() {
    const userAnswer = parseInt(document.getElementById('inputText').value, 10);
    const correctAnswer = questions[currentQuestion].answer;

    if (userAnswer === correctAnswer) {
        // Show modal or feedback here if needed
        currentQuestion = (currentQuestion + 1) % questions.length; // Next question
        showQuestion();
        document.getElementById('inputText').value = '';
    } else {
        // Show wrong answer feedback if needed
    }
});

// Initialize first question
showQuestion();