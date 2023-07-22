/**
 * Service configuration
 */

module.exports.PORT = 3000;

module.exports.CONSTANTS = {

    // JDWall config
    // (AsyncChallenges and GlobalMessages were found from RE)
    JDWall_Service: {
        // Challenge messages
        AsyncChallenges: {
            refresh_time: 120,
            max_msg: 5
        },
        // Global messages (We don't know what it is)
        GlobalMessages: {
            refresh_time: 120,
            max_msg: 5
        },
        // Friends Autodance config
        FriendsUGC: {
            refresh_time: 120,
            max_msg: 5
        }
    }

};