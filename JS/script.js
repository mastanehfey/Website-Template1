var upBtn = document.querySelector('.up-button');
var menuSection = document.querySelector('.menu-section');
window.addEventListener('scroll', (e)=> {
    moveUpBtn(e);
    menuSticky(e);
    // console.log(e);
    
});
//adjust up btn at th ebuttom of the page while scrolling
function moveUpBtn(e){
    let scrolTop = e.target.documentElement.scrollTop;
    let clientHeight = e.target.documentElement.clientHeight;
    upBtn.style.top = (clientHeight + scrolTop - 65) + 'px';
}
//menu sticky to the top
function menuSticky(e){
    let scrollFromTop = e.target.documentElement.scrollTop;

    if(scrollFromTop>=400){
        menuSection.classList.add('sticky');
    }
    else if(scrollFromTop < 400) {
        menuSection.classList.remove('sticky');
    }
    
}

//smooth scroll on menu click
var menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', function (e) {
        menuItems.forEach(element => element.classList.remove('active'));
        item.classList.add('active');
        let target = e.target.innerText;
        scrollToSection(target);
    })
})

function scrollToSection(target){
    console.log(document.getElementById(target).offsetTop);
    
    let section = document.getElementById(target).offsetTop;
    let menuHeight = menuSection.getBoundingClientRect().height;
    document.documentElement.scrollTop = section - menuHeight;
}
