function legacyCopy(txt){
  try{
    var ta=document.createElement('textarea');
    ta.value=txt; ta.setAttribute('readonly','');
    ta.style.position='fixed'; ta.style.top='-1000px'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    var ok=document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }catch(e){ return false; }
}
function copyText(txt){
  if(navigator.clipboard && window.isSecureContext){
    return navigator.clipboard.writeText(txt).catch(function(){
      return legacyCopy(txt) ? Promise.resolve() : Promise.reject();
    });
  }
  return legacyCopy(txt) ? Promise.resolve() : Promise.reject();
}
function flash(btn){
  var old=btn.getAttribute('data-label')||btn.textContent;
  btn.setAttribute('data-label',old);
  btn.textContent='Kopiert \u2713'; btn.classList.add('done');
  setTimeout(function(){ btn.textContent=old; btn.classList.remove('done'); },1600);
}
document.addEventListener('click',function(e){
  var b=e.target.closest('[data-copy]');
  if(b){
    var code=b.parentElement.querySelector('code');
    var txt=code?code.innerText:'';
    copyText(txt).then(function(){ flash(b); }).catch(function(){
      var lbl=b.getAttribute('data-label')||b.textContent;
      b.setAttribute('data-label',lbl);
      b.textContent='Bitte manuell markieren';
      setTimeout(function(){ b.textContent=lbl; },2000);
    });
  }
  var bg=e.target.closest('[data-burger]');
  if(bg){ document.querySelector('[data-nav]').classList.toggle('open'); }
});