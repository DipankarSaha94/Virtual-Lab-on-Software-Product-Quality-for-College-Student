const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

var ques_arr = [];
let questions = [
    {
        question : "Performance of a product is:",
        choiceA : "how long the product lasts",
        choiceB : "how easy it is to repair the product",
        choiceC : "how often the product fails",
		choiceD : "whether the product is capable of doing the intended job",
        correct : "D"
    },{
        question : "MTTR stands for:",
        choiceA : "Mean Time To Reduce",
        choiceB : "Mean Time To Repair",
        choiceC : "Median Time To Repair",
		choiceD : "Median Time To Reduce",
        correct : "B"
    },{
        question : "Which one of these is not a characteristic of product quality?",
        choiceA : "Acceptance Sampling",
        choiceB : "Compatibility",
        choiceC : "Usablity",
		choiceD : "Maintainability",
        correct : "A"
    },{
        question : "Which one of these is not a sub-characteristic of Functional Suitability?",
        choiceA : "Functional Completeness",
        choiceB : "Functional Appropriateness",
        choiceC : "Functional Correctness",
		choiceD : "Functional Complexity",
        correct : "D"
    },{
        question : "Which one of these is not a part of maintainability?",
        choiceA : "Modularity",
        choiceB : "Analysability",
        choiceC : "Adaptability",
		choiceD : "Testability",
        correct : "C"
    },{
        question : "Which of the following is likely to be the most expensive cost of quality?",
        choiceA : "Appraisal costs",
        choiceB : "External failure costs",
        choiceC : "External failure costs",
		choiceD : "Prevention costs",
        correct : "B"
    },{
        question : "Which of the following management decisions have the potential to impact software quality?",
        choiceA : "Estimation decisions",
        choiceB : "Risk-Oriented decisions",
        choiceC : "Scheduling decisions",
		choiceD : "All of the above",
        correct : "D"
    },{
        question : "What does QA and QC stand for?",
        choiceA : "Quality Assurance and Queuing Control",
        choiceB : "Quality Adjustment and Quality completion",
        choiceC : "Quality Assurance and Quality control",
		choiceD : "Quality Adjustment and Queuing control",
        correct : "C"
    },{
        question : " Degree to which design specifications are followed in manufacturing the product is called:",
        choiceA : "Quality of Conformance",
        choiceB : "Quality control",
        choiceC : "Quality Assurance",
		choiceD : "None of the above",
        correct : "A"
    },{
        question : "Which of the following is not included in failure costs?",
        choiceA : "Rework",
        choiceB : "Failure mode analysis",
        choiceC : "Repair",
		choiceD : "None of the above",
        correct : "D"
    }
];

const lastQuestion = questions.length - 1;
let runningQuestion = Math.floor(Math.random() * questions.length);
let count = 0;
const questionTime = 30;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
let qcount = 0;

function renderQuestion(){
    //let q = questions[runningQuestion];
    let q = questions[runningQuestion];
    //question.innerHTML = "<p>Q"+ (runningQuestion + 1) + ". " + q.question +"</p>";
	question.innerHTML = "<p>Q"+ (qcount + 1) + ". " + q.question +"</p>";
    choiceA.innerHTML = "<b>(A)</b> " + q.choiceA;
    choiceB.innerHTML = "<b>(B)</b> " + q.choiceB;
    choiceC.innerHTML = "<b>(C)</b> " + q.choiceC;
	choiceD.innerHTML = "<b>(D)</b> " + q.choiceD;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
}

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +">" + (qIndex + 1) + "</div>";
    }
}

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsWrong();
        //if(runningQuestion < lastQuestion){
        //    runningQuestion++;
		if(qcount < lastQuestion){
			var dem = Math.floor(Math.random() * questions.length);
			while(ques_arr.includes(dem)) {
				dem = Math.floor(Math.random() * questions.length);
			}
            runningQuestion = dem;
			ques_arr.push(dem);
			qcount++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    //if(runningQuestion < lastQuestion){
     //   runningQuestion++;
	if(qcount < lastQuestion){
        var dem = Math.floor(Math.random() * questions.length);
		while(ques_arr.includes(dem)) {
			dem = Math.floor(Math.random() * questions.length);
		}
		runningQuestion = dem;
		ques_arr.push(dem);
		qcount++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(qcount).style.background = "linear-gradient(to left, green, black)";
	document.getElementById(qcount).style.color = "white";
}

function answerIsWrong(){
    document.getElementById(qcount).style.background = "linear-gradient(to left, red, black)";
	document.getElementById(qcount).style.color = "white";
}
function refreshPage() {
	location.reload();
}

function scoreRender(){
    scoreDiv.style.display = "block";
    
    const scorePerCent = Math.round(100 * score/questions.length);
    
    let img = (scorePerCent >= 80) ? "images/5.png" :
              (scorePerCent >= 60) ? "images/4.png" :
              (scorePerCent >= 40) ? "images/3.png" :
              (scorePerCent >= 20) ? "images/2.png" :
              "images/1.png";
    
    scoreDiv.innerHTML = "<div class='finalScore'><img src="+ img +" alt='emoji'/><br><p>Your Score Percentage is: <b>"+ scorePerCent +"%</b></p><button class='score_submit' onClick='refreshPage()'>Reset</button></div>";
}