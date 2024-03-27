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

textareaEl.addEventListener('input',inputHandler);


// -- Form Component -- 


const submitHandler = (event) => {
    //prevent default browser action ( submitting from data to 'action' -address and refreshing page)

    event.preventDefault();
    const text = textareaEl.value;

    //validate text(check length of text and #hashtag is present)

    if(text.includes('#') && text.length > 4){
   //show vaild indicator
        formEl.classList.add('form--valid');

           //remove visual indicator
        setTimeout(()=>{
            formEl.classList.remove('form--valid')
        } ,2000)
    }else {
        //show invaild indicator
        formEl.classList.add('form--invalid');

         //remove visual indicator
        setTimeout(()=>{
            formEl.classList.remove('form--invalid')
        } ,2000)

        textareaEl.focus();

        return;

    }

    


}

formEl.addEventListener('submit', submitHandler);
