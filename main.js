'use strict';

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');

    const quizSet = [
        {q: '世界で一番大きな湖は?', c: ['カスピ海', 'カリブ海', '琵琶湖']},
        {q: '2の8乗は?', c: ['256', '64', '1024']},
        {q: '次のうち最初にリリースされた言語は?', c: ['Python', 'PHP', 'C#']},
    ];
    let currentNum = 0;
    let isAnswered;
    let score =0;

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
    return arr;
    }

    function checkAnswer(li) {
        // if (isAnswered === true){
        if (isAnswered){
            return;
        }
        isAnswered = true;

        if (li.textContent === quizSet[currentNum].c[0]) {
            // console.log('correct');
            li.classList.add('correct');
            score++;
        } else {
            li.classList.add('wrong');
        }
        // 回答後、「Next」ボタンを押せるようにする
        btn.classList.remove('disabled');
    }

    function setQuiz() {
        isAnswered = false;
        question.textContent = quizSet[currentNum].q;

        // choicesの最初の子要素を消す
        while(choices.firstChild){
            choices.removeChild(choices.firstChild);
        }

        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            });
            choices.appendChild(li);
        });

        // 最後の問題のボタンは「Show Score」と表示する
        if(currentNum === quizSet.length -1){
            btn.textContent = 'Show Score';
        }
    }

    setQuiz();

    // 「Next」ボタン押下後、次の問題を表示させる
    btn.addEventListener('click', () => {

        if(btn.classList.contains('disabled')){
            return;
        }
        btn.classList.add('disabled');

        if(currentNum === quizSet.length -1){
            scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
            result.classList.remove('hidden');
        }else{
            currentNum++;
            setQuiz();
        }
    });
}