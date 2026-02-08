<div align="center">

# keyforge

[![npm version](https://badge.fury.io/js/%40gogetrekt%2Fkeyforge.svg)](https://badge.fury.io/js/%40gogetrekt%2Fkeyforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)

**A command-line wallet generator for EVM and Solana blockchains**

*Generates keys locally, outputs to CSV, never touches the network*

</div>

---

## 🔧 Overview

keyforge is a minimal, offline wallet generator designed for developers and security researchers. It creates cryptographic key pairs for **EVM** (Ethereum, Polygon, Arbitrum, BSC, etc.) and **Solana** networks entirely on your local machine.

**Key principles:**
- 🔒 **Zero network calls** - completely offline
- 📁 **Local file output only** - no cloud storage
- 🚫 **No telemetry** - your privacy is protected
- ⚡ **Stateless execution** - no persistent data

---

## 🎯 Design Philosophy

Many wallet generators are web-based, opaque, or require trust in third parties. keyforge exists to provide a **simple, auditable tool** for generating test wallets locally. 

It is intentionally **stateless** run it once, get CSV, done. Run it again, get different keys. Nothing is cached or persisted except what you explicitly save.

---

## ✨ Features

<table>
<tr>
<td>

**🔐 Key Generation**
- EVM wallets (private key + address)  
- Solana wallets (secret key + address)
- Cryptographically secure random generation

</td>
<td>

**⚡ User Experience**
- Interactive mode with prompts
- Direct mode for scripting
- Clean CSV output format

</td>
</tr>
<tr>
<td>

**🛡️ Security**
- Offline operation (no network calls)
- No key storage beyond output files
- Timestamp-based filenames prevent overwrites

</td>
<td>

**🔧 Developer-Friendly**
- No external service dependencies
- Auditable codebase
- MIT licensed

</td>
</tr>
</table>

---

## 🚀 Installation & Usage

### Quick Start

```bash
# Run directly with npx (recommended)
npx keyforge

# Or install globally
npm install -g keyforge
```

### Interactive Mode

Run without arguments for guided wallet generation:

```bash
npx keyforge
```

**You will be prompted to:**
1. 🔗 Select blockchain (EVM or Solana)
2. 🔢 Enter number of wallets to generate  
3. ✅ Confirm generation

### Direct Mode

Generate wallets with inline flags for automation:

```bash
# Generate 10 EVM wallets
npx keyforge evm --10

# Generate 50 Solana wallets  
npx keyforge solana --50
```

---

## 📖 Command Reference

| Command | Description | Output Location |
|---------|-------------|-----------------|
| `npx keyforge` | Interactive mode with prompts | `./wallets/<chain>-YYYYMMDD-HHMMSS.csv` |
| `npx keyforge evm --<number>` | Generate EVM wallets directly | `./wallets/evm-YYYYMMDD-HHMMSS.csv` |
| `npx keyforge solana --<number>` | Generate Solana wallets directly | `./wallets/solana-YYYYMMDD-HHMMSS.csv` |

> **Note:** The `--<number>` flag is required in direct mode. Both chains accept any positive integer.

---

## 📊 Output Format

All output is **CSV format**. Files are created in the `./wallets/` directory (auto-created if missing). Filenames include timestamps to prevent overwrites.

### EVM Wallets

| Field | Description | Example |
|-------|-------------|---------|
| `index` | Wallet number (1-based) | `1` |
| `address` | Checksummed Ethereum address | `0x742d35Cc6634C0532925a3b844Bc0e7d3e8e65C6` |
| `privateKey` | Private key in hex format | `0x1234567890abcdef...` |

```csv
index,address,privateKey
1,0x742d35Cc6634C0532925a3b844Bc0e7d3e8e65C6,0x1234567890abcdef...
2,0x8ba1f109551bD432803012645Ac136ddd64DBA72,0xfedcba9876543210...
```

### Solana Wallets

| Field | Description | Example |
|-------|-------------|---------|
| `index` | Wallet number (1-based) | `1` |
| `address` | Solana public key | `7xQKk7bZbSviwkANHhGCGiZA7b7j5a6GQ7P2j6H2Kxj` |
| `secretKey` | Base58-encoded secret key | `9sd4k3j2h1g0f9e8d7c6b5a4z3y2x1w0v9u8t7s6r5q4p3o2n1m0l9k8j7i6h5g` |

```csv
index,address,secretKey
1,7xQKk7bZbSviwkANHhGCGiZA7b7j5a6GQ7P2j6H2Kxj,9sd4k3j2h1g0f9e8d7c6b5a4z3y2x1w0v9u8t7s6r5q4p3o2n1m0l9k8j7i6h5g
2,8yRLl8cCcTwjBOIhIeDhIbJbK8c8k7bHR8Q3k7I3Lyj,0sa5l4k3j2i1h0g9f8e7d6c5b4a3z2y1x0w9v8u7t6s5r4q3p2o1n0m9l8k7j6i
```

---

## 🔒 Security Model

### Key Generation Process

| Component | Implementation | Security Level |
|-----------|---------------|----------------|
| **EVM Keys** | `ethers.js` cryptographically secure random | ✅ Production-grade |
| **Solana Keys** | `@solana/web3.js` secure keypair generation | ✅ Production-grade |
| **Randomness** | OS-level entropy sources | ✅ Cryptographically secure |

### Data Handling

- **📁 Storage:** Keys persist only in the CSV file you explicitly save
- **🚫 No Caching:** keyforge does not store, cache, or transmit keys  
- **🏃 Stateless:** The process has no memory between runs
- **🔍 Auditable:** Open source, minimal dependencies

### Recovery Policy

> ⚠️ **IMPORTANT:** Keys are **NOT recoverable**. If you lose the CSV file, the keys are permanently lost.

---

## ⚠️ Security Warnings

<div align="center">

### 🚨 READ BEFORE USE 🚨

</div>

| ⚠️ Warning | Details |
|------------|---------|
| **Development Only** | These tools are for testing and local development. **Do not use for production funds** without thorough security review. |
| **CSV Files Are Secrets** | Treat output CSV files as **highly sensitive**. Store securely, encrypt at rest, and delete when no longer needed. |
| **No Key Management** | keyforge does **not help manage keys** after generation. You are responsible for secure handling of generated files. |
| **Assume Compromise** | Consider any machine running keyforge as **potentially compromised**. For critical security, use an air-gapped system. |

---

## 🎯 Intended Use Cases

<table>
<tr>
<td>

**🧪 Development & Testing**
- Generate test wallets for dApp development
- Create fixture data for integration tests
- Local testing of wallet-dependent tools

</td>
<td>

**📊 Research & Education**  
- Batch-generate wallets for research projects
- Educational demonstrations of key generation
- Auditing wallet generation logic

</td>
</tr>
</table>

### Example Use Cases

```bash
# Generate test wallets for local development
npx keyforge evm --5

# Create large dataset for research
npx keyforge solana --1000

# Quick interactive generation
npx keyforge
```

---

## ⚙️ Requirements

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | `>= 16.0.0` | Required for ES modules |
| **npm** | Latest recommended | For package management |
| **OS** | Windows, macOS, Linux | Cross-platform compatible |

---

## 🚫 Limitations

<details>
<summary><strong>📋 Current Limitations</strong></summary>

| Limitation | Details |
|------------|---------|
| **Blockchain Support** | EVM and Solana only (no BTC, Cosmos, etc.) |
| **Key Management** | Generation only (no import/export of existing keys) |
| **Key Derivation** | No HD wallet support (each key is independent) |
| **Network Operations** | No balance checking or on-chain operations |
| **Hardware Integration** | No hardware wallet support |
| **Output Formats** | CSV only (no JSON, binary, or other formats) |

</details>

---

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/keyforge.git
cd keyforge

# Install dependencies  
npm install

# Run in development
npm run dev
```

---

## 📄 License

**MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🛡️ Security Notice

This tool is provided **as-is** for development and research purposes.  
**Use at your own risk.** Always follow security best practices.

**Made with passion by [gogetrekt](https://github.com/rayyanabdat)**


</div>

