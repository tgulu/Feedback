// -- Global
const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');

// -- Counter Component -- 

const inputHandler = () => {
    // maximum number of characters 
    const maxNrChars = 150;
    // number of characters left
    const nrCharsType = textareaEl.value.length

    const charsLeft = maxNrChars - nrCharsType
    counterEl.textContent = charsLeft;

};

textareaEl.addEventListener('input', inputHandler);


// -- Form Component -- 


const submitHandler = (event) => {
    //prevent default browser action ( submitting from data to 'action' -address and refreshing page)

    event.preventDefault();
    const text = textareaEl.value;

    //validate text(check length of text and #hashtag is present)

    if (text.includes('#') && text.length > 4) {
        //show vaild indicator
        formEl.classList.add('form--valid');

        //remove visual indicator
        setTimeout(() => {
            formEl.classList.remove('form--valid')
        }, 2000)
    } else {
        //show invaild indicator
        formEl.classList.add('form--invalid');

        //remove visual indicator
        setTimeout(() => {
            formEl.classList.remove('form--invalid')
        }, 2000)

        textareaEl.focus();

        return;

    }


    //extract info from user input text
    const hashtag = text.split().find(word => word.includes('#'));
    const company = hashtag.substring(1);
    const badgeLetter = company.substring(0, 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;

    // new feedback item html

    const feedbackItemHtml = 
    `<li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">245</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">B</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">bernardcompany</p>
            <p class="feedback__text">hi #bernardcompany i like your clothes but not the website, please improve it</p>
        </div>
        <p class="feedback__date">2d</p>
    </li>`;


}

formEl.addEventListener('submit', submitHandler);
