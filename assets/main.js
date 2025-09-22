
document.addEventListener('DOMContentLoaded', () => {
  const PHONE_NUMBER = '+375336730947';
  const WA_NUMBER_INT = '375336730947';
  const EMAIL_TO = 'Oskal32@mail.ru';
  const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();

  const phoneEls = [document.getElementById('footerPhone'), document.getElementById('contactPhone')].filter(Boolean);
  phoneEls.forEach(el => { if(el) { el.href = `tel:${PHONE_NUMBER}`; el.textContent = PHONE_NUMBER; } });
  const waEls = [document.getElementById('footerWA'), document.getElementById('contactWA')].filter(Boolean);
  waEls.forEach(el => el && el.addEventListener('click', e => { e.preventDefault(); window.open(`https://wa.me/${WA_NUMBER_INT}`,'_blank'); }));

  function hook(id){
    const form = document.getElementById(id);
    if(!form) return;
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const fd = new FormData(form);
      const payload = {
        to: EMAIL_TO,
        name: fd.get('name')||'',
        phone: fd.get('phone')||'',
        service: fd.get('service')||'',
        date: fd.get('date')||'',
        msg: fd.get('msg')||''
      };
      try{
        const res = await fetch('/api/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
        const data = await res.json();
        if(res.ok){ alert('Заявка отправлена!'); form.reset(); } else { alert('Ошибка: '+(data.error||res.statusText)); }
      }catch(e){ alert('Сеть недоступна или сервер не запущен'); }
    });
  }
  hook('form-index'); hook('form-contacts');
});
