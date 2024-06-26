## Uruchamianie aplikacji:

### 1. Uruchom keycloak

- Wejdź w folder **'keycloak-docker'**
- Uruchom skrypt bash o nazwie 'docker-run.sh'

### 2. Skonfiguruj keycloak

- Stwórz **realm** o nazwie **'react-demo'**
- Stwórz dwóch klientów:
  - Dla frontend: o nazwie **'react-client'**
  - Dla backend: o nazwie **'flask-client'**
- Stwórz dowolnego użytkownika

### 3a. Testy frontend

- Wejdź w folder **react-app**
- uruchom skrypt **frontend-run.sh**
- wejdź na localhost:3000 aby zweryfikować działanie aplikacji. Zabezpieczony endpoint to 'localhost:3000/**admin**'. Nie powinieneś móc się do niego dostać do momentu zalogowania. Aby się zalogować przejdź na adres 'localhost:3000/**login**'

### 3b. Testy backend

- Wejdź w folder **flask-app**
- uruchom skrypt **flask-run.sh**
- aplikacja będzie znajdowała się na adresie localhost:5000, a zabezbieczony endpoint to 'localhost:5000/**hello**'.

#### Komentarze

Zgodnie z zaleceniami Profesora prowadzącego zajęcia, komunikacja pomiędzy backendem a frontendem została wycięta (występował problem z pobraniem odpowedniego tokenu keycloack w React, co uniemożliwiało jego weryfikację na backendzie). Stara wersja aplikacji flask została umieszczona w pliku 'src/old.py' w folderze 'flask-app'