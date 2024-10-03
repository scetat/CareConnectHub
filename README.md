# CareConnectHub
Respected professor,


Here are the detailed steps on how to run a website.
 
Frontend Steps:
Step 1: Unzip the submission folder and open it in the Visual Studio code.
Step 2: In our website, we have 2 folders, which are frontend and backend. first open a terminal in Visual Studio code and go to the frontend folder with the help of the below command.
		cd .\frontend\
Step 3: In the same terminal, now run the below command.
		npm install react-scripts
Step 4: Now, we have installed all the dependencies to run our frontend. To run the frontend, use the below command in the same terminal.
		npm start
 
Backend Steps:
Step 1: In the backend folder, we have one file named server.js, which is responsible for connection to MongoDB. Please replace your MongoDB connection string in the below code block.
		// MongoDB connection
		mongoose.connect('Connection String', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
Step 2: Open a new terminal in Visual Studio code and go to the backend folder with the help of the below command.
		cd .\backend\
Step 3: In the same terminal, run the below command.
		npm install express
Step 4: After this, we are good with dependencies, and we can run the backend with the below command.
		npm start
 
 
Now the whole website is running, and you can do signup with the signup button in the top-right corner.
 
We also submitted a detailed guidance video on how to run the project. Please refer that video for the same.


Thank you
Care Connect Hub Team
