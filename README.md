Problema - Escolha de Cardápio

Metodologia de Resolução: Algoritmo Guloso
Para resolver o problema, usamos um método chamado algoritmo guloso. Essa técnica sempre faz a melhor escolha local em cada etapa, esperando que isso leve à melhor solução global. No nosso caso, a regra é escolher sempre o prato com a melhor proporção na rodada de escolha.

Metodologia de Resolução: Programação Dinâmica
A Programação Dinâmica é uma técnica que resolve problemas quebrando-os em partes menores e resolvendo cada uma dessas partes. Depois, as soluções dessas partes são combinadas para resolver o problema todo.

1. Como esse problema pode ser modelado para o paradigma guloso?

Podemos usar o método guloso selecionando os pratos com o melhor valor de ν/c (lucro/custo). O algoritmo vai percorrer os pratos ordenados por essa proporção e sempre escolher o prato com a melhor razão ν/c que ainda cabe no orçamento. Isso ajuda a maximizar o lucro dentro das limitações de orçamento.

2. Seu algoritmo guloso apresenta uma solução ótima? Por quê?

Não, o algoritmo guloso escolhe a melhor opção disponível em cada etapa, mas isso não garante que o caminho final escolhido seja o melhor possível.

3. Como esse problema pode ser modelado para o paradigma de programação dinâmica?

Podemos utilizar uma tabela onde cada célula mostra o lucro máximo possível para um certo número de dias e orçamento. Primeiro, inicializamos a tabela com zero lucro para zero dias ou zero orçamento. Depois, para cada dia e orçamento, analisamos cada prato, atualizando a tabela ao calcular o lucro ao cozinhar o prato uma vez, duas vezes seguidas (com lucro reduzido a 50%) ou não cozinhá-lo. Assim, ao preencher a tabela, consideramos todas as combinações possíveis de pratos e orçamentos, resultando no lucro máximo possível.

4. Discuta a subestrutura ótima e a sobreposição dos problemas.

Na programação dinâmica, "subestrutura ótima" significa que podemos calcular o melhor lucro para um certo número de dias e orçamento usando soluções ótimas para casos menores. Usando como exemplo a solução com programação dinâmica realizada, se já soubermos o lucro máximo para 3 dias com um orçamento específico, podemos usar essa informação para calcular o lucro máximo para 4 dias. Já a "sobreposição dos problemas" ocorre quando os subproblemas menores compartilham soluções comuns. Isso significa que, ao resolver o problema maior, as soluções para esses subproblemas serão encontradas.

5. Algum algoritmo clássico foi adaptado para resolver o problema? Se sim, qual foi ele?

Não foi adaptado nenhum algorítmo clássico.
