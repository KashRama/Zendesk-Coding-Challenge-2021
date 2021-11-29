# Zendesk Coding Challenge 2021
## Installation and Usage
Needed Programs:
  - Node.js: download using https://nodejs.org/en/download/
  - Github

### Step 1: Set up repository
Do this through the following command:
```
git clone *insert github link*
```
Then, cd into the directory as needed.

### Step 2: Replace username and token
In ticketviewer.js, a portion currently looks like:
```
const client = zendesk.createClient({
  username:  'username',
  token:     'token',
  remoteUri: 'https://zcccodingchallenge-2021.zendesk.com/api/v2'
});
```
Here, replace username and token with the username and token that you would like.

### Step 3: Running the app
In the browser of your choice, go to http://localhost:3000/.
Then, in your terminal run npm run dev.

Follow the prompts in the terminal to see the proper tickets show up.

To run the unit tests, run the following command in the terminal:
```
node test.js
```

# Usage
Based on a ticket IDs, this app will print out the creation time, requester ID, submitter ID, and ticket form ID. This will help manage a large amount of tickets. The user can view any single ticket at a time or view all the tickets at once. Also, the user has the option to exit the app at any time.

When the user chooses to view all the tickets, they will be able to view 25 tickets at a time, with the option to view the following 25 tickets.

Lastly, there are provided unit tests in order to check if the program is working properly.
