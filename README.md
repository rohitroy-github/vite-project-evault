<h2>Project E-Vault (EVM Based)</h2>

<h4><b>A modernized blockchain(EVM) based eVault storage solution for the Indian Judiciary made using ViteJS and powered by IPFS.</b></h4>

<h3><b>Snapshots from the project :</b></h3>

<img src="./project-assets/sc_home.png" width="350" class="image-align-left"> <img src="./project-assets/sc_registration.png" width="350">
<br>

<img src="./project-assets/sc_case_search.png" width="350"> <img src="./project-assets/sc_case_details.png" width="350">
<br>

<img src="./project-assets/sc_upload_case_document.png" width="350"> <img src="./project-assets/sc_case_document.png" width="350">

Currently, the app can be tested on <b>Localhost (Hardhat)</b>, <b>Sepolia (EVM)</b>& <b>Polygin Amoy</b> test network using Alchemy endpoints.

<h3><b>E-Vault Features :</b></h3>

<ul>
    <li><b>Seamless clients, lawyer and judge registration process.</b></li>
    <li><b>Registering legal case between 2 clients with their respective lawyers.</b></li>
    <li><b>Automatic / Random allocation of judges to the registered cases.</b></li>
    <li><b>Simplistic login system for clients, lawyers & judges using Aadhar UID and Metamask wallet.</b></li>
    <li><b>Updating case progress by allocated judges & lawyers.</b></li>
    <li><b>Uploading case documents using IPFS & keeping case records by associated case lawyers.</b></li>
    <li><b>Fetching basic case information using caseIDs by general public and police.</b></li>
    <li><b>Fetching realtime case progress by associated case entities.</b></li>
    <li><b>Metamask wallet integration and usage for access authorization.</b></li>
</ul>

<h3><b>Tech Stack :</b></h3>

<b>Frontend :</b>

<ul>
    <li>Vite JS</li>
    <li>Tailwind CSS</li>
    <li>React Toastify</li>
    <li>React Charts</li>
    <li>Shadcn UI</li>
</ul>

<b>Backend :</b>

<ul>
    <li>Node JS</li>
    <li>Hardhat Toolkit</li>
    <li>Metamask Wallet</li>
    <li>Ethers JS</li>
    <li>Alchemy</li>
    <li><a href="https://www.pinata.cloud/">Pinata IPFS</a></li>
</ul>

<b>Deployed Chains :</b>

<ul>
    <li>Ethereum Sepolia Testnet</li>
    <li>Polygon Amoy Testnet</li>
    <li>Hardhat Local Testnet ✅</li>
    <li>Morph Testnet ✅ </li>
</ul>

<h3><b>Guide for testing on local hardhat network :</b></h3>

<b>Environment variables :</b>

<ul>
    <li>Create a new .env file inside [blockchain-hardhat] folder taking reference from .env.example file inside the same.</li>
</ul>

<b>Backend :</b>

Terminal 1:

<ul>
    <li>Run (Move inside [blockchain-hardhat] folder): <b>cd blockchain-hardhat</b></li>
    <li>[ONLY ONCE] Run (Package installations): <b>npm install</b></li>
    <li>Run (Running Hardhat node locally): <b>npx hardhat node</b></li>
</ul>

Terminal 2:

<ul>
    <li>Run (Move inside [blockchain-hardhat] folder): <b>cd blockchain-hardhat</b></li>
    <li>[OPTIONAL] Run (Running tests): <b>npx hardhat test</b></li>
    <li>Run (Running deployment script for <b>Localhost</b>): <b>npx hardhat run scripts/deploy_fetchCaseDetailsByAClient.js --network localhost</b></li>
    <li>[OPTIONAL -> ONLY FOR SEPOLIA] Run (Running deployment script for <b>Sepolia</b>): <b>npx hardhat run scripts/deploy_fetchCaseDetailsByAClient.js --network sepolia</b></li>
</ul>

Update the <b>[backend-config.json]</b> file inside /frontend-vite with the updated contract-address under <b>"31337"</b> "address" feild fetched from Terminal 2.

[OPTIONAL -> ONLY FOR SEPOLIA] Update the <b>[backend-config.json]</b> file inside /frontend-vite with the updated contract-address under <b>"11155111"</b> "address" feild fetched from Terminal 2.

<b>Frontend :</b>

Terminal 1:

<ul>
    <li>Run (Move inside [frontend-vite] folder): <b>cd frontend-vite</b></li>
    <li>[ONLY ONCE] Run (Package installations): <b>npm install</b></li>
    <li>Run (Running frontend on localhost:5173): <b>npm run dev</b></li>
</ul>

<h3><b>Working:</b></h3>

https://www.loom.com/share/b1b9d7de34a343a6891bae4fa0b99471?sid=27c699d7-8106-4973-90bc-6594e710147c

<b>The project is complete but I'm open to suggestions & modifications for this project. Please don't forget to put a ⭐ if you're feeling generous 😊</b>
