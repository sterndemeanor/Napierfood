//declarations
let start = document.querySelector("#start");
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");
let choice_que = document.querySelectorAll(".choice_que");
let index = 0;
let timer = 0;
let interval = 0;
let correct = 0;
let UserAns = undefined;

// >start button click
start.addEventListener("click", () => {
    start.style.display = "none";
    guide.style.display = "block";
});

// > exit button click
exit.addEventListener("click", () => {
    start.style.display = "block";
    guide.style.display = "none";
});


//quiz timer
let countDown = () => {
    if (timer === 20) {
        clearInterval(interval);
        next_question.click();
    } else {
        timer++;
        time.innerText = timer;
    }
}

let loadData = () => {
    questionNo.innerText = index + 1 + ". ";
    questionText.innerText = MCQS[index].question;
    option1.innerText = MCQS[index].choice1;
    option2.innerText = MCQS[index].choice2;
    option3.innerText = MCQS[index].choice3;
    option4.innerText = MCQS[index].choice4;

    //timer start
    timer = 0;
}

loadData();

// > continue button
continueBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    guide.style.display = "none";

    interval = setInterval(countDown, 1000);
    loadData();

    //remove active classes

    choice_que.forEach(removeActive => {
        removeActive.classList.remove("active");
    })

    total_correct.innerHTML = `${correct = 0} out of ${MCQS.length} questions`;
});

choice_que.forEach((choices, choiceNo) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");
        //check answer
        if (choiceNo === MCQS[index].answer) {
            correct++;
        } else {
            correct += 0;
        }
        //stop counter
        clearInterval(interval);

        //disable all options when user selects an option
        for (i = 0; i <= 3; i++) {
            choice_que[i].classList.add("disabled");
        }
    })
});

//next button effect
next_question.addEventListener("click", () => {
    if (index !== MCQS.length - 1) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("active");
        })

        //question
        loadData();

        //result
        total_correct.style.display = "block";
        total_correct.innerHTML = `${correct} correct out of ${MCQS.length} questions`;
        clearInterval(interval);
        interval = setInterval(countDown, 1000);
    } else {
        index = 0;


        //display results
        clearInterval(interval);
        quiz.style.display = "none";
        points.innerHTML = `You got ${correct} correct out of ${MCQS.length}`;
        result.style.display = "block";
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
    }
})

//quit button effect
quit.addEventListener("click", () => {
    location.href = '/index.html';
    start.style.display = "block";
    result.style.display = "none";
});

//start again button effect
startAgain.addEventListener("click", () => {
    guide.style.display = "block";
    result.style.display = "none";
});
