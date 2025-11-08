This repository contains two versions of a React application: a Baseline_App and an Optimized_App. It also includes the necessary tools and instructions to run performance analysis using Lighthouse and generate a comparative CSV report.

The repository is organized into the following directories:

text
ReactJS_App/
├── Baseline_App/      # The original, non-optimized React application.
├── Optimized_App/     # The optimized version of the React application.
└── AnalysisDATA/      # Directory to store performance reports.


Before you begin, ensure you have the following installed on your system:
•	Node.js (which includes npm)
•	Google Chrome
•	lighthouse npm package installed globally. If you don't have it, run: npm install -g lighthouse


**Setup and Installation**
You need to install the dependencies for both the baseline and the optimized applications separately.
1.	Install Dependencies for Baseline App:
cd Baseline_App
npm install
cd ..

2.	Install Dependencies for Optimized App: cd Optimized_App

**Running the Applications for Analysis**
To compare the applications, you must run them simultaneously on two different ports.

**1.	Start the Baseline App (on Port 3000):**
Open a terminal, navigate to the Baseline_App directory, and run: npm start
The app will be available at http://localhost:3000.

**2.	Start the Optimized App (on Port 3001):**
Open a new terminal, navigate to the Optimized_App directory, and run:npm start

Note: By default, Create React App will prompt you to use a different port if 3000 is busy. Confirm by pressing y to run it on http://localhost:3001.

**Generating Lighthouse Performance Reports**
With both applications running, you can now use the Lighthouse CLI to generate performance reports.

**1.	Generate Report for Baseline App:**
Run the following command from the root of the ReactJS_App directory: lighthouse http://localhost:3000 --output json --output-path ./AnalysisDATA/lighthouse_report_baseline.json --only-categories=performance --view

**2.	Generate Report for Optimized App:**
Next, run this command from the root of the ReactJS_App directory:
lighthouse http://localhost:3001 --output json --output-path ./AnalysisDATA/lighthouse_report_optimized.json --only-categories=performance --view

After running these commands, you will find two new files, lighthouse_report_baseline.json and lighthouse_report_optimized.json, inside the AnalysisDATA folder.

**Comparing Performance Metrics**
To easily compare the key performance metrics from both reports, run the following Node.js command from the root of the ReactJS_App directory. This command reads both JSON reports and generates a clean performance_summary.csv file.

node -e "const fs=require('fs'); const base=require('./AnalysisDATA/lighthouse_report_baseline.json'); const opt=require('./AnalysisDATA/lighthouse_report_optimized.json'); const data=`Metric,Baseline (ms),Optimized (ms)\nFirst Contentful Paint,${base.audits['first-contentful-paint'].numericValue},${opt.audits['first-contentful-paint'].numericValue}\nLargest Contentful Paint,${base.audits['largest-contentful-paint'].numericValue},${opt.audits['largest-contentful-paint'].numericValue}\nTime to Interactive,${base.audits['interactive'].numericValue},${opt.audits['interactive'].numericValue}\nTotal Blocking Time,${base.audits['total-blocking-time'].numericValue},${opt.audits['total-blocking-time'].numericValue}\nCumulative Layout Shift,${base.audits['cumulative-layout-shift'].numericValue},${opt.audits['cumulative-layout-shift'].numericValue}`; fs.writeFileSync('./AnalysisDATA/performance_summary.csv',data)"




npm install
cd ..
