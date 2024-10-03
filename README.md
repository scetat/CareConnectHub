# CareConnectHub
Respected professor,

Introduction:
This portal is designed to connect caretakers and caregivers, making it easier for caretakers to find and book caregivers in their local area. Caretakers can browse available caregivers, check their profiles, and schedule appointments based on caregiver availability. Caregivers, in turn, can view and manage these appointments, ensuring they provide timely and efficient in-home care services. The platform streamlines the process of finding care services, enabling users to connect quickly and conveniently.

Till now we have completed below pages:
Frontend:
Home(Caregiver), Home(Caretaker), Event, Aboutus, Signup, Login

Backend:
Signup, Login, Event, Home & Database setup


Here are the detailed steps on how to run a website.
 
Frontend Steps:
Step 1: Unzip the submission folder and open it in the Visual Studio code.
Step 2: In our website, we have 2 folders, which are frontend and backend. first open a terminal in Visual Studio code and go to the frontend folder with the help of the below command.
		cd .\frontend\
Step 3: In the same terminal, now run the below command.
		npm install
Step 4: Now, we have installed all the dependencies to run our frontend. To run the frontend, use the below command in the same terminal.
		npm start
 
Backend Steps:
Step 1: In the backend folder, we have one file named server.js, which is responsible for connection to MongoDB. Please replace your MongoDB connection string in the below code block.
		// MongoDB connection
		mongoose.connect('Your Connection String', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
Step 2: Open a new terminal in Visual Studio code and go to the backend folder with the help of the below command.
		cd .\backend\
Step 3: In the same terminal, run the below command.
		npm install
Step 4: After this, we are good with dependencies, and we can run the backend with the below command.
		npm start
 
 
Now the whole website is running, and you can do signup with the signup button in the top-right corner.
 
Thank you
Care Connect Hub Team
