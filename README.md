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

<<<<<<< HEAD
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
=======
### settings.py
In questo file ci sono alcune impostazioni del server.<br>
C'è una **lista di apps**.<br>
-Alcune apps sono gia installate dal default, come ad esempio l'```admin```<br>
-Altre sono state installate dopo, come ad esempio: ```api```, ```rest_framework```,```corsheaders``` e ```rest_framework_simplejwt```
- **```api```** => è l'app che è stata sviluppata dentro il folder "api"
- **```rest_framework```** => utilizzata per facilitare lo sviluppo dell' api, ha delle facilità come ad esempio serializing data e altre funzionalita.
- **```corsheaders```** => app che aggiunge Cross-Origin Resource Sharing (CORS) headers per rispondere. Aggiungendo CORS headers permette ad altri domains di accedere alle risorse del backend (aprendo i dati del sito ad altri). I CORSheaders sono necessari per la React frontend app per poter comunicare con il backend.
Alcune configurazioni in settings:
    - In ```MIDDLEWARE``` è stato aggiunto “```corsheaders.middleware.CorsMiddleware```”
    - Poi è stata aggiunta l'origine autorizzata per fare richeste cross-site HTTP => "```CORS_ORIGIN_ALLOW_ALL = True```" vuol dire che tutte le origini hanno il permesso. Per specificare una certa origine bisogna impostare => 
    CORS_ALLOWED_ORIGINS = ["https://consigli.com", "https://example.com", "http://localhost:3000",] 
- “**```rest_framework_simplejwt```**” è un autenticazione basata su token.<br>
Alcune configurazioni in settings:
    - ```Default authentication``` sono state cambiate a Django REST framework, è stato aggiunto ‘```rest_framework_simplejwt.authentication.JWTAuthentication```’
    - Sono state aggiunte alcune ```SIMPLE_JWT``` opzioni:<br>
-“**```ACCESS_TOKEN_LIFETIME```**” è stato impostato su ```30 minuti``` => dopo i 30 minuti l'access token non sara più valido, sarà necessario inviare il "refresh token" alla "token/refresh/" route che genererà dei nuovi tokens, sia l'access che il refres.<br>
-“**```REFRESH_TOKEN_LIFETIME```**” è stato impostato su ```90 giorni``` => dopo i 90 giorni di inattivita, bisognerà rieffetuare il login, perchè il refresh token non sarà più valido per generare altri nuovi tokens.<br>
-“**```ROTATE_REFRESH_TOKEN```**” è stato impostato su ```True``` => quando è impostato su True vuol dire che se un refresh token è spedito alla “token/refresh/”(TokenRefreshView) route, un nuovo refresh token sarà generato insieme ad un nuovo access token.<br>
Tutte le altre opzioni nella lista delle opzioni di SIMPLE_JWT non sono state cambiate quindi mantengono la loro impostazione default.


### models.py
L'app ha 3 models:
- **```User```** (AbstractUser importato from django.contrib.auth.models)
- **```Film```** (name, watchlist(User), piattaforma)
- **```Consiglio```** (user_id(User), film_id(Film), voto, commento, time)

### admin.py
Tutti i models sono registrati nella Django admin app.<br>
**```Username: admin```** | **```Password: admin```** (per accedere alla **```Django administration```** page)

### serializers.py
Serializers sono responsabili per convertire data in un formatto che javascript riesce a capire.

### util.py
L'unica funzione in questo file è **```"merge_sort"```** utilizzata per ordinare i film in base al voto.

### Endpoints

Si accede agli endpoint dell'app ```API``` tramite l' ```'api/'``` route.

