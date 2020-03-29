# Descripción 

An experimental bot (initially for discord) that allows us to manage a reward system through coins and items that can be purchased

It allows:
- Manage balances in wallets
- Transfer balances between members' wallets
- Manage items to the server store catalog
- Spend the coins on these items
# Implementation


A discord bot manages **tokens** or **coins**, these coins can be spent in the **store** o transfered among chat server's members.


## Example story: 


In a chat group, the following conversation occurs:

---

**Sebastian** says: I found and solved bug # 4554, it is already tested and uploaded to the corresponding branch.

**Gustavo** says: Is it documented?

**Sebastian** says: Yes! I added it to the README

**Gustavo** says: Wow! @RewardsBot transfer $ 100 to @SebastianPerez

**RewardsBot** says: Ok Transferred!

---
## General commands
```
/help
	guess this one
/listItems
	
List items available in the store

/buy [itemId]
	
	Buy an item from the store
/transfer [amout] [userId]
	Transfers coins to  user
```


## Admin only commands
```
/emmit [amout]
		Transfers [amount] monedas a un usuario

/createItem [itemName] [ItemDescription] [ItemAmount] [ItemPrice]
		Create an item in the servers store

```



## Next Steps
	

- [x] We should have a database for user accounts and movements.
- [ ]- We should have a way for an administrator to manage the items, available quantity and prices
- [ ]- Time tracking integration to Atlassian's Jira
- [ ]- Reports, history