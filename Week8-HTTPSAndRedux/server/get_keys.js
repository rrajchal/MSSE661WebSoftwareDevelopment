const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define paths
const certFilePath = path.join(__dirname, '../', 'cert.pem');
const keyPfxFilePath = path.join(__dirname, '../', 'key.pfx');
const keyPemFilePath = path.join(__dirname, '../', 'key.pem');
const password = 'YourStrongPassword';
const sslDir = path.join(__dirname, 'ssl');

// Ensure the ssl directory exists
if (!fs.existsSync(sslDir)) {
  fs.mkdirSync(sslDir);
}

// Generate a new self-signed certificate in the CurrentUser store
console.log('Creating a new self-signed certificate...');
execSync(`powershell -Command "New-SelfSignedCertificate -DnsName 'localhost' -CertStoreLocation 'Cert:\\CurrentUser\\My'"`, { stdio: 'inherit' });

// Export the certificate to a Base64 encoded string
console.log('Exporting the certificate to Base64 format...');
const certBase64 = execSync(`powershell -Command "$cert = Get-ChildItem -Path Cert:\\CurrentUser\\My | Where-Object { $_.DnsNameList -contains 'localhost' } | Select-Object -First 1; [System.Convert]::ToBase64String($cert.RawData)"`, { stdio: 'pipe' }).toString().trim();

// Write the Base64 encoded certificate to cert.pem with PEM format headers and footers
console.log('Writing the certificate to cert.pem...');
const certPemContent = `-----BEGIN CERTIFICATE-----\n${certBase64.match(/.{1,64}/g).join('\n')}\n-----END CERTIFICATE-----\n`;
fs.writeFileSync(certFilePath, certPemContent);

// Log the content of cert.pem to verify
// console.log('Content of cert.pem:');
// console.log(certPemContent);

// Export the private key to a .pfx file
// console.log('Exporting the private key to key.pfx...');
execSync(`powershell -Command "$cert = Get-ChildItem -Path Cert:\\CurrentUser\\My | Where-Object { $_.DnsNameList -contains 'localhost' } | Select-Object -First 1; $securePassword = ConvertTo-SecureString -String '${password}' -Force -AsPlainText; Export-PfxCertificate -Cert $cert -FilePath '${keyPfxFilePath}' -Password $securePassword"`, { stdio: 'inherit' });

// Convert the .pfx file to .pem format using OpenSSL via Git Bash
// console.log('Converting .pfx to .pem format using OpenSSL...');
const gitBashPath = "C:\\Program Files\\Git\\bin\\bash.exe";
const opensslCommand = `openssl pkcs12 -in '${keyPfxFilePath}' -nocerts -out '${keyPemFilePath}' -nodes -passin pass:${password}`;
execSync(`"${gitBashPath}" -c "${opensslCommand}"`, { stdio: 'inherit' });

// Verify and correct the .pem file format for the key
// console.log('Verifying and correcting the key.pem file format...');
let keyPemContent = fs.readFileSync(keyPemFilePath, 'utf8');
if (!keyPemContent.includes('-----BEGIN PRIVATE KEY-----')) {
  keyPemContent = `-----BEGIN PRIVATE KEY-----\n${keyPemContent}\n-----END PRIVATE KEY-----\n`;
  fs.writeFileSync(keyPemFilePath, keyPemContent);
}

// Log the content of key.pem to verify
// console.log('Content of key.pem:');
// console.log(keyPemContent);

// Copy the certificates to the ssl directory
console.log('Copying certificates to the ssl directory...');
fs.copyFileSync(certFilePath, path.join(sslDir, 'cert.pem'));
fs.copyFileSync(keyPfxFilePath, path.join(sslDir, 'key.pfx'));
fs.copyFileSync(keyPemFilePath, path.join(sslDir, 'key.pem'));

console.log('SSL certificate and key files generated and copied successfully.');
