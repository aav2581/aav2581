(() => {
    const cardsList = document.querySelector('.card-list');
    const restartButton = document.querySelector('.restart-button');
    const form = document.querySelector('form');
    const gorizontValue = document.querySelector('.select-gorizont');
    const verticalValue = document.querySelector('.select-vertical');
    const startNoTimerBtn = document.querySelector('.no-timer');
    const startTimerBtn = document.querySelector('.timer');
    const modal = document.querySelector('.start-container');
    const timerDiv = document.createElement('div');
    let restart;

    function createCardsNumber(number) {
        const arr = [];

        for (let i = 1; i < ((number + 1) / 2); i++) {
            arr.push(i);
            arr.push(i);
        }

        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;
    }

    function createCards(number, gorizont) {
        
        cardsList.style.gridTemplateColumns = `repeat(${gorizont}, minmax(50px,  1fr))`;
        for (let i = 0; i < number; i++) {
            const card = document.createElement('li');
            const cardNumber = document.createElement('span');
            cardsList.append(card);
            card.append(cardNumber);
            card.setAttribute('data-check', 'false');
            card.classList.add('card');
            cardNumber.classList.add('card-number');
            cardNumber.style.display = 'none';
        }
    }

    function addCardsNumber(number, cardsArr) {
        let cardsNumber = createCardsNumber(number);

        for (let i = 0; i < number; i++) {
            cardsArr[i].setAttribute('data-id', cardsNumber[i]);
            cardsArr[i].firstChild.innerHTML = cardsNumber[i];
        }
    }

    function checkCard(number, cardsArr) {

        let count = '';
        let trueCards = 0;

        for (let card of cardsArr) {
            card.addEventListener('click', () => {
                if (card.dataset.check === 'check') {
                    card.classList.add('error');
                } else if (card.dataset.check === 'false') {
                    card.dataset.check = 'check';
                    card.classList.add('card--check');
                    card.firstChild.style.display = 'block';

                    if (count === '') {
                        count = card.dataset.id;
                    } else if (count === card.dataset.id) {
                        count = '';
                        fixTrueCard(cardsArr);
                        trueCards += 2;
                    } else if (count !== card.dataset.id) {
                        count = '';
                        setTimeout(() => removeCheck(cardsArr), 500);
                    }
                }
                setTimeout(() => addRestartButton(trueCards, number), 400);  
            })
        }
    }

    function fixTrueCard(cardsArr) {

        for (let card of cardsArr) {
            if (card.dataset.check === 'check') {
                card.dataset.check = 'true';
                card.classList.add('card--true');
                card.classList.remove('card--check');
                card.classList.remove('error');
                card.firstChild.style.display = 'block';
            }
        }
    }

    function removeCheck(cardsArr) {
        for (let card of cardsArr) {
            if (card.dataset.check === 'check') {
                card.dataset.check = 'false';
                card.classList.remove('error');
                card.classList.remove('card--check');
                card.firstChild.style.display = 'none';
            }
        }
    }

    function addRestartButton(trueCards, number) {
        if (trueCards === number) {
            restartButton.style.display = 'block';
            timerDiv.dataset.time = 'stop';
        }
    }

    function restartGame() {
        cardsList.innerHTML = '';
        restartButton.style.display = 'none';
        modal.style.display = 'flex';
        timerDiv.dataset.time = 'stop';
    }

    function startGameNoTimer(number, gorizont) {
        modal.style.display = 'none';

        createCards(number, gorizont);

        const allCards = Array.from(document.querySelectorAll('.card'));
        addCardsNumber(number, allCards);
        checkCard(number, allCards);
    }

    function timer() {
        
        const timerIner = setInterval(getCount, 1000); 
        let count = 60;
        
        cardsList.append(timerDiv);
        timerDiv.classList.add('timer-div');
        timerDiv.style.display = 'block';
        timerDiv.setAttribute('data-time', 'start');
        timerDiv.innerHTML = count;
        
        function getCount() {
            count -= 1;
            timerDiv.innerHTML = count;

            if (count === 0 || timerDiv.dataset.time == 'stop') {
                clearInterval(timerIner);
                clearTimeout(restart);
                restart = null;
            }
        }
        timerIner;
    }    
    
    document.addEventListener('DOMContentLoaded', () => {
        
        let number = 16;
        let gorizont = 4;
        let vertical = 4;

        form.addEventListener('input', () => {
            gorizont = gorizontValue.value;
            vertical = verticalValue.value;
            
            number = gorizont * vertical;
            return number, gorizont;
        })
        
        startNoTimerBtn.addEventListener('click', () => {
            startGameNoTimer(number, gorizont);
            clearTimeout(restart);
            restart = null;
        });
        startTimerBtn.addEventListener('click', () => { 
            startGameNoTimer(number, gorizont);
            clearTimeout(restart);
            restart = null;
            timer();
            restart = setTimeout(restartGame, 59000);
        });

        restartButton.addEventListener('click', restartGame);        
    })
})()