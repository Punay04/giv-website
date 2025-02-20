const hre = require("hardhat");

async function main() {
  const GivCertificateNFT = await hre.ethers.getContractFactory("GivCertificateNFT");
  const givCertificateNFT = await GivCertificateNFT.deploy();

  await givCertificateNFT.waitForDeployment();

  console.log("GivCertificateNFT deployed to:", await givCertificateNFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
