# MERN Stack Boilerplate

## Installations

### Node

* For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

* For Mac:
```
brew install node
```

### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).

instructions to run code:
### React

```
npm install -g create-react-app
```

## Running the code

* Run Mongo daemon:
```
sudo mongod
```
Mongo will be running on port 27017.


* Run Express Backend:
```
cd backend/
npm install
npm start
```

* Run React Frontend:
```
cd frontend
npm install/
npm start
npm install nodemailer

```
implementation:
1)so basically components are divided into common , user and recruiter..(took user schema as applicant schema)
2)used localstorage for authentication
3)after auth respective navbars appear
4)user can apply to max 10 jobs
5)recruiter can edit/delete job
6)applicants cant apply when they are working in another jobs.


Drawbacks
1)rating isnt implemented fully

bonus implementations:
1)fuzzy search,email 

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

