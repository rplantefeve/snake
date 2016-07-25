# snake

Ce dossier contient deux jeux snake. Le premier est un snake solo classique et le second est une version pour 2 joueurs.

Commandes :
    Snake noir :
        -flèche droite : tourner à droite
        -flèche gauche : tourner à gauche
        -flèche haut : monter
        -flèche bas : descendre
        
    Snake rouge :
        -"d" : tourner à droite
        -"q" : tourner à gauche
        -"z" : monter
        -"s": descendre
        
    relancer une partie
        -F5


Règles du jeu :
    Un joueur :
        -Le snake mange des pommes pour grandir
        -A chaque fois qu'il mange une pomme, le score augmente de 10 points, et la vitesse augmente légèrement jusqu'à une vitesse maximum
        -Si le snake se mord la queue, il meurt et la partie s'arrête
        -Pour relancer une partie, appuiez sur F5
        -Lorsque le snake arrive sur un bord du terrain de jeu, il se téléport au niveau du bord opposé.
    
    Deux joueurs :
        -Les snakes mange des pommes pour grandir
        -Lorsqu'un snake arrive sur un bord du terrain de jeu, il se téléport au niveau du bord opposé.
        -A chaque fois qu'il mange une pomme, le score du snake qui l'a mangée augmente de 10 points, et la vitesse augmente légèrement jusqu'à une vitesse maximum
        -Si un snake se mord la queue, il meurt et disparait. Si les deux snakes sont mort, la partie s'arrête
        -Pour relancer une partie, appuiez sur F5
        -les snakes se traversent
        -le snake noir est prioritaire lorsqu'il s'agit de manger une pomme