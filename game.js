const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id:1,
    text: "¡Bienvenido a HERO'S DAWN!",
    options: [
      {
        text:'»',
        nextText:2,
      }
    ]
  },
  {
    id:2,
    text: "Eres un aventurero en busca de nuevas historias...",
    options: [
      {
        text: '»',
        nextText: 3
      }
    ]
  },
  {
    id:3,
    text: 'En tu última aventura quedaste casi en la ruina. Para lo último que te alcanzó fue para un bote que se dirigía hacia otra isla...',
    options: [
      {
        text: '»',
        nextText: 4
      }
    ]
  },
  {
    id:4,
    text: 'Es así como el Capitán Blake y tu se dirigen hacia tu próxima aventura...',
    options: [
      {
        text: '»',
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: 'Capitán Blake: ¿Estas despierto?, Holaa. Ah perfecto despertaste, bueno, hemos llegado.',
    options: [
      {
        text: '¿Tan rápido?',
        nextText: 6
      },
      {
        text:'¿Cuánto tiempo me dormí?',
        nextText:7
      }
    ]
  },
  {
    id: 6,
    text: 'Capitán Blake: Sí, al parecer llegamos antes de lo esperado.',
    options: [
      {
        text: '¿Pasó algo interesante?',
        nextText: 8
      },
      {
        text: 'Es bueno escucharlo',
        nextText: 9
      }
    ]
  },
  {
    id: 7,
    text: 'Capitán Blake: No lo sé, pero llegamos antes de lo esperado, sanos y salvos.',
    options: [
      {
        text: '¿Qué quieres decir con eso?',
        nextText: 8
      },
      {
        text: 'Me alegro',
        nextText: 9
      }
    ]
  },
  {
    id: 8,
    text: 'Capitán Blake: ¿No lo sentiste?',
    options: [
      {
        text: '¿Qué cosa?',
        nextText: 10
      },
      {
        text: 'No se de que estás hablando, dormí como un bebé',
        nextText: 10
      }
    ]
  },
  {
    id: 9,
    text: 'Capitán Blake: ¿Dormíste bien?',
    options: [
      {
        text: 'Sí, ¿por qué no debería?',
        nextText: 10
      },
      {
        text: '¿Pasó algo?',
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text: 'Capitán Blake: Hubo una tormenta anoche, ¿no la sentíste?.',
    options: [
      {
        text: 'Pues supongo que no',
        nextText: 11
      },
      {
        text: 'Yo pensé que era marea alta',
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: 'Capitán Blake: Lo bueno es que llegamos.',
    options: [
      {
        text: '¿Y lo malo?',
        nextText: 12
      },
      {
        text: 'Bueno me despido',
        nextText: 13
      }
    ]
  },
  {
    id: 12,
    text: 'Capitán Blake: Pues que mi barco apenas anda.',
    options: [
      {
        text: 'Lo siento',
        nextText: 13
      },
      {
        text: 'Al menos funciona',
        nextText: 14
      }
    ]
  },
  {
    id: 13,
    text: 'Capitán Blake: Espero y consigas lo que buscas.',
    options: [
      {
        text: 'Eso espero',
        nextText: 16
      },
      {
        text: 'Suerte en tu viaje',
        nextText: 15
      }
    ]
  },
  {
    id: 14,
    text: 'Capitán Blake: Jaja, es verdad.',
    options: [
      {
        text: 'Nos vemos',
        nextText: 16
      },
      {
        text: 'Suerte en tu viaje',
        nextText: 15
      }
    ]
  },
  {
    id: 15,
    text: 'Capitán Blake: Lo mismo digo',
    options: [
      {
        text: '*Continuar*',
        nextText: 16
      },
      {
        text: '*Pedir dinero al capitán*',
        setState: { coinCash: true},
        nextText: 16
      }
    ]
  },
  {
    id: 16,
    text: '*Llegas a una aldea desconocida, en la isla de "Nova Tera". Lo que no sabes, es que dentro de los próximos 10 días tu vida cambiará...*',
    options: [
      {
        text: '»',
        nextText: 17
      }
    ]
  },
  {
    id:17,
    text:'*Tratas de conseguir un lugar para pasar la noche y un poco de comida...*',
    options: [
      {
        text:'»',
        nextText:19
      },
      {
        text:'*Comprar comida y agua*',
        requiredState: (currentState) => currentState.coinCash,
        nextText:18
      }
    ]
  },
  {
    id:18,
    text:'*Pero no logras conseguir nada, más que dos manzanas y una cantimplora con agua...*',
    options: [
      {
        text:'»',
        requiredState: (currentState) => currentState.coinCash,
        setState: { coinCash: false},
        nextText:20
      }
    ]
  },
  {
    id:19,
    text:'*Pero no consigues nada y duermes en la calle ese día...*',
    options: [
      {
        text:'»',
        nextText:21
      }
    ]
  },
  {
    id:20,
    text:'*Te haz quedado sin dinero...*',
    options: [
      {
        text:'»',
        nextText:21
      }
    ]
  },
  {
    id:21,
    text:'*A la mañana siguiente te levantas para tratar de conseguir algo de dinero...*',
    options: [
      {
        text:'»',
        nextText:22
      }
    ]
  },
  {
    id:22,
    text:'*Preguntas en todos lados pero, no consigues nada...*',
    options: [
      {
        text:'»',
        nextText:23
      }
    ]
  },
  {
    id:23,
    text:'*Hasta que...*',
    options: [
      {
        text:'»',
        nextText:24
      }
    ]
  },
  {
    id:24,
    text:'Desconocido: ¡Hey tú!',
    options: [
      {
        text:'...',
        nextText: 25
      }
    ]
  },
  {
    id:25,
    text:'Desconocido: ¡Sí tu! ¡Ven!',
    options: [
      {
        text:'¿Quién eres?',
        nextText:26
      },
      {
        text:'¿Qué quieres?',
        nextText:28
      }
    ]
  },
  {
    id:26,
    text:'Desconocido: Me llamo Theron.',
    options: [
      {
        text:'...',
        nextText:27
      }
    ]
  },
  {
    id:27,
    text:'Theron: Necesito que me hagas un favor.',
    options: [
      {
        text:'...',
        nextText:30
      }
    ]
  },
  {
    id:28,
    text:'Desconocido: Necesito un favor de tu parte.',
    options: [
      {
        text:'...',
        nextText:29
      }
    ]
  },
  {
    id:29,
    text:'Desconocido: Necesitas dinero ¿no?',
    options: [
      {
        text:'¿Tu cómo sabes eso?',
        nextText:31
      },
      {
        text:'¿A dónde vas con esto?',
        nextText:32
      }
    ]
  },
  {
    id:30,
    text:'Theron: Necesitas dinero ¿no?',
    options: [
      {
        text:'¿Tu cómo lo sabes?',
        nextText:33
      },
      {
        text:'¿Qué insinuas?',
        nextText:34
      }
    ]
  },
  {
    id:31,
    text:'Desconocido: Bueno te he estado observando y ví que estabas buscando una menera de conseguir dinero.',
    options:[
      {
        text:'...',
        nextText:32
      }
    ]
  },
  {
    id:32,
    text:'Desconocido: Bueno, verás... necesito que transportes un paquete.',
    options:[
      {
        text:'¿Qué paquete?',
        nextText:36
      },
      {
        text:'...',
        nextText:35
      }
    ]
  },
  {
    id:33,
    text:'Theron: Pues,te ví tratando de conseguir algo de dinero.',
    options:[
      {
        text:'...',
        nextText:34
      }
    ]
  },
  {
    id:34,
    text:'Theron: Necesito que transportes de un paquete.',
    options:[
      {
        text:'¿Qué tipo de paquete?',
        nextText:38
      },
      {
        text:'...',
        nextText:37
      }
    ]
  },
  {
    id:35,
    text:'Desconocido: ¿Qué dices? ¿Aceptas?',
    options:[
      {
        text:'*Aceptar*',
        nextText:39
      },
      {
        text:'¿Qué voy a ganar yo?',
        nextText:40
      }
    ]
  },
  {
    id:36,
    text:'Desconocido: Eso no importa. Simplemente tienes que transportarlo a donde yo te diga.',
    options:[
      {
        text:'...',
        nextText:35
      }
    ]
  },
  {
    id:37,
    text:'Theron: ¿Qué dices? ¿Aceptas?',
    options:[
      {
        text:'*Aceptar*',
        nextText:41
      },
      {
        text:'¿Qué voy a ganar yo?',
        nextText:42
      }
    ]
  },
  {
    id:38,
    text:'Theron: Eso no importa. Simplemente tienes que transportarlo a donde yo te diga.',
    options:[
      {
        text:'...',
        nextText:37
      }
    ]
  },
  {
    id:39,
    text:'Desconocido: ¡Perfecto! Por cierto mi nombre es Theron, mucho gusto.',
    options:[
      {
        text:'...',
        nextText:43
      }
    ]
  },
  {
    id:40,
    text:'Desconocido: Pues dinero. Y con suerte, una buena aventura.',
    options:[
      {
        text:'*Aceptar*',
        nextText:39
      }
    ]
  },
  {
    id:41,
    text:'Theron: ¡Perfecto!',
    options:[
      {
        text:'...',
        nextText:43
      }
    ]
  },
  {
    id:42,
    text:'Theron: Pues dinero. Y con suerte, una buena aventura.',
    options:[
      {
        text:'*Aceptar*',
        nextText:41
      }
    ]
  },
  {
    id:43,
    text:'Theron: Ten esto. Es una lista con instrucciones para el transporte del paquete. Leelas con atención.',
    options:[
      {
        text:'*Tomar lista*',
        setState: { listaInstrucciones: true},
        setState: { paqueteMisterioso: true },
        nextText:44
      }
    ]
  },
  {
    id:44,
    text:'Theron: Necesitarás algunos compañeros para tu viaje. Será mejor que los busques.',
    opitions:[
      {
        text:'...',
        nextText:45
      }
    ]
  },
  {
    id:45,
    text:'*Te distraes por un segundo y cuando te das cuenta... Theron desapareció*',
    options:[
      {
        text:'»',
        nextText:46
      }
    ]
  },
  {
    id:46,
    text:'*Un poco confundido decides ir al bar más popular para tratar de encontrar a un equipo que te acompañe en tu aventura*',
    options:[
      {
        text:'»',
        nextText:47
      }
    ]
  },
  {
    id:47,
    text:'*Es así como terminas en la taverna "Blue Sapphire". Te diriges hacia la barra, te sientas y pides una "lágrima de dragón"*',
    options:[
      {
        text:'»',
        nextText:48
      }
    ]
  },
  {
    id:48,
    text:'Cantinero: ¿Qué te trae por aquí?',
    options:[
      {
        text:'...',
        nextText:49
      }
    ]
  },
  {
    id:49,
    text:'Cantinero: Perdona el prejuicio pero, no se ve que seas de por aquí.',
    options:[
      {
        text:'Nada en especial, simplemente\nme gusta ir de aquí a allá',
        nextText:50
      },
      {
        text:'Si, no soy de aquí.\nSinceramente no recuerdo de donde soy',
        nextText:51
      }
    ]
  },
  {
    id:50,
    text:'Cantinero: Bueno, espero y disfrutes de tu estancia.',
    options:[
      {
        text:'¿Conoces a alguien que esté\n disponible para un trabajo?',
        nextText:52
      },
      {
        text:'Gracias',
        nextText:53
      }
    ]
  },
  {
    id:51,
    text:'Cantinero: Bueno, una vez un viejo sabio dijo: "Cada quién descubre su camino conforme avanza". Espero que disfrutes de tu estadía.',
    options:[
      {
        text:'Pues tiene mucha razón',
        nextText:53
      },
      {
        text:'¿Te puedo hacer una regunta?',
        nextText:53
      }
    ]
  },
  {
    id:52,
    text:'Cantinero: ¿Qué tipo de persona buscabas?',
    options:[
      {
        text:'Alguien local, que conozca la zona',
        nextText:54
      },
      {
        text:'Creo que podría ser un navegante.\nPor si necesito salir de la isla.',
        nextText:55
      },
      {
        text:'Me vendría bien alguien que conozca la isla\ny sus profundidades. Como un arqueólogo',
        nextText:56
      },
      {
        text:'Alguien fuerte. Como un cazador.',
        nextText:57
      }
    ]
  },
  {
    id:53,
    text:'Cantinero: Estoy para lo que necesites.',
    options:[
      {
        text:'¿Conoces a alguien que esté\n disponible para un trabajo?',
        nextText:52
      },
      {
        text:'¿Conoces bien a las personas de por aquí?',
        nextText:52
      }
    ]
  },
  {
    id:54,
    text:'Cantinero: Entonces deberías hablar con Arin, ella conoce muy bien la zona.',
    options:[
      {
        text:'...',
        nextText:58
      }
    ]
  },
  {
    id:55,
    text:'Cantinero: Entonces deberías hablar con Jax, es el mejor capitán que conozco.',
    options:[
      {
        text:'...',
        nextText:59
      }
    ]
  },
  {
    id:56,
    text:'Cantinero: Entonces deberías hablar con Gideon, ella es experta en civilizaciones antiguas.',
    options:[
      {
        text:'...',
        nextText:60
      }
    ]
  },
  {
    id:57,
    text:'Cantinero: Entonces deberías hablar con Sylas, el es el mejor que conozco.',
    options:[
      {
        text:'...',
        nextText:61
      }
    ]
  },
  {
    id:58,
    text:'Cantinero: Es la que está sentada en aquella mesa.',
    options:[
      {
        text:'Gracias',
        setState: { arin: true},
        nextText:62
      },
      {
        text:'Un gusto conocerte',
        setState: { arin: true},
        nextText:62
      }
    ]
  },
  {
    id:59,
    text:'Cantinero: Es el que está sentado en aquella mesa.',
    options:[
      {
        text:'Gracias',
        setState: { jax: true},
        nextText:62
      },
      {
        text:'Un gusto conocerte',
        setState: { jax: true},
        nextText:62
      }
    ]
  },
  {
    id:60,
    text:'Cantinero: Es la que está sentada en aquella mesa.',
    options:[
      {
        text:'Gracias',
        setState: { gideon: true},
        nextText:62
      },
      {
        text:'Un gusto conocerte',
        setState: { gideon: true},
        nextText:62
      }
    ]
  },
  {
    id:61,
    text:'Cantinero: Es el que está sentado en aquella mesa.',
    options:[
      {
        text:'Gracias',
        setState: { sylas: true},
        nextText:62
      },
      {
        text:'Un gusto conocerte',
        setState: { sylas: true},
        nextText:62
      }
    ]
  },
  {
    id:62,
    text:'Cantinero: Estoy para servirte.',
    options:[
      {
        text:'...',
        requiredState: (currentState) => currentState.arin,
        nextText:63
      },
      {
        text:'...',
        requiredState: (currentState) => currentState.jax,
        nextText:64
      },
      {
        text:'...',
        requiredState: (currentState) => currentState.gideon,
        nextText:65
      },
      {
        text:'...',
        requiredState: (currentState) => currentState.sylas,
        nextText:66
      }
    ]
  },
  {
    id:63,
    text:'*Te acercas a hablar con Arin*',
    options:[
      {
        text:'Hola, soy Adam Clarke',
        nextText:67
      },
      {
        text:'¿Eres Arin?',
        nextText:68
      }
    ]
  },
  {
    id:64,
    text:'*Te acercas a hablar con Jax*',
    options:[
      {
        text:'Hola, soy Adam Clarke',
        nextText:69
      },
      {
        text:'¿Eres Jax?',
        nextText:70
      }
    ]
  },
  {
    id:65,
    text:'*Te acercas a hablar con Gideon*',
    options:[
      {
        text:'Hola, soy Adam Clarke',
      },
      {
        text:'¿Eres Gideon?',
      }
    ]
  },
  {
    id:66,
    text:'*Te acercas a hablar con Sylas*',
    options:[
      {
        text:'Hola, soy Adam Clarke',
      },
      {
        text:'¿Eres Sylas?',
      }
    ]
  },
  {
    id:67,
    text:'Arin: Y yo Arin, ¿en qué puedo ayudarte?'
  },
  {
    id:68,
    text:'Arin: ¡Sí!, ¿te ayudo en algo?'
  },
  {
    id:69,
    text:'Jax: Soy Jax, un gusto. ¿Puedo ayudarte?'
  },
  {
    id:70,
    text:'Jax: Si, ¿quién lo busca?'
  },
  {
    id:71,
    text:'Gideon: ¿En qué puedo ayudarte?'
  },
  {
    id:72,
    text:'Gideon: Claro, ¿se te ofrece algo?'
  },
  {
    id:73,
    text:'Sylas: ¿A quién buscas?'
  },
  {
    id:74,
    text:'Sylas: ¿Quién pregunta?'
  }
]

startGame()