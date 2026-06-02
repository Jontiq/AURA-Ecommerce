# AURA E-Commerce

A full-stack e-commerce application for a luxury perfume brand. Users can browse and search for fragrances, add products to their cart, manage a favourites list, and place orders. The application supports user authentication with JWT, allowing users to register, log in, and view their order history.

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- React Context for global state (Cart & Auth)
- CSS (Custom, responsive design)

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

---

## Project Structure

```
FULLSTACK-AURAECOMMERCE/
├── Frontend/          # React application
├── Backend/           # Express API
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── data/          # Seed script
└── package.json       # Root – runs both servers
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A MongoDB Atlas account and cluster

### Clone the repo
```bash
git clone https://github.com/your-username/your-repo-name.git
cd AURA-Ecommerce
```

### Environment Variables

Create a `.env` file in the `Backend/` folder:

PORT=5000  
CONNECTION_STRING=your_mongodb_connection_string  
ACCESS_TOKEN_SECRET=your_secret_key  

Create a `.env` file in the `Frontend/` folder:

VITE_API_URL=http://localhost:5000/api

### Install Dependencies

```bash
# Root
npm install

# Frontend
cd Frontend && npm install

# Backend
cd ../Backend && npm install
```

### Seed the Database

Populate the database with products and a test user:
```bash
cd Backend
npm run seed
```

### Login

A test account is available after seeding:
Username: user
Password: password

### Run the App

From the root folder, start both frontend and backend simultaneously:
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## Figma Design
[View Figma Design](https://www.figma.com/design/M04oUQXZcHgrCeg09GLMPb/AURA---DesignSystem?node-id=5-8&t=K20X216XWfXJS7uh-1)

## GitHub Repository
[View Repository](https://github.com/Jontiq/AURA-Ecommerce.git)

---

## Project Analysis (English further below)

### Inledning
I detta projekt så har vi var och en i klassen fått i uppgift att bygga en fullstack-applikation i form av en ehandel. För min del så valde jag att starta en parfymbutik och kalla denna "AURA". Uppgiften har varit mycket utmanande då det har introducerat språk och tekniker vi inte arbetat med tidigare, samtidigt så har det varit ett otroligt roligt och lärorikt projekt där motivationen växt varje gång en komplex funktion fallit på plats.

### Arkitektur och uppbyggnad
Applikationen är uppbyggd med en separation mellan frontend och backend, vilket hjälpt mig strukturera arbetet utifrån användargränssnitt och affärslogik. Genom att tillämpa separation of concerns så har exempelvis backend delats upp i modeller, routes och controllers. Modellerna håller entitetstrukturen, t.ex. vad en parfym, order eller användare ska innehålla. Routes hålls "enkel" och hanterar endast navigering tillsammans med middleware, medans affärslogiken hanteras genom controllers.

För autentisering så har ett JWT-flöde implementerats. När en användare loggar in så genereras det en token i backend som består av header (typ av token), en payload (användardata och säkerhetsinformation) samt en signatur baserad på en ACCESS_TOKEN_SECRET från serverns .env-fil. Denna skickas till frontend samt sparas i localStorage och skickas ut till hela applikationen via AuthContext som omsluter app.js. Backend skyddas med hjälp av authMiddleware som validerar signaturen innan tillgång kan ges.

### Utmaningar och lärdomar
**useRef** — Användning och förståelse för useRef krävdes för att skapa en funktion där dropdown-menyer och sökfält stängs om användaren klickar utanför. Till skillnad från useState så renderar inte useRef komponenten när värdet uppdateras, vilket behövs när man vill spåra exakt var på skärmen ett klick skett. Behovet för detta kom till när jag skapade hamburgaremenyn till mobilvyn i navbar, om en användare vill scrolla vidare på sidan så är det inte UX-vänligt att menyn hänger kvar och täcker det övriga innehållet.

**JavaScript** — Jag har haft ganska svårt för Javascript i sig under projektets gång. Jämfört med C# så upplever jag att JavaScript "antar" alldeles för mycket och bristen på omedelbar felhantering i syntaxen gör det stundtals väldigt svårt att debugga.

**MDN Reference** — Att utnyttja MDN reference via VS Code har varit ett starkt verktyg för att experimentera och läsa mer om specifika CSS-verktyg direkt i webbläsaren. Genom detta lärde jag mig mer om z-index, hover-effekter samt hur absolute och relative position samspelar så att exempelvis dropdown-listor och varukorgsnotiser lägger sig rätt i gränssnittet.

**ScrollToTop** — ScrollToTop-komponenten var också något nytt. Denna omsluter samtliga routes och scrollar automatiskt användaren högst upp till sidan när en ändring i URL (pathname) sker. Detta kändes rimligt för UX, annars hade användaren i vissa scenarion behövt scrolla hela vägen upp på en ny sida.

### Tekniska beslut
Under projektets gång fattades ett par beslut för att öka applikationens skalbarhet och användarupplevelse. Ett sådant var att bygga api.js som ett eget abstraktionslager mellan frontend och backend, genom att isolera api-anropen till en egen fil blev koden mer lätthanterad och enklare att felsöka.

För datalagring valde jag MongoDB istället för en lokal JSON-fil. Med en molnbaserad databas så är den ständigt nåbar och oberoende av den lokala miljön, man behöver bara initiera en koppling till databasen istället för att själv hosta den.

För att hantera state för exempelvis inloggad användare och cart så använde jag React Context. Genom att omsluta applikationen i contexts så kunde global information delas till alla komponenter utan att behöva skickas neråt i flera led.

Ett medvetet UX-baserat beslut togs också att låta användaren logga in med användarnamn istället för e-post. Min reflektion var att det bör gå snabbare att logga in med ett användarnamn än en e-postadress.

### Framåtblick
Om jag hade haft mer tid så hade jag velat implementera ett fullt fungerande lagersaldo. Lagersaldot hade då satt en spärr i kundvagnen så att man inte kan köpa ett större antal än vad som faktiskt fanns i lager.

Skulle jag börja om med projektet idag så hade jag nog utmanat mig själv mer designmässigt. Fokus för mig låg på att leverera i tid och kunna säkra ett VG, vilket gjorde att jag valde en rätt så rak nisch, parfymer. Att istället välja en mer komplex produktkategori, exempelvis kläder, hade fått mig hantera svårare produktvarianter så som färg, storlek och lagersaldo per kombination.

Avslutningsvis tar jag med mig insikten om hur effektivt man kan arbeta om man gör grundjobbet ordentligt i Figma. Att ha ett användarflöde och färdiga sidor innan kodningen påbörjades fungerade som en visuell kravspecifikation. Detta gjorde så att jag alltid visste vad nästa steg skulle vara och förhindrade att jag kom av mig under projektets gång.



## In English

### Introduction
In this project, each student in the class was tasked with building a full-stack application in the form of an e-commerce store. I chose to create a perfume store called "AURA". The assignment has been very challenging as it introduced languages and techniques we had not worked with before, while at the same time being an incredibly fun and educational project where motivation grew every time a complex feature finally fell into place.

### Architecture & Structure
The application is built with a clear separation between frontend and backend, which helped me structure the work based on user interface and business logic. By applying separation of concerns, the backend is divided into models, routes and controllers. The models define the entity structure, for example what a perfume, order or user should contain. Routes are kept simple and only handle navigation together with middleware, while the business logic is handled through controllers.

For authentication, a JWT flow has been implemented. When a user logs in, a token is generated in the backend consisting of a header (token type), a payload (user data and security information) and a signature based on an ACCESS_TOKEN_SECRET from the server's .env file. This token is sent to the frontend, stored in localStorage, and shared throughout the application via AuthContext which wraps app.js. The backend is protected by authMiddleware which validates the signature before access is granted.

### Challenges & Learnings
**useRef** — Understanding and using useRef was required to create functionality where dropdown menus and search fields close when the user clicks outside of them. Unlike useState, useRef does not re-render the component when the value updates, which is needed when tracking exactly where on the screen a click occurred. The need for this arose when building the hamburger menu in the navbar for mobile view, if a user wants to scroll further down the page it is not UX-friendly for the menu to remain open and cover the content below.

**JavaScript** — I have had a somewhat difficult relationship with JavaScript throughout this project. Compared to C#, JavaScript assumes too much and the lack of immediate syntax error feedback makes debugging significantly harder at times.

**MDN Reference** — Using MDN reference via VS Code has been a powerful tool for experimenting with and reading about specific CSS properties directly in the browser. Through this I learned more about z-index, hover effects, and how absolute and relative positioning interact so that for example dropdown lists and cart badges position themselves correctly in the interface.

**ScrollToTop** — Building a ScrollToTop component was also new to me. It wraps all routes and automatically scrolls the user to the top of the page whenever the URL changes. This felt necessary for UX, otherwise users would sometimes find themselves halfway down a new page after navigating.

### Technical Decisions
Several decisions were made throughout the project to increase scalability and user experience. One was building api.js as a dedicated abstraction layer between frontend and backend, by isolating all API calls into a single file the code became easier to manage and debug.

For data storage, MongoDB was chosen over a local JSON file. With a cloud-based database it is constantly available and independent of the local environment, you only need to initiate a connection rather than host the data yourself.

To manage global state such as the logged-in user and cart, React Context was used. By wrapping the application in context providers, global information could be shared across all components without having to pass it down through multiple levels of props.

A deliberate UX-based decision was also made to let users log in with a username instead of an email address. My reasoning was that a username is generally faster to type than an email, which improves the login experience.

### Looking Ahead
If I had more time, I would have liked to implement a fully functioning inventory system. The stock level would set a limit in the cart so that a customer cannot purchase more units than what is actually available.

If I were to start the project over today, I would challenge myself more on the design side. My focus was on delivering on time and securing a passing grade, which led me to choose a relatively straightforward product category, perfumes. Choosing something more complex, such as clothing, would have required handling more difficult product variants like color, size and stock levels per combination.

Finally, I take with me the insight of how efficiently you can work when the groundwork is done properly in Figma. Having a user flow and finished page designs before coding began served as a visual specification. This meant I always knew what the next step would be and prevented me from losing direction during the project.