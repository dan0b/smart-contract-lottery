const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = "250000000000000000" // cost 0.25 per request. aka the premium
const GAS_PRICE_LINK = 1e9

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]
    if (chainId == 31337) {
        log("Local netowrk detected! Deploying mocks..")
        // deploy mock vrfCoordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
    }
    console.log("Mocks have been deployed")
    console.log("---------------------------------------------------------")
}

module.exports.tags = ["all", "mocks"]
