# Descrição das Tabelas Utilizadas no Projeto
## Introdução
  Esta entrega tem como objetivo apresentar a estrutura do banco de dados do projeto L.E.A.D., desenvolvido a partir das demandas e necessidades da iniciativa Lideranças Empáticas — um programa voltado à arrecadação e gestão de doações em contextos sociais e educacionais no Centro Universitário da FECAP. Com base nos conteúdos estudados na disciplina de Projeto de Banco de Dados, este trabalho busca demonstrar e analisar a criação de tabelas essenciais para o funcionamento do sistema, incluindo a definição de campos, tipos de dados, chaves primárias e relacionamentos necessários.
<br/>

## Desenvolvimento
  Análise das tabelas do projeto
<br/>

### Tabela Usuario
```sql
create table Usuario(
  ID_Usuario int primary key auto_increment,
  nome_usuario varchar(60) not null,
  email_usuario varchar(100) not null,
  senha_usuario varchar(60) not null,
  tipo_usuario ENUM('Mentor', 'Aluno', 'Administrador') NOT NULL
);

```
 A tabela **Usuario** armazena os dados dos participantes do sistema, sejam eles alunos, mentores ou administradores. O campo `ID_Usuario` atua como chave primária auto incremental, garantindo a identificação única de cada cadastro. Observa-se a aplicação de boas práticas, como:

- Definição de todos os atributos como obrigatórios, evitando registros incompletos;
- Padronização do tipo de usuário por meio do `ENUM`, permitindo apenas perfis válidos no sistema;
- Separação adequada entre dados pessoais (nome e e-mail) e informações de autenticação (senha).

Essa tabela é essencial dentro do modelo, pois define quem acessa o sistema e qual é o papel desse usuário nas funcionalidades relacionadas à gestão das doações e dos grupos envolvidos no projeto.

<br/>

### Tabela Grupo
```sql
create table Grupo(
  ID_Grupo int primary key auto_increment,
  nome_grupo varchar(60) not null,
  data_criacao date not null,
  pontuacao float default 0.0
);

```

A tabela **Grupo** registra os times envolvidos no projeto, permitindo identificar cada grupo por meio do campo `ID_Grupo`, definido como chave primária auto incremental. A modelagem adota boas práticas, como:

- Obrigatoriedade de nome e data de criação, garantindo que todos os grupos tenham identificação e histórico definidos;
- Inclusão do campo `pontuacao` com valor padrão estabelecido, facilitando o controle e acompanhamento do desempenho de cada grupo ao longo do projeto.

Essa tabela é importante para organizar a estrutura coletiva dos participantes, servindo como base para relacionamentos com usuários, contribuições e avaliações dentro do sistema.


<br/>

### Tabela UsuarioGrupo
```sql
create table UsuarioGrupo(
  id int primary key auto_increment,
  id_usuario int not null,
  constraint fk_usuario_usuarioGrupo
  foreign key(ID_Usuario) references Usuario(ID_Usuario) on delete cascade,
  id_grupo int not null,
  constraint fk_grupo_usuarioGrupo
  foreign key(ID_Grupo) references Grupo(ID_Grupo) on delete cascade
);

```

A tabela **UsuarioGrupo** representa o vínculo entre usuários e grupos, funcionando como uma relação de muitos-para-muitos dentro do sistema. O campo `id` é utilizado como chave primária para identificar cada associação registrada. Entre os pontos positivos da estrutura, destacam-se:

- Uso de chaves estrangeiras que garantem integridade referencial com as tabelas **Usuario** e **Grupo**;
- Aplicação do `ON DELETE CASCADE`, assegurando que, caso um usuário ou grupo seja removido, seus vínculos também sejam automaticamente excluídos;
- Definição dos campos que fazem o relacionamento como **NOT NULL**, evitando vínculos incompletos ou inválidos.

Essa tabela é essencial para organizar a participação dos usuários dentro de cada grupo, permitindo que o sistema controle quem compõe cada equipe e garantindo a consistência das relações ao longo da operação do projeto.


<br/>

