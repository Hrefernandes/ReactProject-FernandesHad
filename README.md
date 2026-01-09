### Clone du dépot

### Installation

```
  npm install
```

### Install Json Server

```
  npm install json-server
```

### Lancer db

```
  npx json-server --watch db.json --port 3001
```

### Lancer l'application

[http](http://localhost:5174/)

### Problème possible

Manque Filtres

Possible erreur lors de la modification ou la suppréssion d'un Evènement

pour y remédier :

db.json

retirer les "" autour des id et relancer

```
  npx json-server --watch db.json --port 3001
```

[http](http://localhost:5174/)
