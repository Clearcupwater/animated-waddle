The following is an API for our Basketball app... 
All api calls should be made against the private urls/collection/xxx

Example url calls

Create a Record
Post: url/players?firstname=John&lastname=Smith&team=5due2idnfewqerwerqerqrwq

Find One Record by id
Get: url/players/3842813493eds342342342

Find all collection records
Get: url/players

Query The database
Get: url/players/query?firstname=John

Update
Put: url/players/3842813493eds342342342?firstname=Jane

Delete
Del: url/players/3842813493eds342342342




















Naming Conventions
________________________________
all schemas are in models
schemas are singular


all models are in models
model is singular

routes are in in routes
route responses are plural