La lista degli endpoints disponibili all`interno dell' API app:

- **'token/'**, MyTokenObtainPairView.as_view()<br> 
**```Permette all`utente di fare login alla piattaforma.```**<br> 
-Riceve una ```username``` ed una ```password``` , controlla nella database se sono giuste e se sono giuste risponde con l'**```access token```** e **```refresh token```** personalizzate per ogni utente. <br>
-L'utente potra poi utilizzare l'```access token``` per poter accedere agli endpoint che necessitano l'autenticazione. <br>
-L'access token contiene dentro di se alcune informazione come ad esempio l'username dell'utente, in questo modo ogni endpoint riesce a capiere quale è l'utente che sta accedendo. <br>
-Gli endpoint decorati con “**```@permission_classes([IsAuthenticated])```**” sono gli endpoint che necessitano l'autenticazione, quindi all'interno del header di ogni richesta bisogna allegare l'access token. <br>
-Nella lista delle opzioni di SIMPLE_JWT l'“**```AUTH_HEADER_TYPES```**” by default è impostata su ```(‘Bearer’,)```, questo vuol dire che il tipo di header che sarà accetato per l'autenticazione è "Bearer". Il valore di "Bearer" vuol dire che gli endpoint che necessitano l'autenticazione cercheranno un header con il seguento formato: **```Authorization: Bearer <token>```**

- **'token/refresh/'**, TokenRefreshView.as_view()<br>
**```Utilizzata per aggiornare i tokens.```**<br>
-La classe richiede un ```valido refresh``` token e risponderà con ```nuovi access e refresh tokens```.<br>
-La scadenza del refresh token è impostata su 90 giorni, quindi dopo i 90 giorni(di inattività) la classe non rigenererà più i tokens.<br>
-In questo caso, se l'uttente autenticato è presente sulla pagina, il frontend è impostato a richiedere nuovi tokens ogni 29 minuti, 1 minuto prima che l'access token non sarà più valido, in questo modo l'utente avrà sempre un access token valido per accedere alle endpoint private. Il frontend è anche impostato ad aggiornare i tokens anche al primo avvio della pagina, che magari l'avvio può essere dopo i 30 minuti, quindi con l'access token non valido. <br>
-(Un altra modalità per impostare il frontend a gestire i tokens è controllare ogni volta se l'access token è ancora valido e aggiornarlo se è scaduto oppure rifare il login se il refresh token è scaduto.)

- **"register/"**, views.register<br>
**```Registrarsi alla piattaforma.```**<br> 
-Riceve l'```username```, l'```email```, la ```password```, e la ```password confirmation```.<br>
-Controlla se la password e password confirmation sono uguali.<br>
-Controlla se l'email è gia registrata e se l'username scelta è disponibile.<br>
-Aggiunge l'utente alla database.

- **"addFilm/"**, views.addFilm<br>
**```Aggiungere un nuovo film alla piattaforma```**<br>
-Endpoint privata, richiede l'autenticazione.<br>
-Riceve il nome del film e la piattaforma.<br>
-Controlla se i campi(nome/piattaforma) sono vuoti.<br>
-Aggiunge il film alla database.

- **"films/"**, views.getFilms<br>
**```Vedere la lista dei film, richiesta autenticata.```**<br>
**```Filtrare per film visti/non visti.```**<br>
**```Filtrare i film per piattaforma.```**<br>
**```Visualizzare i film non visti consigliati da tutti gli altri utenti ordinati per la media dei voti ricevuti.```**<br>
-Endpoint privata, richiede l'autenticazione.<br>
**If** “```method = GET```”<br>
-Seleziona tutti i film dalla database.<br>
-Per ogni film:
    - calcola la ```media``` di tutti i voti che ha ricevuto.
    - Controlla se l'utente loggato ha visto il film (qiundi se è nella watchlist).
    - crea un ```dict``` con l'```id del film```, il ```nome```, la ```piattaforma```, ```visto```(boolean se l'utente logato ha visto o no il film), ```media```(la media dei voti ricevuti). Ogni dict creato è aggiunto ad una nuova lista di ```movies```.<br>

    -Seleziona tutte le ```piattaforme``` dalla database, necessarie per farle vedere all'utente per filtrare i film per piattaforma.<br>
    -Risponde con la lista dei ```movies``` e la lista delle ```piattaforme```.<br>

    **If** “```method = POST```”<br>
