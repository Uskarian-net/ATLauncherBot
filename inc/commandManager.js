/*
 * AllmightyBot - https://github.com/ATLauncher/AllmightyBot
 * Copyright (C) 2015 ATLauncher
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

function getMessageParts(message) {
    var re = /([^"]\S*|\".+?\")\s*/g;
    var m;

    var matches = [];

    do {
        m = re.exec(message);
        if (m) {
            if (m[1][0] == '"') {
                m[1] = m[1].slice(1);
            }

            if (m[1][m[1].length - 1] == '"') {
                m[1] = m[1].slice(0, m[1].length - 1);
            }

            matches.push(m[1]);
        }
    } while (m);

    return matches;
}

function getCommand(message) {
    var command_name = message.substr(1);
    var arguments = [];

    console.log(command_name.indexOf(" "));

    if (command_name.indexOf(" ") != -1) {
        command_name = message.split(" ")[0];
        arguments = getMessageParts(message.replace(command_name + " ", ""));
    }

    return {
        name: command_name,
        args: arguments
    };
}

/**
 * Act upon a command.
 *
 * @param obj - Object containing: username, channel and message all strings
 */
module.exports.act = function (obj) {
    var command = getCommand(obj.message);

    console.log("The user " + obj.username + " on channel " + obj.channel + " ran the command " + command.name + " with the arguments [" + command.args + "]");
};