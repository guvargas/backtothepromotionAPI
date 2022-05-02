CREATE TABLE IF NOT EXISTS tb_aluno(
    id_aluno serial not null PRIMARY KEY,
    matricula varchar(255) UNIQUE,
    nome varchar(255),
    senha varchar(255)
);
CREATE TABLE IF NOT EXISTS tb_player(
    id_player serial not null PRIMARY KEY,
    posicao varchar(255),
    volume_falas varchar(255),
    volume_ambiente varchar(255),
    cena_salva varchar(255)
);
CREATE TABLE IF NOT EXISTS associacao_player_aluno(
    id_player serial not null,
    id_aluno serial not null,
    FOREIGN KEY (id_player) REFERENCES tb_player(id_player),
    FOREIGN KEY (id_aluno) REFERENCES tb_aluno(id_aluno)
);
CREATE TABLE IF NOT EXISTS tb_falas_salvas(
    id_fala serial NOT NULL PRIMARY KEY,
    identificador_original varchar(255),
    texto varchar(255),
    categoria varchar(255),
    horario varchar(255)
);
CREATE TABLE IF NOT EXISTS associacao_player_falas_salvas(
    id_player serial not null,
    id_fala serial not null,
    FOREIGN KEY (id_player) REFERENCES tb_player(id_player),
    FOREIGN KEY (id_fala) REFERENCES tb_falas_salvas(id_fala)
);
CREATE TABLE IF NOT EXISTS tb_escolha_minigame(
    id_escolha_minigame serial NOT NULL PRIMARY KEY,
    identificador_original varchar(255),
    texto varchar(255),
    esta_certo BIT,
    botao_clicado varchar(255),
    horario varchar(255)
);
CREATE TABLE IF NOT EXISTS associacao_player_escolhas_minigame(
    id_player serial not null,
    id_escolha_minigame serial not null,
    FOREIGN KEY (id_player) REFERENCES tb_player(id_player),
    FOREIGN KEY (id_escolha_minigame) REFERENCES tb_escolha_minigame(id_escolha_minigame)
);
CREATE TABLE IF NOT EXISTS tb_clicks(
    id_click serial NOT NULL PRIMARY KEY,
    objeto varchar(255),
    horario varchar(255)
);
CREATE TABLE IF NOT EXISTS associacao_player_clicks(
    id_player serial not null,
    id_click serial not null,
    FOREIGN KEY (id_player) REFERENCES tb_player(id_player),
    FOREIGN KEY (id_click) REFERENCES tb_clicks(id_click)
);
CREATE TABLE IF NOT EXISTS tb_fluxo(
    id_fluxo serial NOT NULL PRIMARY KEY,
    identificador_original varchar(255),
    horario varchar(255)
);
CREATE TABLE IF NOT EXISTS associacao_player_fluxo(
    id_player serial not null,
    id_fluxo serial not null,
    FOREIGN KEY (id_player) REFERENCES tb_player(id_player),
    FOREIGN KEY (id_fluxo) REFERENCES tb_fluxo(id_fluxo)
);