### Tabela Alimento
```sql
CREATE TABLE Alimento (
  ID_Alimento INT AUTO_INCREMENT PRIMARY KEY,
  nome_alimento VARCHAR(100) NOT NULL,
  peso_base float,
  pontos_base float not null
);

```

  A tabela **Alimento** armazena informações sobre os itens alimentícios que podem ser doados ao projeto. O campo `ID_Alimento`, definido como chave primária auto incremental, identifica de forma única cada alimento cadastrado. A estrutura apresenta boas práticas, como:

- Obrigatoriedade do nome do alimento e de sua pontuação base, garantindo dados mínimos para o controle do sistema;
- Inclusão de atributos específicos do contexto, como `peso_base` e `pontos_base`, que auxiliam na avaliação e padronização das doações;

Essa tabela desempenha papel fundamental na categorização dos alimentos e na definição de seus valores para o cálculo da pontuação atribuída aos grupos participantes do projeto.


<br/>

### Tabela Doacao
```sql
create table Doacao(
  ID_Doacao int primary key auto_increment,
  tipo_doacao ENUM('Dinheiro', 'Alimento') NOT NULL,
  quantidade int not null,
  peso_doacao float not null,
  pontuacao int not null,
  ID_Usuario int,
  foreign key (ID_Usuario) references Usuario(ID_Usuario) on delete cascade,
  nome_alimento varchar(100)
);

```

A tabela **Doacao** registra cada oferta feita ao projeto, sejam elas em dinheiro ou em alimentos. O campo `ID_Doacao` serve de chave primária, distinguindo cada doação duma forma singular. Dentre os pontos positivos, destacam-se:

- A utilização de `ENUM` em `tipo_doacao`, certificando-se de que só categorias validas são registradas;
- A obrigatoriedade dos dados chave da doação, como quantidade, peso e pontuação;
- A conexão ao usuário que fez a doação por intermédio da chave estrangeira `ID_Usuario`, mantendo a integridade dos dados e permitindo rastreio das contribuições.

Além disso, o campo `nome_alimento` permite o registro do alimento doado, quando necessário. Desse jeito, esta tabela é fundamental no sistema, ela reúne toda a circulação de doações e junta essas ações aos usuários engajados no projeto.

<br/>

### Tabela Dinheiro 
```sql
CREATE TABLE Dinheiro (
  ID_Dinheiro INT AUTO_INCREMENT PRIMARY KEY,
  valor DECIMAL(10,2) NOT NULL,
  imagem_comprovante varchar(255) not null,
  ID_Doacao int,
  foreign key (ID_Doacao) references Doacao(ID_Doacao) on delete cascade
);

```

A tabela **Dinheiro** complementa as informações das doações financeiras, vinculando cada registro ao respectivo lançamento na tabela **Doacao** por meio da chave estrangeira `ID_Doacao`. O campo `ID_Dinheiro` atua como chave primária, garantindo identificação única para cada comprovante registrado. Entre os pontos positivos, destacam-se:

- O uso de `DECIMAL(10,2)` para o campo `valor`, garantindo precisão no armazenamento de dados monetários;
- Obrigatoriedade de anexar o comprovante por meio do campo `imagem_comprovante`, reforçando a transparência e validação das doações;
- Aplicação do `ON DELETE CASCADE`, que mantém a integridade dos dados ao remover registros associados a doações excluídas.

Com isso, a tabela cumpre um papel importante no controle financeiro do projeto, registrando o valor doado e assegurando que cada doação em dinheiro tenha sua comprovação devidamente vinculada.

<br/>

--- 
### Conclusão

  O banco de dados **L.E.A.D.** apresenta uma modelagem clara e adequada ao controle de doações dentro do projeto Lideranças Empáticas. A estrutura contempla desde o cadastro de usuários e grupos até o registro detalhado das contribuições, garantindo organização e integridade das informações. O uso de chaves estrangeiras e do `ON DELETE CASCADE` contribui para um gerenciamento consistente das relações, enquanto a padronização de dados, como tipos de doação e pontuações, facilita a análise e o acompanhamento do desempenho dos grupos.

Entre os pontos positivos, destacam-se a separação lógica das tabelas, a obrigatoriedade dos campos essenciais e a preocupação com a comprovação das doações financeiras. Como oportunidade de melhoria futura, recomenda-se ampliar os controles de segurança, especialmente no armazenamento das senhas e na validação de usuários. No geral, o modelo demonstra boa aplicação dos conceitos de banco de dados e atende de forma eficiente aos objetivos do sistema.
