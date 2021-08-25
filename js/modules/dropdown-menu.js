import outsideClick from './outsideclick.js';

export default function initDropdownMenu() {
  //procuro por todos os itens que possuem dropdown
  const dropdownMenus = document.querySelectorAll('[data-dropdown]');
  //adiciono os eventos touchstart e click nos dropdownmenu
  dropdownMenus.forEach(menu => {
    ['touchstart', 'click'].forEach(userEvent => {
      menu.addEventListener(userEvent, handleClick);
    });
  });

  function handleClick(event) {
    //evito o funcionamento padrão abrir a pagina quando clicko
    event.preventDefault();
    //o this é quem disparou o evento eu adiciono a classe active para aparecer o menu
    this.classList.add('active');
    //funcao que remove o menu quando clicko do lado de de fora
    outsideClick(this, ['touchstart', 'click'], () => {
      this.classList.remove('active');
    });
  };
}