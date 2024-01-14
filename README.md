# CONSIGLIO

#### Video Demo: <[URL HERE](https://www.youtube.com/watch?v=1Z6GFhjftZ0)>

### Table of Contents

- [Architecture](#architecture)
- [Come Installare e Avviare il Progetto](#come-installare-e-avviare-il-progetto)
- [Description](#description)

### **Architecture**

- Frontend - React, Bootstrap
- Backend – Django
- Database - SQLite

### **Come Installare e Avviare il Progetto**

Apri 2 prompt dei comandi, uno per avviare il ```backend``` e un'altro per il ```frontend```.

**Backend**<br>
**```cd backend```** spostati dentro la cartella backend del progetto.<br>
**```pip install -r requirements.txt```** installa le dipendenze del progetto (Prima crea una virtual environment).<br>
**```python manage.py runserver```** avvia il development backend server.<br>

**Frontend**<br>
**```cd workout/frontend```** spostati dentro la cartella frontend del progetto.<br>
**```npm i```** installa i frontend packages.<br>
**```npm run dev```** avvia il development frontend server. 

**```Importante```**: è importante avviare il backend sul portale “http://127.0.0.1:8000/”, in questo modo il frontend (la funzione fetch) può andare a prendere i dati.


### Description

Piattaforma che consenta di collezionare i consigli degli utenti riguardo i film, cosi che chi è indeciso su cosa vedere sulle varie piattaforme di streaming potrà trovare la pellicola più adatta ai propri gusti:
- Registrarsi e fare login alla piattaforma
- Aggiungere un nuovo film alla piattaforma
- Segnare un film nella lista come ‘visto’
- Vedere la lista dei film, e se la richiesta è autenticata, visualizzare un booleano che
indica se l’utente loggato ha già visto il film.
- Filtrare per film visti/non visti
- Filtrare i film per piattaforma (Netfilix/Prime ecc)
- Postare un consiglio. Ogni consiglio ha un voto da 1 a 10 e un piccolo commento
dell’utente.
- Visualizzare tutti i consigli postati da un utente, offrendo la possibilità di ordinare per
voto e per piattaforma.
- Visualizzare tutti i consigli su un determinato film, offrendo la possibilità di ordinare per
voto.
- Visualizzare tutti i film ancora non visti consigliati da un altro utente.
- Visualizzare i film non visti consigliati da tutti gli altri utenti ordinati per la media dei voti ricevuti.

- Registrarsi e fare login alla piattaforma
- Aggiungere un nuovo film alla piattaforma
- egnare un film nella lista come ‘visto’
- Vedere la lista dei film, e se la richiesta è autenticata, visualizzare un booleano che indica se l’utente loggato ha già visto il film.
- Filtrare per film visti/non visti
- Filtrare i film per piattaforma (Netfilix/Prime ecc)
- Postare un consiglio. Ogni consiglio ha un voto da 1 a 10 e un piccolo commento dell’utente.
- Visualizzare tutti i consigli postati da un utente, offrendo la possibilità di ordinare per voto e per piattaforma.
- Visualizzare tutti i consigli su un determinato film, offrendo la possibilità di ordinare per voto.
- Visualizzare tutti i film ancora non visti consigliati da un altro utente.
- Visualizzare i film non visti consigliati da tutti gli altri utenti ordinati per la media dei voti ricevuti.
