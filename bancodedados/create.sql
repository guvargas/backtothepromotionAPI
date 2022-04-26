create schema jogo;

create table jogo.tb_falas_salvas(
    idFalaSalva text primary key,
    texto text not null,
    categoria text not null,
    data timestamp default now()
);