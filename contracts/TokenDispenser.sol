// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract TokenDispenser is ERC20, ERC20Permit, ERC20Votes, Ownable {
    // Mapping to track user rewards
    mapping(address => uint256) public userRewards;
    
    // Reward rates for different actions
    uint256 public constant SOCIAL_SHARE_REWARD = 100 * 10**18;  // 100 GLTR
    uint256 public constant UGC_REWARD = 500 * 10**18;          // 500 GLTR
    uint256 public constant HEALTH_DATA_REWARD = 50 * 10**18;   // 50 GLTR

    // Events
    event RewardClaimed(address indexed user, uint256 amount, string rewardType);

    constructor() 
        ERC20("Glitter Token", "GLTR")
        ERC20Permit("Glitter Token")
        Ownable(msg.sender)
    {}

    /**
     * @dev Rewards users for social shares
     * @param user Address of the user to reward
     */
    function rewardSocialShare(address user) public onlyOwner {
        _grantReward(user, SOCIAL_SHARE_REWARD, "SocialShare");
    }

    /**
     * @dev Rewards users for UGC contributions
     * @param user Address of the user to reward
     */
    function rewardUGC(address user) public onlyOwner {
        _grantReward(user, UGC_REWARD, "UGC");
    }

    /**
     * @dev Rewards users for health data contributions
     * @param user Address of the user to reward
     */
    function rewardHealthData(address user) public onlyOwner {
        _grantReward(user, HEALTH_DATA_REWARD, "HealthData");
    }

    /**
     * @dev Internal function to grant rewards
     * @param user Address of the user to reward
     * @param amount Amount of tokens to reward
     * @param rewardType Type of reward being granted
     */
    function _grantReward(
        address user,
        uint256 amount,
        string memory rewardType
    ) internal {
        require(user != address(0), "Invalid user address");
        
        userRewards[user] += amount;
        _mint(user, amount);
        
        emit RewardClaimed(user, amount, rewardType);
    }

    /**
     * @dev Required overrides for ERC20Votes
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }
}
