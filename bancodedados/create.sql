create schema acoes

create table acoes.post(
    id serial primary key,
    acao text not null,
    descricao text not null,
    data timestamp default now()
)