-Può ricevere una ```piattaforma```, ```name```(nome del film), ```visto``` (boolean per selezionare i film visti o non visti dall'utente), ```media``` (boolean necessaria per ordinare i film in base alla media dei voti ricevuti).<br>
    -Seleziona tutti i film dalla database.<br>
    -Filtra i film per il ```name``` e la ```piattaforma``` ricevuta dall utente.<br>
    -```Se``` l'utente fornisce una boolean ```visto```: <br>
    -   Per ogni film filtrato controlla se l'utente è nella watchlist(lista delle persone che hanno visto il film).<br>
    -   Calcola la media dei voti del film.<br>
    -   Crea un nuovo dict con il film, la boolean che in questo caso è true e la media dei voti.<br>
    -   Aggiunge il dict ad una nuova lista.<br>

    -```Se``` l'utente fornisce una boolean ```non-visto```:<br>
    - Fa la stessa cosa di prima ma per i film nei quali l'utente nu è nella watchlist.<br>

    -```Altrimenti``` se l'utente non fornisce nessuna boolean, vuol dire che vuole vedere la lista di tutti i film sia visti che non-visti.<br>
    - quindi per ogni film aggiunge una boolean(visto/non-visto) e la media dei voti.<br>
    
    -```Se``` l'utente vuole ordinare i film per la media dei voti i film verranno ordinati utilizzando la funzione merge_sort importata dal file util.py.<br>
    -Risponde con la lista dei film filtrati in base alle scelte dell utente.

- **"filmsUnauthenticated/"**, views.filmsUnauthenticated <br>
**```Vedere la lista dei film, richiesta non autenticata.```**<br>
**```Filtrare i film per piattaforma.```**<br>
**```Visualizzare i film ordinati per la media dei voti ricevuti.```**<br>
La films route per gli utenti non loggati.
Fa la stessa cosa della route 'films/', l'unica differenza è il fatto che non c'è l'utente loggato quindi non c'è la boolean del film visto/non-visto.

- **"watchlist/"**, views.watchlist<br>
**```Segnare un film nella lista come 'visto'/'non-visto'.```**<br>
Aggiunge o rimuove un utente dalla watchlist.

- **"addConsiglio/"**, views.addConsiglio <br>
**```Postare un consiglio```**<br>
-Controlla la validità del voto(puo essere da 1 a 10).<br>
-Controlla se il film ricevuto è valido.<br>
-Aggiunge il consiglio alla database.

- **"consigli/<str:pk>/"**, views.consigli <br>
**```Visualizzare tutti i consigli su un determinato film, offrendo la possibilità di ordinare per voto```**<br>
-```str:pk``` all interno della route è l'id del film.<br>
-Controlla se il film è valido.<br>
-Seleziona tutti i consigli del film.<br>
-```Se``` riceve un voto dal utente => controllare se il voto è valido.<br>
-```Filtra``` i consigli con il voto ricevuto e rispondi con la lista dei consigli filtrata.<br>
-```Altrimenti``` (se non è ricevuto nessun voto), ```Rispondi``` con la lista di tutti i consigli.

- **"utente/<str:pk>/"**, views.utente <br>
**```Visualizzare tutti i consigli postati da un utente, offrendo la possibilità di ordinare per voto e per piattaforma.```**<br>
**If** “```method = GET```”<br>
-```str:pk``` all interno della route è l'id dell'utente.<br>
-Controlla se l'utente esiste.<br>
-Selezionare tutti i consigli dell'utente.<br>
-Calcola il numero dei consigli postati (da far vedere il numero totale dei consigli sul profilo dell'utente).<br>
-Lista delle piattaforme. <br>
-Serializing data.<br>
-Rispondi con i dati dell'utente, i consigli, numero consigli e lista piattaforme.<br>
**If** “```method = POST```”<br>
-Filtra i consigli in base al voto e alla piattaforma.

- **"filmConsigliatiDaUtente/<str:pk>/"**, views.filmConsigliatiDaUtente <br>
**```Visualizzare tutti i film ancora non visti (dall utente loggato) consigliati da un altro utente```**<br>
-Seleziona tutti i film visti dall'utente loggato.<br>
-Seleziona tutti i film consigliati da un'altro utente.<br>
-Inizializza una nuova movies array.<br>
-Per ogni film consigliato dall'altro utente
    - Controlla se il film non è nella lista dei film visti dall'utente loggato
        - Aggiungi alla list dai film ancora non visti consigliati da un altro utente (se il film non è gia nella lista)<br>
-Rispondi con la movie array.
>>>>>>> 845a305b1b813bd33639ab4c4ac1a8e63f0632ad
