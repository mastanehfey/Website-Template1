var newsletterBtn = document.querySelector('.newsletter-btn');

newsletterBtn.addEventListener('click',validatenewsletter);
function validatenewsletter(){
    let email = document.querySelector('.email-newsletter').value;
    let errorMsg = document.querySelector('.error-message');
    
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }
    errorMsg.classList.remove('hidden');
    return (false)
    
}