let deferredPrompt;
let btnAdd = document.querySelector('#install');
let btnHide = document.querySelector('#luego');
let cardInstall = document.querySelector('.cardInstall')
let bgCard = document.querySelector('.bgDark')

document.addEventListener('DOMContentLoaded', function(){
    sharingUrl();
    initSW();
    savePrompt();
    if (!window.matchMedia('(display-mode: fullscreen)').matches) {
        showCardInstall();
      }
});

function sharingUrl(){
    if(navigator.share){
        document.querySelectorAll('a.sharing').forEach(el=>{
            el.addEventListener('click', (ev)=>{
                ev.preventDefault();
                const url = ev.target.parentElement.href;

                navigator.share({
                    text: url
                });
                return false
            });
        });
    }else{
        document.querySelectorAll('a.sharing').forEach(el=>{
            el.addEventListener('click', (ev)=>{
                ev.preventDefault();
                const url = ev.target.parentElement.href;
                navigator.clipboard.writeText(url);
                return false;
            });
        });
    };
};

function initSW(){
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
          .then(reg => console.log('Registro de SW exitoso', reg))
          .catch(err => console.warn('Error al tratar de registrar el sw', err))
      }
}

function savePrompt(){
    window.addEventListener('beforeinstallprompt', (e)=>{
        e.preventDefault();
        deferredPrompt = e;
    });
    
    btnAdd.addEventListener('click', (e)=>{
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult)=>{
            if( choiceResult.outcome === 'accepted'){
                console.log('User accepted the A2HS prompt');
                window.open('https://cards-pwa-g.netlify.app/', '_blank'); 
            }
            deferredPrompt = null;
        });
    });
    
    window.addEventListener('appinstalled', (evt)=>{
        app.logEvent('a2hs', 'installed');
    });
}

function showCardInstall(){
    cardInstall.style.top = '20rem';
    bgCard.style.opacity = '0.7';
    bgCard.style.pointerEvents = 'unset';

    btnHide.addEventListener('click', hiddeCardInstall);
}

function hiddeCardInstall(){
    cardInstall.style.top = '-40rem';
    bgCard.style.opacity = '0';
    bgCard.style.pointerEvents = 'none';
}