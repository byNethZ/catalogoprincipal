document.addEventListener('DOMContentLoaded', function(){
    sharingUrl();

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