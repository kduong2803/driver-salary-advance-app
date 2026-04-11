
  # Driver Salary Advance App

  This is a code bundle for Driver Salary Advance App. The original project is available at https://www.figma.com/design/Ep15fSFFsaUL0lNXVm7q5n/Driver-Salary-Advance-App.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## One-click Netlify deployment

  This repo is configured for Netlify static hosting with SPA routing support for React Router.

  ### Deploy from GitHub

  1. Push this repo to GitHub.
  2. In Netlify, choose `Add new site` -> `Import an existing project`.
  3. Connect your GitHub repo.
  4. Netlify should detect these settings automatically from `netlify.toml`:
     - Build command: `npm install && npm run build`
     - Publish directory: `dist`
  5. Click `Deploy site`.

  Netlify will give you a public URL like `https://your-site-name.netlify.app`.

  ### Why this works

  The `netlify.toml` file includes an SPA fallback redirect so direct visits to routes like `/manage` or `/ewa/discovery` load correctly instead of returning a 404.
  
