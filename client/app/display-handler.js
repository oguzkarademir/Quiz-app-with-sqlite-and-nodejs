async function display() {
  const response = await fetch('http://localhost:8080/api/tracks')
    
  const data = await response.json();

  return data;
}

export const displayHandler = (event) => {
  event.preventDefault();

  const tracks = [];
	const composers = [];
	
  const answer1 = document.getElementById('answ-1');
	const answer2 = document.getElementById('answ-2');
	const answer3 = document.getElementById('answ-3');
	const answer4 = document.getElementById('answ-4');

	const answers = [answer1, answer2, answer3, answer4];

	const handleRight = (id) => {
		document.getElementById(id).classList.add('right');
		document.getElementById('score-answers').innerHTML ++;
	}

	const handleWrong = (id, result) => {
		document.getElementById(id).classList.add('wrong');
		document.getElementById(result).classList.add('right');
	}

	const handleLogic = () => {
		display().then(data => {
		for(let i = 0; i < answers.length; i++) {
			if(answers[i].classList.contains('right')) {
				answers[i].classList.remove('right');
			}
			if(answers[i].classList.contains('wrong')) {
				answers[i].classList.remove('wrong');
			}
		}
		for (let i = 0; i < data.length; i++){
			tracks.push(data[i].Name)
			if(composers.indexOf(data[i].Composer) === -1){
				composers.push(data[i].Composer);
			}
		}
		let result = '';
		let track = tracks[Math.floor(Math.random()*tracks.length)];
		document.getElementById('track-name').innerHTML = track;
		
		for (let i = 0; i < data.length; i++){
			if(data[i].Name === track){
				result = answers[Math.floor(Math.random()*answers.length)]
				let answer = data[i].Composer;
				result.innerHTML = answer;

				const indexOfComposer = composers.indexOf(data[i].Composer)
				if(indexOfComposer > -1){
					composers.splice(indexOfComposer, 1)
				};

				const indexOfDom = answers.indexOf(result);
				if (indexOfDom > -1){
					answers.splice(indexOfDom, 1);
				};
			}				
		}
		document.getElementById(result.id).addEventListener('click', handleRight.bind(this, result.id));
			
		for (let i = 0; i < answers.length; i++){
			let composer = composers[Math.floor(Math.random()*composers.length)];
			answers[i].innerHTML = composer;
			const indexOfAnswer = composers.indexOf(composer);
			if(indexOfAnswer > -1){
				composers.splice(indexOfAnswer, 1)
			}
			answers[i].addEventListener('click', handleWrong.bind(this, answers[i].id, result.id));
		}
	}
)};

	if(event.target.innerHTML === "Start"){
		document.getElementById('start-btn').classList.add('hide');
		document.getElementById('question-container').classList.remove('hide');
		document.getElementById('next-btn').classList.remove('hide');
		document.getElementById('quest-num').innerHTML = 1;
		document.getElementById('result').classList.add('hide');
		handleLogic();
	};

	if(event.target.innerHTML === "Next question"){
		document.getElementById('quest-num').innerHTML ++;

		if (document.getElementById('quest-num').innerHTML == 11) {
			document.getElementById('question-container').classList.add('hide');
			document.getElementById('next-btn').classList.add('hide');
			document.getElementById('start-btn').classList.remove('hide');
			document.getElementById('result').classList.remove('hide');
			let score = document.getElementById('score-answers').innerHTML;
			document.getElementById('score-result').innerHTML = score;
		}
		handleLogic();
	};
};