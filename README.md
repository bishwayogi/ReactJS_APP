<p>
  This repository contains two versions of a React application: a baseline
  version and an optimized version. It also includes the necessary tools and
  instructions to run performance analysis using Lighthouse and generate a
  comparative report.
</p>

<h2>Project Structure</h2>

<pre><code>ReactJS_App/
├── ecom-baseline/       # The original, unoptimized React application
├── ecom-optimized/      # The refactored and optimized React application
└── analysis/       # Directory for storing performance reports
</code></pre>

<h2>Prerequisites</h2>
<p>
  Before you begin, ensure you have the following installed on your machine:
</p>
<ul>
  <li>
    <a href="https://nodejs.org/" target="_blank">Node.js</a> (which includes
    npm)
  </li>
  <li>Google Chrome</li>
</ul>

<h2>Setup and Running the Applications</h2>
<p>
  Follow these steps to set up and run both the baseline and optimized
  applications simultaneously.
</p>

<h3>1. Clone the Repository</h3>
<pre><code>git clone &lt;your-repository-url&gt;
cd ReactJS_App</code></pre>

<h3>2. Set Up the ecom-baseline App</h3>
<p>This application will run on <code>http://localhost:3000</code>.</p>
<pre><code># Navigate to the ecom-baseline app directory
cd ecom-baseline

# Install dependencies
npm install

# Start the application
npm start</code></pre>
<p class="note">
  Keep this terminal window open. A new browser tab should open with the
  ecom-baseline app.
</p>

<h3>3. Set Up the Optimized App</h3>
<p>
  This application will run on <code>http://localhost:3001</code>. Open a
  <strong>new terminal window</strong> for this step.
</p>
<pre><code># Navigate to the optimized app directory from the root
cd path/to/ReactJS_App/ecom-optimized

# Install dependencies
npm install

# Start the application on a different port
npm start</code></pre>
<p class="note">
  When prompted, confirm that you want to run the app on a different port (e.g.,
  3001).
</p>

<h2>Performance Analysis with Lighthouse</h2>
<p>
  With both applications running, you can now generate Lighthouse performance
  reports. Run these commands from the root directory of the repository
  (<code>ReactJS_App/</code>).
</p>

<h3>1. Generate Baseline Report</h3>
<p>
  This command will analyze the app on port 3000 and save the report in the root
  directory.
</p>
<pre><code>npx lighthouse http://localhost:3000 --output json --output-path ./lighthouse_report_baseline.json --only-categories=performance --view</code></pre>

<h3>2. Generate Optimized Report</h3>
<p>This command will analyze the app on port 3001 and save its report.</p>
<pre><code>npx lighthouse http://localhost:3001 --output json --output-path ./lighthouse_report_optimized.json --only-categories=performance --view</code></pre>

<h2>Combine and Compare Results</h2>
<p>
  After generating both JSON reports, use the following Node.js command to parse
  the data and create a summary CSV file named
  <code>performance_summary.csv</code>.
</p>
<p>Run this command from the root directory (<code>ReactJS_App/</code>).</p>

<pre><code>node -e "const fs=require('fs'); const base=require('./lighthouse_report_baseline.json'); const opt=require('./lighthouse_report_optimized.json'); const data=\`Metric,Baseline (ms),Optimized (ms)\\nFirst Contentful Paint,$\{base.audits['first-contentful-paint'].numericValue.toFixed(2)},$\{opt.audits['first-contentful-paint'].numericValue.toFixed(2)}\\nLargest Contentful Paint,$\{base.audits['largest-contentful-paint'].numericValue.toFixed(2)},$\{opt.audits['largest-contentful-paint'].numericValue.toFixed(2)}\\nTime to Interactive,$\{base.audits['interactive'].numericValue.toFixed(2)},$\{opt.audits['interactive'].numericValue.toFixed(2)}\\nTotal Blocking Time,$\{base.audits['total-blocking-time'].numericValue.toFixed(2)},$\{opt.audits['total-blocking-time'].numericValue.toFixed(2)}\\nCumulative Layout Shift,$\{base.audits['cumulative-layout-shift'].displayValue},$\{opt.audits['cumulative-layout-shift'].displayValue}\`; fs.writeFileSync('performance_summary.csv',data)"</code></pre>

e Excel, Google Sheets, or Numbers) to see a clear,
  side-by-side comparison of the performance metrics before and after
  optimization.
</p>
