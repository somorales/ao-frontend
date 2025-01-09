# React + Vite

# AOpy

## [See the App!](https://ao-py.netlify.app)

!![ao Logo]("../assets/images/ao-logo.png")

## Description

Inventory management for the Paraguayan store AO. Admin users can manage products. Users can search for products and favorite them.

#### [Client Repo here](https://github.com/somorales/ao-frontend)

#### [Server Repo here](https://github.com/somorales/ao-backend)

## Technologies, Libraries & APIs used

- **Frontend:** React, HTML5, CSS3, JavaScript
- **Backend:** Node.js
- **Styling:** Tailwind
- **API Integration:** Axios
- **Version Control:** GitHub
- **Deployment:** Netlify (Frontend), Render & Mongo Atlas
 (Backend)

## Backlog Functionalities Administrator

- **Category Filters:** Add filtering options by category (Product and kits).

**Product:** 
-View all products
-Create product
-Delete product
-Edit product
-View a product
**Kits:**
-View all kits
-Create a new kit
-Delete a kit
-Edit a kit
-View a kit
-View product details of a kit

## Backlog Functionalities customer



# Client Structure

## User Stories

- **404** - As a user, I want to see a 404 page when I try to access a page that doesn't exist so I know I made a mistake.
- **homepage** - As a user, I want to be able to access the homepage to understand what the app is about and filter recommendations by city..
- **create story** - As a user, I want to create a new travel story to share my experiences with others.
- **edit story** - As a user, I want to be able to edit a previously created story to fix mistakes or add more information.
- **delete story** - As a user, I want to delete a story that I no longer want to share.
- **view stories** - As a user, I want to see a list of all travel stories published by other users.

## Client Routes

| Path                                                    | Page                  | Components         | Behavior                                                    |
| ------------------------------------------------------- | --------------------- | ------------------ | ----------------------------------------------------------- |
| `/`                                                     | HomePage              | Navbar, Footer     | Home page with general information about the app and cities |
| `/:city`                                                | CityRecommendations   | CityCard, Favs     | Displays recommendations for the selected city              |
| `/:city/:cityId/recommendations/:recommendationId`      | RecommendationDetails | RecommendationCard | Detailed view of a specific recommendation                  |
| `/create`                                               | CreateRecommendation  | RecommendationForm | Form to create a new travel recommendation                  |
| `/about`                                                | About                 | InfoSection        | Page with information about the app and its purpose         |
| `/:city/:cityId/recommendations/:recommendationId/edit` | EditRecommendation    | EditForm           | Form to edit an existing recommendation                     |
| `/favs`                                                 | Favs                  | FavsCard           | Displays recommendations marked as favorites                |
| `*`                                                     | Error                 | ErrorPage          | Error page when the route doesn't exist                     |

## Other Components

- **Navbar:** Navigation bar with links to the main sections of the app (home,about us, favorites).

## Links


### Project

[Repository Link Client](https://github.com/somorales/ao-frontend)

[Repository Link Server](https://github.com/somorales/ao-frontend)

[Deploy Link](https://ao-py.netlify.app)

### Model Planning

[Model Planning Link](https://www.figma.com/design/kY44d1N2H39t7OH9vyGksz/AOPY?node-id=0-1&t=tHlnQvChYWUkUYn0-1)

### Slides
[Slides Link](https://www.figma.com/design/fHX6sMQJantPEe3rtz3lXV/Ao?node-id=0-1&t=TKpestibuvMdKwTW-1)
