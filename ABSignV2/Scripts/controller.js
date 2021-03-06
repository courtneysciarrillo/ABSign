var questionNumber=0;
var questionBank=new Array();
var stage="#game1";
var stage2=new Object;
var questionLock=false;
var numberOfQuestions;
var score=0;



//var scores = [];

//function getScores() {

//    scores.push(score);
//}

//function calculate() {
//    var total = 0;
//    var average = 0;
//    for (var i = 0; i < scores.length; i++) {
//        total += scores[i];
//    }
//    average = (total / scores.length).toFixed(2);
//}

//function showScores() {
//    return average;
//}

function ChooseTest(divId) {
    
    var x = document.getElementById('quizSelector');
    var y = x.options[x.selectedIndex].value;
    var z = x.options[x.selectedIndex].text;
    var div = document.getElementById(divId);
    var quizName;


    if (y == "1") {

        if (div.style.display == "none") {
            div.style.display = "block";
        }

        fillDB();
        
        quizName = document.getElementById('quiz-name');
        quizName.innerHTML = z;
    }
    else if (y == "2") {

        if (div.style.display == "none") {
            div.style.display = "block";
        }

        fillDB2();

        quizName = document.getElementById('quiz-name');
        quizName.innerHTML = z;
    }
    else if (y == "3") {

        if (div.style.display == "none") {
            div.style.display = "block";
        }

        fillDB3();
        quizName = document.getElementById('quiz-name');
        quizName.innerHTML = z;
    }

}

	
    //fillDB();
    

function fillDB(){
  
        $.getJSON('/activity.json', function (data) {

            for (i = 0; i < data.quizlist.length; i++) {
                questionBank[i] = new Array;
                questionBank[i][0] = data.quizlist[i].question;
                questionBank[i][1] = data.quizlist[i].option1;
                questionBank[i][2] = data.quizlist[i].option2;
                questionBank[i][3] = data.quizlist[i].option3;
            }
            numberOfQuestions = questionBank.length;

            displayQuestion();
        })//gtjson

}

function fillDB2() {

    $.getJSON('/activity2.json', function (data) {

        for (i = 0; i < data.quizlist.length; i++) {
            questionBank[i] = new Array;
            questionBank[i][0] = data.quizlist[i].question;
            questionBank[i][1] = data.quizlist[i].option1;
            questionBank[i][2] = data.quizlist[i].option2;
            questionBank[i][3] = data.quizlist[i].option3;
        }
        numberOfQuestions = questionBank.length;

        displayQuestion();
    })//gtjson

}

function fillDB3() {

    $.getJSON('/activity3.json', function (data) {

        for (i = 0; i < data.quizlist.length; i++) {
            questionBank[i] = new Array;
            questionBank[i][0] = data.quizlist[i].question;
            questionBank[i][1] = data.quizlist[i].option1;
            questionBank[i][2] = data.quizlist[i].option2;
            questionBank[i][3] = data.quizlist[i].option3;
        }
        numberOfQuestions = questionBank.length;

        displayQuestion();
    })//gtjson

}



    function displayQuestion() {
        var rnd = Math.random() * 3;
        rnd = Math.ceil(rnd);
        var q1;
        var q2;
        var q3;

        if (rnd == 1) { q1 = questionBank[questionNumber][1]; q2 = questionBank[questionNumber][2]; q3 = questionBank[questionNumber][3]; }
        if (rnd == 2) { q2 = questionBank[questionNumber][1]; q3 = questionBank[questionNumber][2]; q1 = questionBank[questionNumber][3]; }
        if (rnd == 3) { q3 = questionBank[questionNumber][1]; q1 = questionBank[questionNumber][2]; q2 = questionBank[questionNumber][3]; }

        $(stage).append('<div  class="questionText">' + questionBank[questionNumber][0] + '</div><div id="1" class="pix"><img src="/img/' + q1 + '"></div><div id="2" class="pix"><img src="/img/' + q2 + '"></div><div id="3" class="pix"><img src="/img/' + q3 + '"></div>');

        $('.pix').click(function () {
            if (questionLock == false) {
                questionLock = true;
                //correct answer
                if (this.id == rnd) {
                    $(stage).append('<div class="feedback1">CORRECT</div>');
                    score++;
                }
                //wrong answer	
                if (this.id != rnd) {
                    $(stage).append('<div class="feedback2">WRONG</div>');
                }
                setTimeout(function () { changeQuestion() }, 1000);
            }
        })
    }//display question


	
	
	
	function changeQuestion(){
		
		questionNumber++;
	
	if(stage=="#game1"){stage2="#game1";stage="#game2";}
		else{stage2="#game2";stage="#game1";}
	
	if(questionNumber<numberOfQuestions){displayQuestion();}else{displayFinalSlide();}
	
	 $(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
	 $(stage).animate({"right": "+=800px"},"slow", function() {questionLock=false;});
	}//change question
	

	
	function displayFinalSlide(){
		
		$(stage).append('<div class="questionText">You have finished the quiz!<br><br>Total questions: '+numberOfQuestions+'<br>Correct answers: '+score+'</div>');

        $(stage).append(
            $('<button/>', {
                text: 'Save Score',
                id: 'btnSave',
                class: 'btn',
                click: function () {
                    var yourscore = { Score: score }

                    $.ajax({
                        type: "POST",
                        url: "/TestScores/SaveScore",
                        data: JSON.stringify(yourscore),
                        contentType: "application/json; charset=utf-8",
                        //success: function (data) {
                        //    //alert("your score: " + data);
                        //    ShowQuizName();
                        //},
                        //error: function (result) {
                        //    alert("Something Went Wrong");
                        //}
                    });

                }
            })
        );

	}//display final slide
	
	
	
	
	

//function ShowQuizName() {
//    var x = document.getElementById('quizSelector');
//    var y = x.options[x.selectedIndex].value;
//    var z = x.options[x.selectedIndex].text;
//    var quizName;

//    if (y == "1") {
//        quizName = document.getElementById('quiz-name');
//        quizName.innerHTML = z;
//    }
//    else if (y == "2") {
//        quizName = document.getElementById('quiz-name');
//        quizName.innerHTML = z;
//    }
//    else if (y == "3") {
//        quizName = document.getElementById('quiz-name');
//        quizName.innerHTML = z;
//    }
//}
