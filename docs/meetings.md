## Reunião 18/02/2021
 - Um placar legal e dinâmico para **lives**
  
**Lives**: scoreboard + informações sobre os membros dos times + classificados + mapa regionalizado
  - Placar legal e **animado** para mostrar durante a competição (pode ser tanto nas lives ou para os times em alguma sede)

**Perfis de uso**: narrador + admin + competidor + platéia
  - Placar em modo `resolver`, que faz a leitura das últimas submissões e "carimba" a classificação.

**Final do evento**: mostrar a resolução (status) das submissões que ficaram pendentes no blind

Placares atuais:
1. Maratona Live: https://github.com/maups/maratona-live
    * Para lives, não tem modo resolver
    * API do boca com zip de 3 arquivos
2. Maratona Animeitor: https://github.com/maratona-linux/maratona-animeitor
    * Mostra fotos dos times
    * Animação da "galgada"
    * Modo resolver
    * API do boca com zip de 3 arquivos

Requisitos:

Bloco 1: Scoreboard

    - Visualização no próprio browser
    - Scroll automático para ambientes
    - Deploy simples
    - Manutenível
    - Dependências de software mínimas (pacotes, etc)

Bloco 2: Live

    - Indicar classificados
    - Indicar medalhistas
    - Deve suportar um grande número de times (> 800)    
    - Ter modo `resolver`
  
Bloco 3: Melhorias

    - Tocar músicas dos times
    - Apresentar informações sobre os membros dos times
    - Mapa regionalizado


## Reunião 2 - 25/02/2021

- Canvas: teste bem sucedido
    - necessidade de um servidor local para acesso dos módulos: `python3 -m http.server port`
  
- Classe Scoreboard
    - Composta por várias linhas (Rows)
    - Cada linha contém o nome da equipe, total de problemas aceitos, penalidade de tempo total e as submissões por problema
    - As linhas são classes independentes: cada uma tem suas informações, e uma posição no espaço bidimensional
    - A posição do time da competição depende da posição da linha no Scoreboard
    - Deve existir um método moveTo() que muda a posição da linha, e que será invocado em uma linha pelo próprio Scoreboard, o qual conhece a posição de destino
    - A classe Row deve ter o controle da sua animação da posição de origem à posição de destino

## Reunião 3 - 04/03/2021

- Início da codificação do Scoreboard e da Row
- Finalizar o método draw()
- Refatorar para evitar excesso de parâmetros nos métodos
- Deixar as dimensões proporcionais a tela


## Reunião 4 - 11/03/2021

- Pesquisar sobre classes singleton no Javascript
- Adicionar o scroll do mouse
- Procurar por um método que computa o tamanho do texto sem renderizá-lo

## Reunião 5 - 18/03/2021

- Consertar o método resize
- Colocar a câmera como Singleton
- Alinhar o nome à esquerda, pontuação e penalidade à direita, demais ao centro

## Reunião 6 - 25/03/2021

- Incluir last submission na linha, inicializado com 0
- Implementar a atualização do placar
    - Locar o índice i da linha cujo teamUID é igual ao teamUID da submissão
    - Converte o caractere alfabetico do problema para índices (A -> 1, B -> 2, etc...)
    - Se no acs da linha o problema já está marcado, retorna
    - Caso contrário, se o verdict é Y
        - marca 1 nos acs
        - atualizar last submission com time
        - soma um no score
        - soma time + scoreboard.penalty*submissions do problema no penalty
    - Se o verdict é N, soma +1 no submissions do problema
  - Por fim, compararemos a posição com as posições j = i - 1, i - 2, até 1:
      - se o score em i é maior do que em j ou se os scores são iguais mais penalty em i é menor do que em j, dá swap em ambas e continua para j - 1
      - se ambos scores e penalties forem iguais, o último critério é o menor last submission
      - tudo igual, para
    - caso contrário, para

