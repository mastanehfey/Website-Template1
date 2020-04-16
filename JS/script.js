var upBtn = document.querySelector('.up-button');
var menuSection = document.querySelector('.menu-section');
var headerHeight = document.getElementById('header').offsetHeight;

window.addEventListener('scroll', (e)=> {
    moveUpBtn(e);
    menuSticky(e);    
    console.log(window.innerWidth);
    
});
//adjust up btn at the buttom of the page while scrolling
function moveUpBtn(e){
    let scrolTop = e.target.documentElement.scrollTop;
    let clientHeight = e.target.documentElement.clientHeight;
    upBtn.style.top = (clientHeight + scrolTop - 65) + 'px';
}
//menu sticky to the top
function menuSticky(e){
    let scrollFromTop = e.target.documentElement.scrollTop;
    
    if (scrollFromTop >= 400) {
        menuSection.classList.add('sticky');
        document.getElementById('home').style.paddingTop = '63px';
    }
    else if(scrollFromTop < 400) {
        menuSection.classList.remove('sticky');
        document.getElementById('home').style.paddingTop = 0;
    }
}

//smooth scroll on menu click
var menuItems = document.querySelectorAll('.menu-item-js');
menuItems.forEach(item => {
    item.addEventListener('click', function (e) {
        let link = e.target.dataset.link;
        
        
        menuItems.forEach(element => element.classList.remove('active'));
        if (link == 'apply-header') {
            link = 'apply-now';
            document.querySelector('#apply-link').classList.add('active');
        } 
        else if (link != 'apply-header'){
        item.classList.add('active');
        }
        scrollToSection(link);
    })
})

function scrollToSection(id) {
    let sectionTop = document.getElementById(id).offsetTop;
    let menuHeight = menuSection.getBoundingClientRect().height;

    if(id == 'home'){
        document.documentElement.scrollTop = headerHeight;
    }
    else{
        document.documentElement.scrollTop = sectionTop - menuHeight;        
    }
}
