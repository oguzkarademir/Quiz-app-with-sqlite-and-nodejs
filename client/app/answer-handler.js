async function answer() {

    const response = await fetch('http://localhost:8080/api/tracks')
    
    const data = await response.json();

    return data;
}

export const answerHandler = (event) => {
    event.preventDefault();

    const userTarget = event.target;
    const track = event.path[2].children[1].children[0].innerText;
    let correctAnswer = '';

    const answer1 = document.getElementById('answ-1');
    const answer2 = document.getElementById('answ-2');
    const answer3 = document.getElementById('answ-3');
    const answer4 = document.getElementById('answ-4');

    const answers = [answer1, answer2, answer3, answer4];

    answer().then(data => {

        for (let i = 0; i<data.length; i++){
            if(data[i].Name === track){
                correctAnswer = data[i].Composer;
            }
        }

        const resultText = document.getElementById('result-text');

        if (userTarget.innerText === correctAnswer){
            userTarget.classList.add('right');
            document.getElementById('answer-buttons').classList.add('disable');
            resultText.classList.remove('hide');
            resultText.innerHTML = 'Correct !';
            resultText.style.fontSize = '40px';
            resultText.style.color = 'green';

            document.getElementById('score-answers').innerHTML ++ ;

        } else {
            userTarget.classList.add('wrong');
            document.getElementById('answer-buttons').classList.add('disable')
            resultText.classList.remove('hide');
            resultText.innerHTML = 'Uncorrect !';
            resultText.style.fontSize = '40px';
            resultText.style.color = 'red';
        }
    })
}