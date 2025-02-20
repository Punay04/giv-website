import axios from 'axios';
import Web3 from 'web3';

const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.REACT_APP_PINATA_SECRET_KEY;
const CONTRACT_ADDRESS = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;

const CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "certificateType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenURI",
                "type": "string"
            }
        ],
        "name": "mintCertificate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getCertificateType",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export const uploadToPinata = async (imageData, metadata) => {
    try {
        if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
            throw new Error('Pinata API keys not configured');
        }

        // First upload the image
        const imageFormData = new FormData();
        const blob = await (await fetch(imageData)).blob();
        imageFormData.append('file', blob);

        const imageUploadResponse = await axios.post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            imageFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    pinata_api_key: PINATA_API_KEY,
                    pinata_secret_api_key: PINATA_SECRET_KEY,
                },
            }
        );

        const imageHash = imageUploadResponse.data.IpfsHash;

        // Create metadata JSON
        const metadataJSON = {
            name: metadata.name,
            description: metadata.description,
            image: `ipfs://${imageHash}`,
            attributes: [
                {
                    trait_type: "Certificate Type",
                    value: metadata.certificateType
                },
                {
                    trait_type: "Hours",
                    value: metadata.hours
                },
                {
                    trait_type: "Issue Date",
                    value: metadata.date
                }
            ]
        };

        // Upload metadata to IPFS
        const metadataResponse = await axios.post(
            'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            metadataJSON,
            {
                headers: {
                    'Content-Type': 'application/json',
                    pinata_api_key: PINATA_API_KEY,
                    pinata_secret_api_key: PINATA_SECRET_KEY,
                },
            }
        );

        return {
            imageHash,
            metadataHash: metadataResponse.data.IpfsHash,
            metadataUrl: `ipfs://${metadataResponse.data.IpfsHash}`
        };
    } catch (error) {
        console.error('Error uploading to Pinata:', error);
        throw new Error(`Failed to upload to IPFS: ${error.message}`);
    }
};

export const mintNFT = async (metadataUrl, certificateType, userAddress) => {
    try {
        if (!window.ethereum) {
            throw new Error('MetaMask is not installed');
        }

        if (!CONTRACT_ADDRESS) {
            throw new Error('NFT contract address not configured');
        }

        const web3 = new Web3(window.ethereum);
        const nftContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the contract owner (for minting permission)
        const accounts = await web3.eth.getAccounts();
        const ownerAddress = accounts[0];

        // Mint NFT
        const receipt = await nftContract.methods
            .mintCertificate(userAddress, certificateType, metadataUrl)
            .send({ 
                from: ownerAddress,
                gasLimit: web3.utils.toHex(500000)
            });

        return {
            transactionHash: receipt.transactionHash,
            tokenId: receipt.events.Transfer.returnValues.tokenId
        };
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw new Error(`Failed to mint NFT: ${error.message}`);
    }
};
