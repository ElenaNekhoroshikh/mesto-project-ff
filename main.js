(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{T:()=>u});function t(e,t,n,o){var r=u.querySelector(".places__item").cloneNode(!0),c=r.querySelector(".card__image"),p=r.querySelector(".card__title"),a=r.querySelector(".card__delete-button"),d=r.querySelector(".card__like-button");return p.textContent=e.name,c.src=e.link,c.alt="Фотография с места - "+e.name,a.addEventListener("click",t),d.addEventListener("click",n),c.addEventListener("click",(function(){o(e.link,e.name)})),r}function n(e){e.target.closest(".places__item").remove()}function o(e){e.target.closest(".card").querySelector(".card__like-button").classList.toggle("card__like-button_is-active")}function r(e){e.classList.add("popup_is-opened"),e.classList.add("popup_is-animated"),document.addEventListener("keydown",p)}function c(e){e.classList.remove("popup_is-opened"),e.classList.add("popup_is-animated"),document.removeEventListener("keydown",p)}function p(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}var a,d=document.querySelector(".places__list"),u=document.querySelector("#card-template").content,i=document.forms["new-place"],s=i.querySelector(".popup__input_type_card-name"),l=i.querySelector(".popup__input_type_url"),_=document.querySelectorAll(".popup"),m=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_new-card"),f=document.querySelector(".popup_type_image"),v=document.querySelector(".profile__edit-button"),k=document.querySelector(".profile__add-button"),q=document.querySelector(".popup__image"),S=document.querySelector(".popup__caption"),g=document.querySelector(".profile__title"),L=document.querySelector(".profile__description"),h=document.forms["edit-profile"],b=h.querySelector(".popup__input_type_name"),E=h.querySelector(".popup__input_type_description");function x(){b.value=g.textContent,E.value=L.textContent}function C(e,t){q.src=e,q.alt=t,S.textContent=t,r(f)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var r=t(e,n,o,C);d.appendChild(r)})),v.addEventListener("click",(function(){x(),r(m)})),x(),h.addEventListener("submit",(function(e){e.preventDefault(),g.textContent=b.value,L.textContent=E.value,c(m),h.reset()})),i.addEventListener("submit",(function(e){e.preventDefault();var r=t({name:s.value,link:l.value},n,o);d.insertBefore(r,d.firstChild),i.reset(),c(y)})),a=y,k.addEventListener("click",(function(){r(a)})),_.forEach((function(e){e.addEventListener("click",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close"))&&c(e)}))})),document.getElementById("year").textContent=(new Date).getFullYear()})();
//# sourceMappingURL=main.js.map