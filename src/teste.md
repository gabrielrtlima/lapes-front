## Resumo A introduction to deep learning in natural language processing: models, techniques, and tools

### NLP em poucas palavras

NLP é um ramo da inteligência artificial com tarefas complexas, 
sofisticada em relação ao idioma. Ela é capaz de realizar tradução
automática, resumos e responder perguntas.

Entretando, mesmo ela obtendo excelentes resultados em algumas
tarefas complexas, ainda existe vários problemas, como:
- Custo computacional
- Falta de interpretabilidade
- Reprodutibilidade dos resultados

## Aplicações das técnicas

- Classificação de sequências
    - Categorização de documentos
    - Responder parte de uma frase, onde o objetivo é responder uma
    pergunta com parte de um parágrafo/frase
- Classificação de sequência separadas
    - A ideia dessa classificação é entender se duas frases tem o
    mesmo propósito/significado.
        - Ex: Você está bem? / Tudo bem?
- Rotulagem de palavras
    - Reconhecimento de entidade nomeada (nomes, locais)
    - Resposta de pergunta clássica
        - De acordo com um parágrafo de entrada é selecionado um
        intervalo contendo a resposta e ser retornada.
    - Marcação de sentença (entender se é verbo, substantiva e etc)
    - Sequência para sequência
        - Tradução de palavra mantendo o contexto/significado 
        e não só traduzindo literalmente


## Modelos pré-treinados

### BERT
Foi orientado por dois objetivos MLM e NSP

MLM
- A rede mascara uma pequena quantidade palavras e tenta predizer
na saida

NSP
- Em resumo, o NSP pega uma frase de 3 palavras por exemplo e exclui
uma para verificar se são consecutivas ou não. Depois de um tempo de
treinamento pode ser usado para algumas atividades ex: (corretor
ortográfico de celular)

**Existem outras variações do BERT: RoBERTa, ALBERT, DistilBERT**

O M BERT (multilingual) é pré treinado em 104 idiomas alguns
autores enfatizam que a sobreposição lexical entre linguas é 
insignificante

## GPT
O modelo inicial do GPT começou usando um decodificador de 12 camadas
e foi treinado em 7.000 livros não publicados.

No GPT-2 estende o que tinha do GPT mas com algumas pequenas alterações
a rede dobrou o número de camadas com 1,5 bilhões de parâmetros que 
podem ser aprendidos. Com as modificações é possível que o GPT-2 
aprenda várias tarefas sem serem supervisionadas, é esperado que o GPT-2
produza diferentes respostas para a mesma entrada.

No GPT-3 contém 175 bilhões de parâmetros, fazendo textos incríveis e
dificultando diferenciar de um texto escrito por um humano, entretanto
o GPT-3 levanta alguns problemas éticos e sociológicos, por exemplo: 
phishing, spam, espalhar fake news e etc...
