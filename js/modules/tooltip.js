//Notar como ele divide a func ddo evento onMouseOver em menos para respeitar o cleancode
//ele chega a criar objetos para que eu posso no escopo geral para que eu não tenha que fazer
// as funções de mousemove e mouseleave dentro da func de mouseOver

export default function initTooltip() {
  const tooltips = document.querySelectorAll('[data-tooltip]');

  tooltips.forEach((item) => {
    item.addEventListener('mouseover', onMouseOver);
  })

  function onMouseOver(event) {
    //estou criando minha tooltipbox
    const tooltipBox = criarTooltipBox(this);
    //estou criando o atributo tooltipBox no meu objeto onMouseMove
    onMouseMove.tooltipBox = tooltipBox;

    //estou adicionando o evento mouseMove no mesmo elemento onde
    //foi adicionado o evento mouseOver para que tooltrip se mexa
    this.addEventListener('mousemove', onMouseMove);
    
    //estou criando o atributo tooltipBox no meu objeto onMouseLeave
    onMouseLeave.tooltipBox = tooltipBox;
    //estou criando um element no mouseleave e passando o elemento onde a tooltrip foi criada
    onMouseLeave.element = this;
    this.addEventListener('mouseleave', onMouseLeave);
  }

  const onMouseLeave = {
    handleEvent() {
      this.tooltipBox.remove();
      this.element.removeEventListener('mouseleave', onMouseLeave);
      this.element.removeEventListener('mousemove', onMouseMove);
    }
  }

  const onMouseMove = {
    handleEvent(event) {
      this.tooltipBox.style.top = event.pageY + 20 + 'px';
      this.tooltipBox.style.left = event.pageX + 20 + 'px';
    }
  }

  //Para criar eu fiz a div depois procurei no meu html o texto dela
  // Adicionei um classe para linkar o meu css
  // inserir o texto nela e coloquei ela dentro do body do meu html
  // esse element é o elemento em que eu criei o evento que eu estou passando com o this
  // na function event onMouseOver
  function criarTooltipBox(element) {
    const tooltipBox = document.createElement('div');
    const text = element.getAttribute('aria-label');
    tooltipBox.classList.add('tooltip');
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    return tooltipBox;
  }
}

