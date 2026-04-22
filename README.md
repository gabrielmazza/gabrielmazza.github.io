# Processamento de Imagens em C - Filtro de Mediana seguido pelo Filtro Laplaciano

**Projeto realizado para a disciplina de Fundamentos de Sistemas Operacionais**  
**Curso:** Engenharia de Computação  
**Instituição:** Universidade de Caxias do Sul (UCS)  
**Desenvolvedores:** Gabriel Mazzarotto e Gabriel Vieira

---

## Descrição do Trabalho

Este projeto tem como objetivo realizar o processamento de imagens com ruído no formato BMP (24 bits). O processamento consiste em três etapas sequenciais:
1. Conversão para tons de cinza utilizando a equação:  
   `Cinza = 0.299 * R + 0.587 * G + 0.114 * B`
2. Aplicação de um **Filtro de Mediana** para a remoção do ruído.
3. Aplicação de um **Filtro Laplaciano** para realçar as bordas da imagem.
4. Gravação do resultado final em uma imagem de saída.

O programa foi paralelizado utilizando duas abordagens distintas para fins de avaliação de desempenho (Cálculos de Speedup e Eficiência):
- **Processos:** com comunicação realizada por meio de uma área de memória compartilhada.
- **Threads:** utilizando a biblioteca de Pthreads.

Os testes de desempenho avaliam o tempo de execução com máscaras de tamanhos **3x3, 5x5 e 7x7**, variando a divisão da carga entre **1, 2, 3 e 4 processos/threads**. A partir dessas execuções, podem ser gerados os relatórios apontando os ganhos de speedup, eficiência e imagens ilustrativas da finalização dos filtros.

### Fundamentação Teórica

> *Parte do texto retirado do Trabalho de Conclusão de Curso do Aluno: CARLOS ALBERTO ZANELLA BATAGLION.*

As técnicas de filtragem podem ser utilizadas para a suavização de ruídos de uma imagem ou ainda para realçar as bordas dos elementos que compõem uma imagem (ou em conjunto). Os filtros de suavização, também chamados de filtros passa-baixa, possuem como principal objetivo suavizar os ruídos, preservando as baixas frequências e atenuando as altas frequências. Os filtros de realce, também chamados de filtros passa-alta, procuram detectar e/ou realçar as bordas dos elementos de uma imagem. Para isto, é feito um processo inverso ao realizado nos filtros passa-baixa, isto é, os filtros passa-alta possuem como objetivo manter as frequências mais altas e reduzir as frequências mais baixas, tornando as transições entre as diferentes regiões da imagem mais nítidas.

Tanto os filtros de suavização como os filtros de realce podem ser classificados em duas categorias: as técnicas de filtragem espacial e as técnicas de filtragem no domínio da freqüência. Os métodos que trabalham no domínio espacial operam diretamente sobre a matriz de pixels da imagem, utilizando operações através do uso de máscaras. Normalmente a máscara é uma matriz quadrada com o valor do pixel central a ser alterado, e os outros pixels são os valores vizinhos que influenciarão no novo valor do pixel. A máscara pode apresentar diferentes tamanhos que definem o número de linhas e colunas da submatriz (ex: máscaras 3×3, 5×5 e 7x7).

**Filtro de Mediana**  
O filtro mediana é um exemplo de um filtro empregado na remoção de ruídos em imagens digitais. Um problema relacionado ao filtro por Mediana está ligado a ordenação da vizinhança dos pixels, o que constitui uma etapa de tempo de processamento bastante custosa.

**Filtro Laplaciano**  
Uma abordagem comum em imagens com muito ruído consiste na remoção do ruído com o filtro de mediana, e após a aplicação do filtro para realçar as bordas na imagem. O filtro de Laplaciano utiliza um processo chamado de convolução. O processo de convolução consiste em "passar" a máscara por todos os pixel da imagem, somando as multiplicações dos valores da máscara pelos valores dos pixels. O resultado da soma é utilizado para substituir o valor do pixel central. O tamanho da máscara do filtro laplaciano tem impacto direto na detecção das bordas.

---

## Estrutura do Projeto

- `src/` - Códigos-fonte em C
- `include/` - Cabeçalhos (headers) com as declarações das funções
- `images/` - Diretório recomendado para armazenar as imagens de entrada (com ruído) e saída
- `bin/` - Onde o executável gerado será armazenado
- `Makefile` - Arquivo Make para compilação automatizada do projeto

## Como Compilar

Certifique-se de ter um compilador C (como o `gcc`) instalado em seu sistema e o utilitário `make`. Na raiz do projeto, execute o comando:
```bash
make
```
O executável final `main` será gerado automaticamente na pasta `bin/`.

## Como Executar

O comando de execução avalia o processamento medindo automaticamente seu tempo e possui o seguinte formato:
```bash
./bin/main <entrada.bmp> <saida.bmp> <tamanho_mascara> <num_processos> <usar_threads>
```

### Argumentos:
1. `<entrada.bmp>`: Caminho da imagem BMP 24 bits de entrada (ex: `images/ruido.bmp`).
2. `<saida.bmp>`: Prefixo base do caminho da imagem de saída filtrada (ex: `images/saida`).
3. `<tamanho_mascara>`: Tamanho da máscara a aplicada. Valores numéricos válidos e testados: `3`, `5` ou `7`.
4. `<num_processos>`: Número de processos / threads a serem alocados para a execução concorrente: (Normalmente `1`, `2`, `3` ou `4`).
5. `<usar_threads>`: Modo de paralelização. Utilize `1` para ativar as **threads (pthreads)** ou `0` para utilizar **processos com memória compartilhada**.

### Exemplo de uso
Deseja-se processar a imagem `ruido.bmp`, salvar como `resultado.bmp`, usando janela `5x5`, dividindo o processamento com **4 threads**:
```bash
./bin/main images/ruido.bmp images/resultado 5 4 1
```

O programa imprimirá na tela os tempos de execução médios dos filtros, permitindo montar as tabelas e gráficos necessários para o cálculo de speedup e eficiência.
