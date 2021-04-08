## 1.Introdução

## 1.1. Contextualização

O presente projeto tem por finalidade atender uma demanda real definida pelos professores Edson Alves e Bruno Ribas da Universidade de Brasília campus Gama, consistindo na necessidade de uma ferramenta voltada para a apresentação de um placar interativo e em tempo real que apresente informações relevantes relacionadas a maratonas de programação.

## 1.2. Justificativa/Motivação

Atualmente, diversas maratonas realizam transmissões ao vivo de suas competições em plataformas de streaming. Estas, se utilizam de ferramentas já geradas com a finalidade de apresentação dos dados e informações sobre a competição. Entretanto, um ponto negativo para estas ferramentas se dá devido ao grande número de dependências destas ferramentas. O que dificulta pontos como portabilidade e definição de um ambiente estável para que a ferramente funcione corretamente. Estas dependências, mesmo com finalidade de tornar a ferramenta utilizável, podem, também, torná-las inutilizáveis devido a alguma atualização de pacotes, interagindo com o sistema estável e o tornando instável.

## 1.3. Objetivos

## 1.3.1. Objetivo Geral

Tendo por objetivo minimizar ao máximo as dependências externas à ferramenta, este trabalho de conclusão de curso se propõe a gerar uma nova ferramenta que apresente, em tempo real, os dados e informações de uma maratona de programação, bem como gerar uma estrutura a nível de código que seja tanto escalável quanto manutenível para que novas funcionalidades possam ser implementadas sem dificuldades após o término do ciclo deste projeto.

## 1.3.2. Objetivos Específicos

* Utilização mínima de dependências
* Redimensionalização automática
* Apresentar um Scoreboard de times de maratonas de programação
* Apresentar e atualizar informações dos times
* Interação com scoreboard e suas informações
* Indicar classificados
* Indicar medalhistas
* Suporte para grande número de times

## 1.4. Estrutura do Trabalho

Este projeto está estruturado em duas partes. A primeira se refere a construção de uma estrutura base funcional para a ferramenta em desenvolvimento com base nas ferramentas já utilizadas nas transmissões de maratonas de programação, ou seja, reconstruir as funcionalidades já existentes nas outras ferramentas levando em consideração os objetivos definidos anteriormente neste documento. A segunda, um incremento da ferramenta com novas funcionalidades referentes a interação dos apresentadores com a ferramenta e apresentação de novas informações a respeito dos times participantes.

## 2.Fundamentação Teórica

<!-- Exposição dos conceitos necessários para o entendimento do trabalho -->
* Maratona de Programação:
* Submissão:
* Penalidade:
* Canvas:

## 3.Metodologia

## 3.1. Metodologia de desenvolvimento de software

<!-- Citar Metodologia Ágil e scrum -->
O projeto segue a metodologia ágil com pequenos ciclos iterativos para construção de incremento tanto do presente documento quanto do software em desenvolvimento. A interação com o demandante deste projeto proporcionou a elicitação dos requisitos do software. Estes requisitos foram quebrados em partes menores e distribuídas em sprints cabíveis no tempo e escopo da disciplina de trabalho de conclusão de curso.

## 3.2. Ferramentas utilizadas (hardware e software, versões de cada)

As seguintes ferramentas foram utilizadas, tanto para a construção da ferramenta quanto para a organização do projeto:

* Git v2.31.0
* HTML v5.0
* Javascript 
* Editor de texto Visual Studio Code v1.55
* Navegador com suporte a HTML5

## 3.3. Fluxo de trabalho

<!-- Apresentar fluxograma -->

As etapas do fluxo de trabalho estão descritas abaixo:

* Escolha do tema: A escolha do tema surgiu pela demanda de uma ferramenta para auxiliar na transmissão de informações de times de maratonas de programação.
* Elicitação de requisitos: Os requisitos foram levantados por meio de conversas com o Professor Bruno Ribas, o qual informou os principais pontos para a construção da ferramenta.
* Planejamento de sprints: Após o levantamento dos requisitos e a quebra dos mesmos em atividades menores, houve a distribuição destas em sprints.
* Desenvolvimento de sprints: Cada sprint teve tempo de duração de uma semana, onde ao final e início das mesmas houve uma reunião com o Professor Orientador Edson-sama.

<!-- ## 3.4. Etapas do trabalho -->


## 3.5. Critério das escolhas dos métodos, referências bibliográficas e ferramentas

Como a ferramenta demandada deve ser realizada dentro do tempo da discplina Trabalho de Conclusão de Curso, a metodologia ágil se fez bastante interessante para auxiliar no desenvolvimento do projeto, pois esta visa a entrega rápida - ágil - de um produto.

Das ferramentas utilizadas, o versionamento por meio da ferramenta Git se fez de grande importância para se ter uma rastreabilidade e controle de versões sobre as iterações do desenvolvimento do projeto. O editor de texto e o navegador apenas foram selecionados por conveniência e proximidade do autor deste projeto com os mesmos. Já a utilização de HTML5 e Javascript se fizeram necessários para atender a demanda de minimização de dependências na produção do produto.

## 4.Resultados Parciais

<!-- Apresenta os resultados obtidos até o momento e discorrer criticamente sobre eles. Devem ser levados em consideração -->
No presente momento, a ferramenta já está em desenvolvimento e se encontra próxima das ferramentas já utilizadas pelas transmissões de maratonas de programação. Já há a apresentação das informações dos times e suas submissões, bem como seus scores e atualização dos mesmos caso haja uma submissão.

## 4.1. Problemas encontrados

A análise das submissões é feita a partir de um documento em texto que será atualizado a partir de uma requisição web. O presente estado da ferramenta não verifica se uma submissão já foi computada.

## 4.2. Semelhanças e diferenças com resultados comparáveis da literatura


## 4.3. Melhorias obtidas

O Scoreboard já está funcionando com dependências mínimas, necessitando apenas de um navegador com suporte de HTML5.

## 5.Cronograma

Cronograma de Gantt com as atividades já realizadas e que serão realizadas no semestre seguinte
