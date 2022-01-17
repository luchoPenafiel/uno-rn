// Vendor
import React from 'react';

// Components
import { PageWrapper } from '@uno/components/PageWrapper';
import { Text, Title, Subtitle, ListItem } from '@uno/components/Texts';

export const Rules = () => {
  return (
    <PageWrapper>
      <Title>Objetivo del juego</Title>
      <Text>
        El objetivo de UNO es deshacerse de todas las cartas que se “roban” inicialmente, diciendo la palabra “UNO”
        cuando queda la última carta en la mano. El primero que llega a los puntos establecidos gana. Se recibe puntos
        por todas las cartas que los otros jugadores todavía tienen en sus manos (véase puntos).
      </Text>

      <Title>La preparación del juego</Title>
      <Text>
        Se baraja las cartas y cada jugador recibe siete cartas. Las cartas restantes se ponen encubiertas en el centro
        y forman el mazo. La primera carta se desvela y se pone al lado. Este mazo es el mazo de descartes. Un jugador
        se sortea y empieza la ronda.
      </Text>

      <Title>Decurso del juego</Title>
      <Text>
        El primero jugador pone una carta de su mano al mazo de descartes. Aquí vale: Una carta sólo se puede superponer
        en una carta del mismo color o del mismo número. Las cartas negras son cartas de acción especiales con reglas
        particulares (ver cartas de acción). Si un jugador no puede poner la carta oportuna, tiene que tomar una carta
        de pena del mazo. Puede jugar esta carta ahora mismo, si la vale bien. Si no, es el turno del siguiente jugador.
        Quién pone la penúltima carta, debe decir “UNO” y señala que tiene sólo una última carta en la mano. Si un
        jugador lo olvida y el otro lo nota a tiempo (antes de que el siguiente jugador haya tomado o ha depuesto una
        carta) tiene que tomar dos cartas de pena. El ganador de la ronda es él que depone la última carta. Los puntos
        se suman y se comienza una nueva ronda.
      </Text>

      <Title>Cartas de Acción</Title>

      <Subtitle>CARTA TOMA DOS</Subtitle>
      <Text>
        Cuando se pone esta carta, el siguiente jugador debe tomar dos cartas y no puede deponer ninguna carta en esta
        ronda. Esta carta sólo puede superponer en una carta con el color apropiado u otras cartas “toma dos”. Si se
        revela al principio del juego, las mismas reglas aplican.
      </Text>

      <Subtitle>CARTA DE RETORNO</Subtitle>
      <Text>
        Con esta carta se cambia la dirección. Si se ha jugado por la izquierda, ahora se juega por la derecha y por la
        inversa. La carta sólo se puede superponer en una carta con color correspondiente o en una otra carta de
        retorno. Cuando esta carta se toma en el principio del juego, el dador comienza y entonces el jugador a su
        derecha continúa.
      </Text>

      <Subtitle>CARTA DE INTERMISIÓN</Subtitle>
      <Text>
        Después de poner esta carta, el siguiente jugador será “saltado”. La carta sólo se puede superponer en una carta
        con color correspondiente o en una otra carta de intermisión. Cuando esta carta se toma en el principio del
        juego, el jugador se “salta” a la izquierda del dador y el jugador a la izquierda de este jugador continúa el
        juego.
      </Text>

      <Subtitle>CARTA DE ELECCIÓN DE COLORES</Subtitle>
      <Text>
        Con esta carta el jugador decide qué color sigue en el juego. También el color presente puede ser seleccionado.
        Una carta de elección de colores también se puede poner cuando el jugador puede poner una carta diferente. Si se
        toma una carta de elección de colores en el principio del juego, el jugador a la izquierda del dador decide qué
        color va a seguir.
      </Text>

      <Subtitle>CARTA DE TOMAR CUATRO COLORES</Subtitle>
      <Text>
        Esta carta es la mejor. El jugador decide qué color sigue en el juego. Además, el siguiente jugador debe tomar
        cuatro cartas. No se puede deponer cualquier carta en esta ronda. Por desgracia, la carta sólo se puede poner si
        el jugador que la tiene, no tiene ninguna carta en la mano que corresponde con el color del montón. Si el
        jugador tiene una carta con el número o una carta de acción, sin embargo la carta de tomar cuatro colores se
        puede poner.
      </Text>
      <Text>
        Un jugador que tiene una carta de tomar cuatro colores puede tirarse un farol y poner esa carta prohibida. Si el
        jugador se atrapa ciertas reglas aplican (ver cartas de pena). Si esta carta se toma en el principio del juego,
        se devuelve en el mazo y se toma otra carta
      </Text>

      <Title>Penas</Title>
      <Text>
        Si un jugador no respeta las reglas, debe tomar una o más cartas de pena. Las reglas son los siguientes:
      </Text>

      <ListItem>
        UNO: Si un jugador olvida llamar “UNO” después de su penúltima carta y el siguiente jugador aún no ha jugado su
        carta, debe tomar una carta de pena.
      </ListItem>
      <ListItem>Propuestas: Quién hace propuestas a sus jugadores, debe tomar dos cartas de pena.</ListItem>
      <ListItem>
        Puesto incorrecto: Quién pone una carta, a pesar de que no está o una carta incorrecta, debe reanudarla y
        además, recibe una carta de pena.
      </ListItem>
      <ListItem>
        La +4 sólo se puede poner cuando el jugador no puede utilizar el color actual con excepción de otras cartas de
        acción. Si el jugador que tiene la +4 cree que la carta se ha jugado mal, puede desafiar el jugador anterior.
        Debe entonces justificar al mostrar sus cartas que en realidad no podía operar correctamente el color. Puede
        confirmarlo, el jugador desafiante ahora debe tomar seis cartas en lugar de cuatro. Sin embargo fue trasladado a
        tener la +4 ilegalmente, debe tomar las cuatro cartas a su mismo.
      </ListItem>

      <Title>Puntuacion</Title>
      <Text>
        El jugador que ha puesto todas sus cartas primeramente, recibe los siguientes puntos por las cartas de sus
        jugadores que tienen todavía en la mano:
      </Text>
      <ListItem>Todas las cartas de números: su valor</ListItem>
      <ListItem>Carta toma dos: 20 puntos</ListItem>
      <ListItem>Carta de retorno: 20 puntos</ListItem>
      <ListItem>Carta de intermisión: 20 puntos</ListItem>
      <ListItem>Carta de elección de colores: 50 puntos</ListItem>
      <ListItem>Carta de tomar cuatro colores: 50 puntos</ListItem>

      <Title>Variantes del juego</Title>
      <Text>
        Las reglas estandar del UNO son las mencionadas anteriormente, pero existen distintas variantes a las que los
        jugadores pueden someterse.
      </Text>
    </PageWrapper>
  );
};
