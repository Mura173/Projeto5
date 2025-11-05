# FECAP - Fundação de Comércio Álvares Penteado

<p align="center">
<a href= "https://github.com/2025-2-MCC2/Projeto5"><img src="Imagens/Logo.png" alt="Logo = L.E.A.D" width="50%" border="0"></a>
</p>

# Nome do Projeto: LEAD

## Integrantes: <a href="https://github.com/rodriguesbrun">Bruno Rodrigues</a>, <a href="https://github.com/Enzohenrique7">Enzo Henrique</a>, <a href="https://github.com/harryzuh">Harry Zhu</a>, <a href="https://github.com/Mura173">Murilo Ângelo</a>, <a href="https://github.com/vitorkolle">Vitor Kolle</a>

## Professores Orientadores: <a href="https://www.linkedin.com/in/francisco-escobar/">Francisco Escobar</a>, <a href="https://www.linkedin.com/in/cristina-machado-corr%C3%AAa-leite-630309160/">Cristina Machado</a>, <a href="https://www.linkedin.com/in/katia-bossi/">Katia Bossi</a>, <a href="https://www.linkedin.com/in/leonardo-fabris-lugoboni-a3369416/">Leonardo Lugoboni</a>, <a href="https://www.linkedin.com/in/dolemes/">David Lemes</a>

## Descrição
Este projeto foi desenvolvido com o objetivo de facilitar a colaboração entre alunos e mentores em iniciativas sociais voltadas para pessoas em situação de vulnerabilidade em conjunto com o projeto <a href="https://liderancasempaticas.com/">Lideranças Empáticas</a>. A plataforma permite que os participantes organizem e acompanhem contribuições, promovendo maior transparência, engajamento e impacto. Com uma interface intuitiva e recursos de gestão colaborativa, o sistema incentiva o aprendizado prático e o desenvolvimento de habilidades sociais e técnicas, enquanto promove o bem coletivo.
<br><br>
Além de conectar quem deseja ajudar com quem precisa, o projeto também serve como uma ferramenta educacional, permitindo que mentores orientem alunos na aplicação de conhecimentos em contextos reais. Os dados das contribuições podem ser visualizados em tempo real, facilitando a análise de impacto e a tomada de decisões.
<br><br>

## 🛠 Estrutura de pastas

-Raiz<br>
|<br>
|-->documentos<br>
  &emsp;|-->Entrega 1<br>
      &emsp;&emsp;|-->Cálculo 2<br>
      &emsp;&emsp;|-->Desenvolvimento Web Full Stack<br>
      &emsp;&emsp;|-->Gestão Empresarial e Dinâmica das Organizações<br>
      &emsp;&emsp;|-->Projeto Interdisciplinar Programação Web<br>
      &emsp;&emsp;|-->Projetos em Banco de Dados<br>
  &emsp;|-->Entrega 2<br>
      &emsp;&emsp;|-->Cálculo 2<br>
      &emsp;&emsp;|-->Desenvolvimento Web Full Stack<br>
      &emsp;&emsp;|-->Gestão Empresarial e Dinâmica das Organizações<br>
      &emsp;&emsp;|-->Projeto Interdisciplinar Programação Web<br>
      &emsp;&emsp;|-->Projetos em Banco de Dados<br>
|-->imagens<br>
|-->src<br>
  &emsp;|-->Client<br>
  &emsp;|-->Server<br>
|readme.md<br>

## 🛠 Instalação

<b>Windows:</b>

Não há instalação! Apenas executável!

<b>HTML:</b>

Não há instalação!
Encontre o index.html na pasta executáveis e execute-o como uma página WEB (através de algum browser).

## 💻 Configuração para Desenvolvimento
### Pré-requisitos
Antes de começar, certifique-se de ter instalado:
<ul>
<li>Node.js (versão recomendada: 18+)</li>
<li>npm </li>
<li>Git</li>
</ul>

### Clonando o repositório
```bash
git clone https://github.com/2025-2-MCC2/Projeto5.git
cd ./Projeto5
```

### Configurando o Back-end
#### Criando e configurando o aquivo .env (Variáveis de ambiente)
````bash
cd ./src/Server

echo "PORT=3000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_DB=leadbd
MYSQL_PASSWORD=(Insira aqui a senha de acesso ao seu MySQL Workbench. Caso não utilize senha, deixe em branco após o sinal de igual.)

JWT_SECRET=lead2025
JWT_EXPIRES=1h > .env
````
#### Baixando as dependências e iniciando o servidor
````bash
npm install

# Inicie o servidor
npm run dev

````

### Configurando o Front-end

`````bash
(Em outro terminal)

cd ./src/Client
npm install

# Inicie o servidor de desenvolvimento
npm run start
``````

### Observações
<ul>
  <li>O front-end estará disponível em http://localhost:5173</li>
  <li>O back-end estará rodando em http://localhost:3000</li>
  <li>Certifique-se de que as URLs de API estejam corretamente configuradas no front-end para comunicação com o back-end</li>
</ul>

## 📋 Licença/License
<a href="https://github.com/2025-2-MCC2/Projeto5">LEAD</a> © 2025 by <a href="https://creativecommons.org">Bruno Rodrigues Da Costa, Enzo Henrique Neves Sena, Harry Zhu, Murilo Angelo Pimentel Braggio, Vitor Paes Kolle  </a> is licensed under <a href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0</a>

## 🎓 Referências

<a href="https://liderancasempaticas.com/">Lideranças Empáticas</a>
<a href="https://sweetalert2.github.io/">Sweet Alert</a>


