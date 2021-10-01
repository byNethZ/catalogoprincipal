document.addEventListener('DOMContentLoaded', function(){
    sharingUrl();
    initSW();
});

function sharingUrl(){
    if(navigator.share){
        document.querySelectorAll('a.sharing').forEach(el=>{
            el.addEventListener('click', (ev)=>{
                ev.preventDefault();
                const url = ev.target.parentElement.href;

                navigator.share({
                    url: url
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