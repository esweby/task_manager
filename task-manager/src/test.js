/* 
      Task test data

      What data does a task need? Combining trello with clarizen with scrum master - giving multiple companies access to certain boards - collaboration boards 

      - Tasks - VIEWS
         - Working boards
         - Task
            - Task Submitted by
            - Task Submitted Date
            - Task Name
            - Task ID
            - Task Description
         - Status
         - Date
            - Start date
            - Due date
            - Completion date
         - Time
            - Time expected to take
            - Time taken so far 
         - Files
            - Briefing documents 
               - Word/Images/PDF etc.
      
      - Testing
         - Togglable Checklists
*/

const data = [
   {
      userIndividuals: [
         {
            id: 123,
            name: 'Edward Sweby',
            emails: { primary: 'esweby@clever-touch.com', secondary: 'edward.sweby@live.co.uk' },
            primaryCompanyAssociation: 456,
            previousCompanyAssociations: [],
            secondaryCompanyAssociations: [],
            personalBoard: [],
         }
      ],
      userCompanies: [
         {
            id: 456,
            name: 'Clevertouch Marketing',
            // Users - type (0 - account owner, 1 - admin, 2 - board manager, 3 - employee, 4 - outside organisation)
            users: [ { type: 0,  } ],
            userEmployees: [123],
            userGuests: [],
            boards: [],
         },
         {
            id: 457,
            name: 'Access',
            // Users - type (0 - account owner, 1 - admin, 2 - board manager, 3 - employee, 4 - outside organisation)
            users: [ { type: 0,  } ],
            userEmployees: [],
            userGuests: [],
            boards: [],
         }
      ],
      collaborationBoards: [

      ],
   }
];

export default data;

