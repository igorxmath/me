# Social Profile Page Component
This is a Next.js app that displays a user's social profile information, including their name, avatar, description, and links to their social media profiles. The app uses TypeScript for type checking and Next.js' Image component for optimized image loading.

## Performance
Server-side rendering (SSR) to generate HTML pages for each request, rather than relying on client-side JavaScript to render the page. 

Includes a number of performance optimizations to ensure that it loads quickly and efficiently, even on slower devices and network connections.

## Installation
To run this app on your local machine, you can clone the repository and install the dependencies using `npm` or `yarn`:
  
  ```bash
  git clone https://github.com/your-username/my-social-profile-app.git
  cd my-social-profile-app
  npm install
  ```
You'll also need to configure your app's Edge network to use the get function from @vercel/edge-config. See the [Vercel documentation](https://vercel.com/docs) for more information on how to configure your app's Edge network.

## Usage
To run the app in development mode, use the `dev` script:
  
  ```bash
  npm run dev
  ```
To run the app in production mode, use the `build` and `start` scripts:
  
  ```bash
  npm run build
  npm run start
  ```

## Configuration
To configure the app, you'll need to provide a Profile object that contains the user's information, including their name, avatar URL, description, and an array of Link objects representing their social media profiles.

The Profile object is defined in `src/types/data.types.ts`:
  
  ```typescript
  export type Profile = {
    id: number
    name: string
    email: string
    description: string
    avatar: string
    links: Link[]
  }
  ```

The Link object is defined in `src/types/data.types.ts`:
  
  ```typescript
  export type Link = {
    href: string
    brand: string
    title: string
  }
  ```
You can then provide this Profile object to the HomePage component, which will display the user's social profile information.
  
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "avatar": "https://avatars.githubusercontent.com/u/12345678?v=4",
    "links": [
      {
        "href": "",
        "brand": "github",
        "title": "GitHub"
      },
      [...]
    ]
  }
  ```

## License
This app is released under the [MIT](https://choosealicense.com/licenses/mit/) License.
