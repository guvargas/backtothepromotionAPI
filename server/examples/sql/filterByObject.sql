select apl.id_player,  
    apl.id_aluno,  
    tf.objeto,  
    tf.horario  
    from associacao_player_aluno apl   
    INNER JOIN associacao_player_clicks apf ON apl.id_player = apf.id_player  
    INNER JOIN tb_clicks tf ON tf.id_click = apf.id_click  
    where tf.horario between ('2022/05/18 19:00') and ('2022/05/18 22:00') 
    and tf.objeto IN ('PersonagemRecepcionista','Diretora') 
    and apl.id_aluno IN ('35') 
     group by apl.id_player,apl.id_aluno,tf.objeto,tf.horario  order by tf.horario