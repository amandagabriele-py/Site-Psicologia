document.addEventListener('DOMContentLoaded', () => {

  /* 1) ANIMAÇÃO "APARECER AO ROLAR A PÁGINA */
  const elementosParaRevelar = document.querySelectorAll('.efeito-revelar');

  const observadorDeIntersecao = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('esta-visivel');
        observadorDeIntersecao.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  elementosParaRevelar.forEach((elemento) => observadorDeIntersecao.observe(elemento));


  /* 2) CARROSSEL*/
  const dadosDoCarrossel = [
    {
      icone: '<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
      titulo: 'Escuta qualificada',
      texto: 'Um espaço de escuta profissional, cuidadosa e direcionada para compreender sua história e suas demandas.'
    },
    {
      icone: '<svg viewBox="0 0 24 24"><path d="M11 2 3 6v6c0 5 4 8 8 10 4-2 8-5 8-10V6l-8-4z"/></svg>',
      titulo: 'Acolhimento sem julgamento',
      texto: 'Um ambiente seguro para falar sobre o que pesa, sem precisar performar força ou perfeição.'
    },
    {
      icone: '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
      titulo: 'Sigilo profissional',
      texto: 'Atendimento conduzido com ética, responsabilidade e respeito ao sigilo da prática psicológica.'
    },
    {
      icone: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>',
      titulo: 'Cuidado ético',
      texto: 'Um processo conduzido com responsabilidade clínica, clareza e compromisso com a sua saúde mental.'
    },
    {
      icone: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
      titulo: 'Processo personalizado',
      texto: 'Cada acompanhamento é construído considerando sua história, seu momento e suas necessidades.'
    },
    {
      icone: '<svg viewBox="0 0 24 24"><path d="M12 20c4-2 8-5 8-10a4.5 4.5 0 0 0-8-2.8A4.5 4.5 0 0 0 4 10c0 5 4 8 8 10z"/></svg>',
      titulo: 'Construção de autonomia emocional',
      texto: 'Um caminho para reconhecer padrões, fortalecer limites e fazer escolhas mais conscientes.'
    }
  ];

  const trilhoDoCarrossel = document.getElementById('carrosselTrilho');
  const conteinerIndicadores = document.getElementById('carrosselIndicadores');

  if (trilhoDoCarrossel && conteinerIndicadores) {
    let indiceAtual = 0;

    // indicadores do carrossel

    dadosDoCarrossel.forEach((item, indice) => {
      const cartao = document.createElement('div');
      cartao.className = 'carrossel-cartao' + (indice === 0 ? ' ativo' : '');
      cartao.innerHTML = `<div class="carrossel-icone">${item.icone}</div><h3>${item.titulo}</h3><p>${item.texto}</p>`;
      trilhoDoCarrossel.appendChild(cartao);

      const indicador = document.createElement('div');
      indicador.className = 'carrossel-ponto' + (indice === 0 ? ' ativo' : '');
      indicador.addEventListener('click', () => irParaSlide(indice));
      conteinerIndicadores.appendChild(indicador);
    });

    const listaCartoes = trilhoDoCarrossel.querySelectorAll('.carrossel-cartao');
    const listaIndicadores = conteinerIndicadores.querySelectorAll('.carrossel-ponto');

    function irParaSlide(novoIndice) {
      listaCartoes[indiceAtual].classList.remove('ativo');
      listaIndicadores[indiceAtual].classList.remove('ativo');

      indiceAtual = (novoIndice + listaCartoes.length) % listaCartoes.length;

      listaCartoes[indiceAtual].classList.add('ativo');
      listaIndicadores[indiceAtual].classList.add('ativo');
    }

    const botaoAnterior = document.getElementById('carrosselAnterior');
    const botaoProximo = document.getElementById('carrosselProximo');

    if (botaoAnterior) botaoAnterior.addEventListener('click', () => irParaSlide(indiceAtual - 1));
    if (botaoProximo) botaoProximo.addEventListener('click', () => irParaSlide(indiceAtual + 1));

    // Troca automática a cada 6 segundos
    let reproducaoAutomatica = setInterval(() => irParaSlide(indiceAtual + 1), 6000);

    const conteinerCarrossel = document.querySelector('.carrossel-container');
    if (conteinerCarrossel) {
      conteinerCarrossel.addEventListener('mouseenter', () => clearInterval(reproducaoAutomatica));
    }
  }


  /* 3) FORMULÁRIO */
  const numeroWhatsApp = '5511962099113';
  const formularioContato = document.getElementById('formularioContato');

  if (formularioContato) {
    formularioContato.addEventListener('submit', function (evento) {
      evento.preventDefault();

      const nome = document.getElementById('campoNome').value.trim();
      const mensagem = document.getElementById('campoMensagem').value.trim();

      const textoFinal = `Olá! Meu nome é ${nome}.\n${mensagem}`;
      const textoCodificado = encodeURIComponent(textoFinal);
      const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;

      window.open(linkWhatsApp, '_blank');
      formularioContato.reset();
    });
  }

});