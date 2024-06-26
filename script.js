// -- Global -- 

const MAX_CHARS = 150;
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api';

const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn');
const spinnerEl = document.querySelector('.spinner');

const renderFeedbackItem = feedbackItem => {
    // new feedback item html
    const feedbackItemHtml =
        `<li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${feedbackItem.upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${feedbackItem.company}</p>
                <p class="feedback__text">${feedbackItem.text}</p>
            </div>
            <p class="feedback__date">${feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
        </li>`;


    //insert new feedback item in list
    // feedbackListEl.insertAdjacentHTML('beforebegin', feedbackItemHtml);
    feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHtml);

}

// -- Counter Component -- 

const inputHandler = () => {
    // maximum number of characters 
    const maxNrChars = MAX_CHARS;
    // number of characters left
    const nrCharsType = textareaEl.value.length

    const charsLeft = maxNrChars - nrCharsType
    counterEl.textContent = charsLeft;

};

textareaEl.addEventListener('input', inputHandler);


// -- Form Component -- 


const showVisualIndicator = textCheck => {
    const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';

    //show vaild indicator
    formEl.classList.add(className);

    //remove visual indicator
    setTimeout(() => {
        formEl.classList.remove(className);
    }, 2000)

};


const submitHandler = (event) => {

    //prevent default browser action ( submitting from data to 'action' -address and refreshing page)
    event.preventDefault();
    const text = textareaEl.value;

    //validate text(check length of text and #hashtag is present)
    if (text.includes('#') && text.length > 4) {
        showVisualIndicator('valid');

    } else {
        showVisualIndicator('invalid');

        //focus textarea
        textareaEl.focus();
        return;
    }


    //extract info from user input text
    const hashtag = text.split(' ').find(word => word.includes('#'));
    const company = hashtag.substring(1);
    const badgeLetter = company.substring(0, 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;


    //feedback item object
    const feedbackItem = {
        upvoteCount: upvoteCount,
        company: company,
        badgeLetter: badgeLetter,
        daysAgo: daysAgo,
        text: text,
    }

    //render feedback item
    renderFeedbackItem(feedbackItem);

    fetch(`${BASE_API_URL}/feedbacks`, {
            method: 'POST',
            body: JSON.stringify(feedbackItem),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(!response.ok){
                console.log('Something went wrong');
                return;
            }
            console.log('Successfully submitted');
        }).catch(error => console.log(error));

    //clear textarea
    textareaEl.value = '';

    //blur submit button
    submitBtnEl.blur();

    //reset counter
    counterEl.textContent = MAX_CHARS;
}

formEl.addEventListener('submit', submitHandler);


fetch(`${BASE_API_URL}/feedbacks`)
    .then(response => response.json())
    .then(data => {

        //remove spinner 
        spinnerEl.remove();

        // iterate over each element in feedbacks array and render it in list
        data.feedbacks.forEach(feedbackItem => {
            renderFeedbackItem(feedbackItem);
        });

    })
    .catch(error => {
        feedbackListEl.textContent = `Failed to Fetch feedback iterms. Error message ${error.message}`;
    })

