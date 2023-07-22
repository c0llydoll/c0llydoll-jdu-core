# WDF

## How to add new funcs / new WDF service?

For new service, create a new folder in "services" with your WDF name and create func files
and if you want to give those funcs middlewares, you can add them to "load-funcs.js"

## What is the workflow?

##### Player turns on the game, client requests "checkToken"
This is for the game to verify the connection, if server returns any bad result, game will cut connection and won't request anything. This is where banned users receive bad result.
##### Player clicks WDF button on UI, requests "connectToWDF"
This is where user joins WDF lobby but not actually in the WDF. This is basically a backstage with a button with the song and currently playing players below it.
We create a cache key containing user's player name, avatar, country and wdf rank, which looks like this: `wdf-cache:userIdHere:versionHere:{"name":"example","country":1000}`
We don't exactly create a session at connectToWDF like we used to because user can lose connection or force quit the game and we wouldn't be able to determine if they actually left so their session would stay in DB forever. We create the cache that expires in 3h and if the user actually clicks the song button on backstage, we create a session using info from cache and join them to a lobby.
##### User clicks song button in backstage, requests "getRandomPlayers"
getRandomPlayers creates session and joins user to a lobby
##### User leaves party, requests "getServerTime" with "sid" and "token" in body
getServerTime usually does not require sid and token in body, its for the player to sync with the server. But the company decided to do this weird method where they pass server time sid and token, which meaning that user left lobby. We remove their session and remove them from lobby in here.