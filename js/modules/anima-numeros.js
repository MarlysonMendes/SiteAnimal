export default function initAnimaNumeros() {
  function animaNumeros() {
    //pega todos os numeros com o dataset data-numero
    const numeros = document.querySelectorAll('[data-numero]');
    //faz a ação para todos os numeros
    numeros.forEach((numero) => {
      //pega o texto na tag e tarnsforma em int com o uso do +
      const total = +numero.innerText;
      //constante de incremento variando de acordo com valor e fazendo aproximação para int
      const inscremento = Math.floor(total / 100);
      //começa em zero
      let start = 0;
      // intervalo de acrecimo a cada tempo ele acrecenda
      const timer = setInterval(() => {
        //acrecentando
        start = start + inscremento;
        // pasando para html o novo valor
        numero.innerText = start;
        //quando chega o total set para o valor total para que n passe e paro o tempo
        if(start > total) {
          numero.innerText = total;
          clearInterval(timer);
        }
      }, 25 * Math.random());
    });
  }
  
  //rever essa parte
  function handleMutation(mutation) {
   if(mutation[0].target.classList.contains('ativo')) {
    observer.disconnect();
    animaNumeros();
   }
  }
  
  const observerTarget = document.querySelector('.numeros');
  const observer = new MutationObserver(handleMutation);
  
  observer.observe(observerTarget, {attributes: true});
}