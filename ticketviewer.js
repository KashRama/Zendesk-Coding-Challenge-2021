var zendesk = require('node-zendesk');
const axios = require('axios');
const express = require('express');
const readline = require("readline");
const readlineSync = require("readline-sync");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = zendesk.createClient({
  username:  'kramachandrula21@yahoo.com',
  token:     'eiGNUuUnbY8mtTg4owTuEq2kPTf0RcCxo9a9LPKH',
  remoteUri: 'https://zcccodingchallenge-2021.zendesk.com/api/v2'
});

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
   terminal: false
});


app.get('/', async (req, res) => {
   client.tickets.list((err, req, result) => {
      if (err) {
         console.log(err);
         return;
      }

      console.log("Select a view option: ");

      const data = JSON.parse(JSON.stringify(result, null, 2, true));

      rl.question('Would you like to view a single ticket or all tickets? Enter single or all: ', ans => {
         if(ans === 'single'){
            rl.question('Please enter your ticket number: ', single_ans => {
               readSingle(data, parseInt(single_ans));
            })
         }
         else if(ans === 'all'){
            readAll(data);
         }
         else{
            console.log('Invalid Input');
            rl.close();
         }
      })
   });
});

const readSingle = (data, ticketNumber) => {
   console.log('\n','created_at', '\t\t', 'requester_id', '\t', 'submitter_id', '\t', 'ticket_form_id');
   let found = false; 
   data.forEach((ticket) => {
      if(ticket.id === ticketNumber){
         console.log('\n', ticket.created_at, '\t', ticket.requester_id, '\t', ticket.submitter_id, '\t', ticket.ticket_form_id);
         found = true;
         rl.close();
      }
   })  
   if(!found){
      rl.question('Invalid Ticket. Please enter a valid ticket or type end to exit: ', single_ans => {
         if(single_ans === 'end'){
            rl.close();
         }
         else{
            readSingle(data, parseInt(single_ans));
         }
      })
   } 
}

const readAll = (data) => {
   console.log('\n','created_at', '\t\t', 'requester_id', '\t', 'submitter_id', '\t', 'ticket_form_id');

   let tracker = 0;
   next25(tracker, data);
   tracker += 25;
   while (tracker < data.length) {
      const n = readlineSync.question('Enter n to view the following 25 tickets: ');
      if (n === 'n') {
      next25(tracker, data);
      tracker += 25;
      }
      else{
         tracker = data.length;
      }
   }
   console.log('\nNo more Tickets. ');
   rl.close(); 
}

const next25 = (startIdx, data) => {
   console.log('\n','created_at', '\t\t', 'requester_id', '\t', 'submitter_id', '\t', 'ticket_form_id');
   for(let i = startIdx; (i < startIdx + 25) && (i != data.length); i++){
      const ticket = data[i];
      console.log('\n', ticket.created_at, '\t', ticket.requester_id, '\t', ticket.submitter_id, '\t', ticket.ticket_form_id);
   }
}


app.listen(port, () => {
   console.log(`Server is running on port: ${port}`);
});

rl.on('close', () => {
   console.log('\nThank you!');
   process.exit(0);
}) 