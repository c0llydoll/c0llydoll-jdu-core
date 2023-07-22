
# Gameserver
[![](https://dcbadge.vercel.app/api/server/msKfjrqfCm)](https://discord.gg/mitchy)

a central server that handles services like JMCS, WDF and Galaxy.

**GAMESERVER IS CURRENTLY UNDER EARLY ALPHA, WHICH MEANS A LOT OF STUFF YOU SEE RIGHT NOW WILL CHANGE... A LOT.**

## Services

- **JMCS** (Jean Mich Central Server)
    
    Handles such services like leaderboards, profiles, online maps, JD Wall...

- **WDF** (World Dance Floor)

    All World Dance Floor data goes through WDF. Playlist, status, parties...

- **Galaxy**

    Galaxy handles, serves and stores songs database for JMCS and WDF.
    It is not an official service, we made it internally for Gameserver.


### Requirements
- Node.JS *(14 or higher)*
- PM2 *(install via NPM)*

### How to install/use?
```
git clone https://github.com/DancePartyOnline/gameserver.git
cd gameserver
npm install
pm2 start ecosystem.json
```
Using the code block above in your terminal will clone the server, 
install all modules and start **JMCS** and **WDF** with PM2.

#### Using command line
If you don't want to run the server with PM2 or want to run specific service,
you can always use the command line.
```
gameserver.js <command>

Commands:
  gameserver.js serve <service>  Initalize a service

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -e, --env      Service enviroment                                     [string]
  -p, --port     Port to bind on                                        [number]

Not enough non-option arguments: got 0, need at least 1
```
`node src\gameserver.js serve jmcs --env local` will start JMCS in local enviroment.

`node src\gameserver.js serve wdf --env dev --port 5000` will start WDF in dev enviroment and bind on port 5000.

## Contribute
Currently we don't accept any contribution due to the current state of Gameserver.
