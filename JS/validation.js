var error = '';
var submitBtns = document.querySelectorAll('.submit-btn');
submitBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
        validateForm(e);
    });
})

function validateForm(e){    
    e.preventDefault();
    let parentForm = e.target.closest('form');
    let elements = parentForm.elements;
    let successFailMessage = parentForm.querySelector('.success-message');
    
    let fieldsArray = [];
    //validate fields for all INPUT and TEXTAREAS of the form
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName == 'INPUT' || elements[i].tagName == 'TEXTAREA') {            
            fieldsArray.push(validateField(elements[i]));
        }
    }  
    //if all elements have right value submit success - send data to PHP , reset form
    if(fieldsArray.every(element=> element === true)){
        //send data to PHP with Success and Fail function
        $.ajax({
            url: "forms.php",
            type: "POST",
            data : {
                name: parentForm.elements['name'] ? parentForm.elements['name'].value : '',
                email: parentForm.elements['email'] ? parentForm.elements['email'].value : '',
                subject: parentForm.elements['subject'] ? parentForm.elements['subject'].value : '',
                message: parentForm.elements['message'] ? parentForm.elements['message'].value : ''
            },
            cache: false,
            statusCode: {
                200: function() {
                  console.log("Success (200)");
                  submitSuccess(successFailMessage);                  
                //Reset Form
                for (let i = 0; i < elements.length; i++) {
                    elements[i].value = '';
                } 
                },
                500: function() {
                    console.log("Internal Server Error (500)");
                    submitFail(successFailMessage)
                  },
                404: function() {
                    console.log("No content found (404)");
                    submitFail(successFailMessage)
                },
                500: function() {
                    console.log("Service Unavailable (503)");
                    submitFail(successFailMessage)
                }
              }
        })        
    }
}
function validateField(field){
    let errorBox = field.nextElementSibling;
    removeMessage(errorBox);

//check if field is required and empty should be filled out
if(field.required && field.value === ''){
    error = 'Please fill this field!';
    showErrorMessage( errorBox , error);
    return false;
}
//check the format of entered data for email
else if(field.dataset.type === 'email' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field.value))){
        error = 'Please enter right email address format'
        showErrorMessage(errorBox , error);
        return false;
    }
    else{
        return true;
    }
//show erroe message
    function showErrorMessage(errorBox , error){        
        errorBox.classList.remove('hidden');
        errorBox.textContent = error;
    }
    function removeMessage(errorBox){        
        errorBox.classList.add('hidden');
        errorBox.textContent = '';
    }
}

function submitSuccess(successFailMessage){
    if(successFailMessage){
        successFailMessage.innerHTML = '<strong>Your message has been sent. </strong>';
    }
}
function submitFail(successFailMessage){
    if(successFailMessage){
        successFailMessage.innerHTML = '<strong>Oops! Something went wrong.</strong>';
    }
}